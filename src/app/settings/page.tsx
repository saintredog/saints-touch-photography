'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CopyrightSettings {
  copyrightArtist?: string;
  copyrightYear?: string;
  copyrightHolder?: string;
  copyrightEmail?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingImages, setIsUpdatingImages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [settings, setSettings] = useState<CopyrightSettings>({
    copyrightArtist: '',
    copyrightYear: new Date().getFullYear().toString(),
    copyrightHolder: '',
    copyrightEmail: '',
  });

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/user/metadata');
        if (!response.ok) throw new Error('Failed to load settings');
        const data = await response.json();
        setSettings({
          copyrightArtist: data.copyrightArtist || '',
          copyrightYear: data.copyrightYear || new Date().getFullYear().toString(),
          copyrightHolder: data.copyrightHolder || '',
          copyrightEmail: data.copyrightEmail || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (field: keyof CopyrightSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError(null);
    setSuccess(null);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/user/metadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) throw new Error('Failed to save settings');

      setSuccess('Copyright settings saved successfully!');
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBatchUpdateImages = async () => {
    if (
      !confirm(
        'This will update copyright metadata on all existing images. This may take a few minutes. Continue?'
      )
    ) {
      return;
    }

    setIsUpdatingImages(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/user/metadata', {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to update images');

      const data = await response.json();
      setSuccess(
        `${data.updated} of ${data.total} images updated successfully!`
      );
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update images');
    } finally {
      setIsUpdatingImages(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="spinner"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">{success}</p>
          </div>
        )}

        {/* Copyright Information Section */}
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Copyright Information</h2>
          <p className="text-gray-600 mb-6">
            Set your copyright information. This will be embedded in all future
            uploads and can be applied to existing images.
          </p>

          <div className="space-y-6">
            {/* Artist Name */}
            <div>
              <label
                htmlFor="copyrightArtist"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Artist Name
              </label>
              <input
                id="copyrightArtist"
                type="text"
                value={settings.copyrightArtist}
                onChange={(e) =>
                  handleInputChange('copyrightArtist', e.target.value)
                }
                placeholder="Your name or studio name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Will be embedded as EXIF Artist and Creator tags
              </p>
            </div>

            {/* Copyright Year */}
            <div>
              <label
                htmlFor="copyrightYear"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Copyright Year
              </label>
              <input
                id="copyrightYear"
                type="text"
                value={settings.copyrightYear}
                onChange={(e) =>
                  handleInputChange('copyrightYear', e.target.value)
                }
                placeholder="2024"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Example: 2024, or 2023-2024 for range
              </p>
            </div>

            {/* Copyright Holder */}
            <div>
              <label
                htmlFor="copyrightHolder"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Copyright Holder
              </label>
              <input
                id="copyrightHolder"
                type="text"
                value={settings.copyrightHolder}
                onChange={(e) =>
                  handleInputChange('copyrightHolder', e.target.value)
                }
                placeholder="Company or full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                The entity that owns the copyright (defaults to Artist Name if
                blank)
              </p>
            </div>

            {/* Contact Email */}
            <div>
              <label
                htmlFor="copyrightEmail"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Contact Email
              </label>
              <input
                id="copyrightEmail"
                type="email"
                value={settings.copyrightEmail}
                onChange={(e) =>
                  handleInputChange('copyrightEmail', e.target.value)
                }
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional: will be embedded in image metadata
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </section>

        {/* Batch Update Section */}
        <section className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Update Existing Images</h2>
          <p className="text-gray-600 mb-6">
            Apply your new copyright information to all existing images. This
            will re-embed metadata in all your uploaded images.
          </p>
          <p className="text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded p-3 mb-6">
            ⚠️ This operation may take several minutes depending on the number
            of images. Don't close this page while the update is in progress.
          </p>

          <button
            onClick={handleBatchUpdateImages}
            disabled={isUpdatingImages}
            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 transition"
          >
            {isUpdatingImages
              ? 'Updating images... (this may take a while)'
              : 'Update All Existing Images'}
          </button>
        </section>
      </div>
    </main>
  );
}
