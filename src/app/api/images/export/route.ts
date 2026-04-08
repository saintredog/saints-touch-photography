import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';
import { formatMetadataForCSV, ImageMetadata } from '@/lib/metadata';
import { Parser } from 'json2csv';

/**
 * GET /api/images/export
 * Export all user images with metadata as CSV
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

    // Fetch all images with metadata
    const images = await prisma.image.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        width: true,
        height: true,
        mimeType: true,
        size: true,
        metadata: true,
        uploadedAt: true,
        blobUrl: true,
      },
    });

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No images found' },
        { status: 404 }
      );
    }

    // Transform data for CSV export
    const csvData = images.map((image) => {
      const metadata = image.metadata as ImageMetadata | null;
      const copyrightInfo = metadata ? formatMetadataForCSV(metadata) : {};

      return {
        'Image ID': image.id,
        'Title': image.title || '',
        'Description': image.description || '',
        'URL': image.blobUrl || '',
        'Width': image.width || '',
        'Height': image.height || '',
        'File Type': image.mimeType || '',
        'File Size (bytes)': image.size || '',
        'Artist': copyrightInfo.artist || '',
        'Copyright': copyrightInfo.copyright || '',
        'Copyright Notice': copyrightInfo.copyrightNotice || '',
        'Creator': copyrightInfo.creator || '',
        'Keywords': copyrightInfo.keywords || '',
        'Image Description': copyrightInfo.imageDescription || '',
        'Uploaded': image.uploadedAt.toISOString(),
      };
    });

    // Generate CSV
    const fields = [
      'Image ID',
      'Title',
      'Description',
      'URL',
      'Width',
      'Height',
      'File Type',
      'File Size (bytes)',
      'Artist',
      'Copyright',
      'Copyright Notice',
      'Creator',
      'Keywords',
      'Image Description',
      'Uploaded',
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(csvData);

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="images-export-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: 'Failed to export images' },
      { status: 500 }
    );
  }
}
