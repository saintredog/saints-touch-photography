'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { extractCopyrightInfo, ImageMetadata } from '@/lib/metadata';

interface ImageDetailPageProps {
  params: {
    id: string;
  };
}

interface ImageData {
  id: string;
  title?: string;
  description?: string;
  blobUrl?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  size?: number;
  metadata?: ImageMetadata | null;
  uploadedAt: string;
}

export default function ImageDetailPage({ params }: ImageDetailPageProps) {
  const [image, setImage] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        setImage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner"></div>
          <p>Loading image...</p>
        </div>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error: {error || 'Image not found'}</p>
        </div>
      </div>
    );
  }

  const copyrightInfo = image.metadata
    ? extractCopyrightInfo(image.metadata as ImageMetadata)
    : {};

  const uploadDate = new Date(image.uploadedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Image Display */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {image.blobUrl && (
            <div className="relative bg-gray-200">
              <Image
                src={image.blobUrl}
                alt={image.title || 'Untitled'}
                width={image.width || 800}
                height={image.height || 600}
                className="w-full h-auto"
                priority
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Info */}
            <section className="bg-white rounded-lg shadow p-6">
              <h1 className="text-3xl font-bold mb-4">
                {image.title || 'Untitled Image'}
              </h1>
              {image.description && (
                <p className="text-gray-600 text-lg mb-4">{image.description}</p>
              )}
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  <span className="font-semibold">Uploaded:</span> {uploadDate}
                </p>
                {image.width && image.height && (
                  <p>
                    <span className="font-semibold">Dimensions:</span>{' '}
                    {image.width} × {image.height} px
                  </p>
                )}
                {image.size && (
                  <p>
                    <span className="font-semibold">File Size:</span>{' '}
                    {(image.size / 1024).toFixed(2)} KB
                  </p>
                )}
                {image.mimeType && (
                  <p>
                    <span className="font-semibold">File Type:</span>{' '}
                    {image.mimeType}
                  </p>
                )}
              </div>
            </section>

            {/* Copyright & Metadata Section */}
            {image.metadata && (
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">Image Info</h2>
                <div className="space-y-4">
                  {copyrightInfo.artist && (
                    <div className="border-b pb-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Artist
                      </h3>
                      <p className="text-lg text-gray-800">
                        {copyrightInfo.artist}
                      </p>
                    </div>
                  )}

                  {copyrightInfo.copyright && (
                    <div className="border-b pb-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Copyright
                      </h3>
                      <p className="text-lg text-gray-800">
                        {copyrightInfo.copyright}
                      </p>
                    </div>
                  )}

                  {copyrightInfo.copyrightNotice && (
                    <div className="border-b pb-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Copyright Notice
                      </h3>
                      <p className="text-lg text-gray-800">
                        {copyrightInfo.copyrightNotice}
                      </p>
                    </div>
                  )}

                  {copyrightInfo.contact && (
                    <div className="pb-4">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Contact
                      </h3>
                      <p className="text-lg text-gray-800">
                        {copyrightInfo.contact}
                      </p>
                    </div>
                  )}

                  {!copyrightInfo.artist &&
                    !copyrightInfo.copyright &&
                    !copyrightInfo.contact && (
                      <p className="text-gray-500 italic">
                        No copyright information available
                      </p>
                    )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Actions */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6 space-y-3">
              <h3 className="font-semibold text-lg mb-4">Actions</h3>

              {image.blobUrl && (
                <>
                  <a
                    href={image.blobUrl}
                    download={image.title || 'image'}
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-medium"
                  >
                    Download Image
                  </a>

                  <a
                    href={image.blobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-center font-medium"
                  >
                    View Full Size
                  </a>
                </>
              )}

              <button
                onClick={() => {
                  navigator.clipboard.writeText(image.blobUrl || '');
                  alert('Image URL copied to clipboard');
                }}
                className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
              >
                Copy URL
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
