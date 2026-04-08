/**
 * Metadata handling library for EXIF/IPTC read/write
 * Uses exifr for robust EXIF/IPTC parsing and piexifjs for writing
 */

import exifr from 'exifr';
import piexif from 'piexifjs';

export interface ImageMetadata {
  artist?: string;
  copyright?: string;
  imageDescription?: string;
  creator?: string;
  copyrightNotice?: string;
  keywords?: string[];
}

export interface EmbedMetadataOptions {
  artist?: string;
  copyright?: string;
  imageDescription?: string;
  creator?: string;
  copyrightNotice?: string;
  keywords?: string[];
  preserveExisting?: boolean;
}

/**
 * Read EXIF and IPTC metadata from image buffer or file path
 */
export async function readMetadata(
  imageBuffer: Buffer | string
): Promise<ImageMetadata> {
  try {
    const exifData = await exifr(imageBuffer, {
      // Include all EXIF fields
      read: ['exif', 'iptc', 'xmp'],
    });

    if (!exifData) {
      return {};
    }

    return {
      artist: exifData.artist || exifData.Creator,
      copyright: exifData.copyright || exifData.CopyrightNotice,
      imageDescription: exifData.ImageDescription || exifData.Description,
      creator: exifData.Creator,
      copyrightNotice: exifData.CopyrightNotice,
      keywords: Array.isArray(exifData.keywords)
        ? exifData.keywords
        : exifData.keywords
        ? [exifData.keywords]
        : undefined,
    };
  } catch (error) {
    // If metadata reading fails, return empty object
    console.warn('Failed to read image metadata:', error);
    return {};
  }
}

/**
 * Embed EXIF/IPTC metadata into image buffer
 * Returns modified image buffer with embedded metadata
 */
export function embedMetadata(
  imageBuffer: Buffer,
  metadata: EmbedMetadataOptions,
  existingMetadata?: ImageMetadata
): Buffer {
  try {
    // Convert buffer to Uint8Array for piexifjs
    const uint8Array = new Uint8Array(imageBuffer);
    const binary = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ''
    );

    // Parse existing EXIF data
    const exifDict = piexif.load(binary);

    // Prepare EXIF tags
    if (metadata.artist) {
      exifDict['0th'][piexif.ImageIFD.Artist] = metadata.artist;
    }
    if (metadata.copyright) {
      exifDict['0th'][piexif.ImageIFD.Copyright] = metadata.copyright;
    }
    if (metadata.imageDescription) {
      exifDict['0th'][piexif.ImageIFD.ImageDescription] =
        metadata.imageDescription;
    }

    // Prepare IPTC tags (embedded in EXIF)
    // Note: IPTC is typically stored as a separate marker, but piexifjs
    // handles basic EXIF. For full IPTC support with keywords, etc.,
    // we'd need additional processing.

    // Convert back to binary and buffer
    const exifBytes = piexif.dump(exifDict);
    const modifiedBinary = piexif.insert(exifBytes, binary);

    // Convert back to Buffer
    return Buffer.from(modifiedBinary, 'binary');
  } catch (error) {
    console.warn('Failed to embed metadata, returning original buffer:', error);
    return imageBuffer;
  }
}

/**
 * Create metadata from user profile and optional image metadata
 */
export function createMetadataFromProfile(
  userProfile: {
    displayName?: string;
    copyrightArtist?: string;
    copyrightYear?: string;
    copyrightHolder?: string;
    copyrightEmail?: string;
  },
  imageMetadata?: ImageMetadata
): EmbedMetadataOptions {
  const artist = userProfile.copyrightArtist || userProfile.displayName || '';
  const year = userProfile.copyrightYear || new Date().getFullYear().toString();
  const holder = userProfile.copyrightHolder || artist;

  const copyright = `© ${year} ${holder}`;
  const copyrightNotice = `© ${year} ${holder}. All rights reserved.`;
  const contactEmail = userProfile.copyrightEmail ? ` Contact: ${userProfile.copyrightEmail}` : '';
  const imageDescription = `Copyright ${copyrightNotice}${contactEmail}`;

  return {
    artist,
    copyright,
    copyrightNotice,
    imageDescription,
    creator: artist,
    keywords: ['photography', 'copyrighted'],
  };
}

/**
 * Extract copyright info from metadata for display
 */
export function extractCopyrightInfo(metadata: ImageMetadata): {
  artist?: string;
  copyright?: string;
  copyrightNotice?: string;
  contact?: string;
} {
  return {
    artist: metadata.artist || metadata.creator,
    copyright: metadata.copyright || metadata.copyrightNotice,
    copyrightNotice: metadata.copyrightNotice,
    contact: metadata.imageDescription?.match(/Contact: (.+)/)?.at(1),
  };
}

/**
 * Format metadata for CSV export
 */
export function formatMetadataForCSV(metadata: ImageMetadata): Record<string, string> {
  return {
    artist: metadata.artist || '',
    copyright: metadata.copyright || '',
    creator: metadata.creator || '',
    copyrightNotice: metadata.copyrightNotice || '',
    keywords: Array.isArray(metadata.keywords)
      ? metadata.keywords.join(';')
      : metadata.keywords || '',
    imageDescription: metadata.imageDescription || '',
  };
}
