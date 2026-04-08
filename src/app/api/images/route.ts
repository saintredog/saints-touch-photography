import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import {
  readMetadata,
  embedMetadata,
  createMetadataFromProfile,
  ImageMetadata,
} from '@/lib/metadata';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Get user profile for copyright info
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Read existing metadata from uploaded image
    let existingMetadata: ImageMetadata = {};
    try {
      existingMetadata = await readMetadata(buffer);
    } catch (error) {
      console.warn('Could not read existing metadata:', error);
    }

    // Create metadata from user profile
    const newMetadata = createMetadataFromProfile(
      {
        displayName: user.displayName || user.name || '',
        copyrightArtist: user.copyrightArtist,
        copyrightYear: user.copyrightYear,
        copyrightHolder: user.copyrightHolder,
        copyrightEmail: user.copyrightEmail,
      },
      existingMetadata
    );

    // Embed metadata into image buffer
    let processedBuffer = embedMetadata(buffer, newMetadata, existingMetadata);

    // Process image with Sharp (optional: resize, optimize, etc.)
    try {
      processedBuffer = await sharp(processedBuffer)
        .rotate() // Auto-rotate based on EXIF
        .withMetadata() // Preserve metadata
        .toBuffer();
    } catch (error) {
      console.warn('Sharp processing failed, using original:', error);
      // Use the metadata-embedded buffer even if sharp fails
    }

    // Upload to Vercel Blob
    const blobName = `images/${session.user.id}/${Date.now()}-${file.name}`;
    const blob = await put(blobName, processedBuffer, {
      access: 'public',
      contentType: file.type,
    });

    // Get image dimensions
    let metadata = {
      artist: newMetadata.artist,
      copyright: newMetadata.copyright,
      copyrightNotice: newMetadata.copyrightNotice,
      creator: newMetadata.creator,
      imageDescription: newMetadata.imageDescription,
      keywords: newMetadata.keywords,
    };

    let width: number | undefined;
    let height: number | undefined;

    try {
      const imageMetadata = await sharp(processedBuffer).metadata();
      width = imageMetadata.width;
      height = imageMetadata.height;
    } catch (error) {
      console.warn('Could not extract image dimensions:', error);
    }

    // Save to database
    const image = await prisma.image.create({
      data: {
        userId: session.user.id,
        title: title || file.name,
        description,
        blobUrl: blob.url,
        blobKey: blob.pathname,
        mimeType: file.type,
        size: file.size,
        width,
        height,
        metadata, // Store as JSON
      },
    });

    return NextResponse.json(
      {
        success: true,
        image: {
          id: image.id,
          url: image.blobUrl,
          title: image.title,
          metadata: image.metadata,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get pagination parameters
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '20');

    // Fetch user's images with metadata
    const images = await prisma.image.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: 'desc' },
      skip,
      take,
      select: {
        id: true,
        title: true,
        description: true,
        blobUrl: true,
        width: true,
        height: true,
        mimeType: true,
        size: true,
        metadata: true,
        uploadedAt: true,
      },
    });

    const total = await prisma.image.count({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      images,
      pagination: {
        skip,
        take,
        total,
        pages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
