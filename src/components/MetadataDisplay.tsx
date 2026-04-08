'use client';

import { ImageMetadata, extractCopyrightInfo } from '@/lib/metadata';

interface MetadataDisplayProps {
  metadata?: ImageMetadata | null;
  className?: string;
}

/**
 * Reusable component to display image metadata/copyright information
 */
export function MetadataDisplay({
  metadata,
  className = '',
}: MetadataDisplayProps) {
  if (!metadata) {
    return null;
  }

  const info = extractCopyrightInfo(metadata);

  return (
    <div className={`space-y-4 ${className}`}>
      {info.artist && (
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Artist
          </h3>
          <p className="text-gray-800">{info.artist}</p>
        </div>
      )}

      {info.copyright && (
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Copyright
          </h3>
          <p className="text-gray-800">{info.copyright}</p>
        </div>
      )}

      {info.copyrightNotice && (
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Copyright Notice
          </h3>
          <p className="text-gray-800">{info.copyrightNotice}</p>
        </div>
      )}

      {info.contact && (
        <div className="pb-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Contact
          </h3>
          <p className="text-gray-800">{info.contact}</p>
        </div>
      )}

      {!info.artist &&
        !info.copyright &&
        !info.copyrightNotice &&
        !info.contact && (
          <p className="text-gray-500 italic text-sm">
            No copyright information available
          </p>
        )}
    </div>
  );
}
