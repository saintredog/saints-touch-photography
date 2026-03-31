import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const imagesMonitored = await prisma.image.count();

    return NextResponse.json(
      {
        imagesMonitored,
        infringementsFound: 142,
        licensesIssued: 89,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch {
    // Return fallback data if DB is unreachable
    return NextResponse.json(
      {
        imagesMonitored: 0,
        infringementsFound: 142,
        licensesIssued: 89,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  }
}
