import { NextRequest, NextResponse } from 'next/server';
import { get, put } from '@vercel/blob';
import sharp from 'sharp';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import {
  embedMetadata,
  createMetadataFromProfile,
  readMetadata,
} from '@/lib/metadata';

/**
 * GET /api/user/metadata
 * Retrieve user's copyright metadata settings
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        copyrightArtist: true,
        copyrightYear: true,
        copyrightHolder: true,
        copyrightEmail: true,
        displayName: true,
        name: true,
      },
    });

    return NextResponse.json({
      copyrightArtist: user?.copyrightArtist,
      copyrightYear: user?.copyrightYear,
      copyrightHolder: user?.copyrightHolder,
      copyrightEmail: user?.copyrightEmail,
    });
  } catch (error) {
    console.error('Fetch metadata error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/metadata
 * Update user's copyright metadata settings
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      copyrightArtist,
      copyrightYear,
      copyrightHolder,
      copyrightEmail,
    } = body;

    // Update user profile
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        copyrightArtist,
        copyrightYear,
        copyrightHolder,
        copyrightEmail,
      },
    });

    return NextResponse.json({
      success: true,
      metadata: {
        copyrightArtist: user.copyrightArtist,
        copyrightYear: user.copyrightYear,
        copyrightHolder: user.copyrightHolder,
        copyrightEmail: user.copyrightEmail,
      },
    });
  } catch (error) {
    console.error('Update metadata error:', error);
    return NextResponse.json(
      { error: 'Failed to update metadata' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/user/metadata
 * Batch update metadata for all existing images
 * This is a long-running operation that updates all images with new copyright info
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all images for this user
    const images = await prisma.image.findMany({
      where: { userId: session.user.id },
    });

    if (images.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No images to update',
        updated: 0,
      });
    }

    // Create metadata from updated user profile
    const newMetadata = createMetadataFromProfile({
      displayName: user.displayName || user.name || '',
      copyrightArtist: user.copyrightArtist,
      copyrightYear: user.copyrightYear,
      copyrightHolder: user.copyrightHolder,
      copyrightEmail: user.copyrightEmail,
    });

    let updatedCount = 0;
    const errors: Array<{ imageId: string; error: string }> = [];

    // Process each image
    for (const image of images) {
      try {
        if (!image.blobUrl) {
          errors.push({
            imageId: image.id,
            error: 'No blob URL found',
          });
          continue;
        }

        // Download image from Blob storage
        const blob = await get(image.blobKey || image.blobUrl);
        if (!blob) {
          errors.push({
            imageId: image.id,
            error: 'Could not download image',
          });
          continue;
        }

        const imageBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        // Read existing metadata
        const existingMetadata = await readMetadata(buffer);

        // Embed new metadata
        let processedBuffer = embedMetadata(
          buffer,
          newMetadata,
          existingMetadata
        );

        // Process with Sharp to ensure compatibility
        try {
          processedBuffer = await sharp(processedBuffer)
            .withMetadata()
            .toBuffer();
        } catch (error) {
          console.warn(`Sharp processing failed for image ${image.id}:`, error);
        }

        // Upload updated image back to Blob storage
        const blobName = image.blobKey || `images/${session.user.id}/${image.id}`;
        await put(blobName, processedBuffer, {
          access: 'public',
          contentType: image.mimeType || 'image/jpeg',
        });

        // Update database record
        await prisma.image.update({
          where: { id: image.id },
          data: {
            metadata: newMetadata,
            updatedAt: new Date(),
          },
        });

        updatedCount++;
      } catch (error) {
        console.error(`Error updating image ${image.id}:`, error);
        errors.push({
          imageId: image.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully updated ${updatedCount} of ${images.length} images`,
      updated: updatedCount,
      total: images.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Batch update error:', error);
    return NextResponse.json(
      { error: 'Failed to batch update metadata' },
      { status: 500 }
    );
  }
}
