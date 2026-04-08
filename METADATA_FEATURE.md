# Story 3: Metadata Embedding & Display - Implementation Guide

## Overview

This implementation adds comprehensive EXIF/IPTC metadata support to the photo management app. Users can set copyright information in their profile, which gets embedded in uploaded images and displayed throughout the app.

## ✅ Completed Deliverables

### 1. Core Metadata Library (`src/lib/metadata.ts`)
- **EXIF/IPTC Reading**: Uses `exifr` library for robust metadata extraction
- **EXIF/IPTC Writing**: Uses `piexifjs` for metadata embedding
- **Functions**:
  - `readMetadata()` - Extract metadata from image buffer
  - `embedMetadata()` - Embed copyright info into image buffer
  - `createMetadataFromProfile()` - Generate metadata from user profile
  - `extractCopyrightInfo()` - Format metadata for display
  - `formatMetadataForCSV()` - Prepare metadata for CSV export

### 2. Database Schema Updates
- **Prisma Schema** (`prisma/schema.prisma`):
  - `User`: Added `copyrightArtist`, `copyrightYear`, `copyrightHolder`, `copyrightEmail`
  - `Image`: Added `metadata` (JSON field) for storing EXIF/IPTC data
- **Migration** (`prisma/migrations/add_copyright_metadata/migration.sql`):
  - Adds columns to User and Image tables
  - Creates index on Image metadata for performance

### 3. Image Upload API (`src/app/api/images/route.ts`)
**POST /api/images** - Upload image with automatic metadata embedding
- Extracts user's copyright info from profile
- Reads existing metadata from uploaded image
- Embeds EXIF tags: `Artist`, `Copyright`, `ImageDescription`
- Stores processed image in Vercel Blob
- Saves metadata JSON to database
- Extracts dimensions with Sharp

**GET /api/images** - List user's images with pagination
- Returns images with metadata
- Supports skip/take pagination
- Returns total count and page info

### 4. Metadata Management API (`src/app/api/user/metadata/route.ts`)
**GET /api/user/metadata** - Retrieve user's copyright settings
**POST /api/user/metadata** - Update copyright settings
**PUT /api/user/metadata** - Batch update all existing images
- Long-running operation
- Downloads each image from Blob
- Re-embeds new copyright metadata
- Re-uploads to Blob storage
- Updates database records

### 5. CSV Export API (`src/app/api/images/export/route.ts`)
**GET /api/images/export** - Export all images + metadata as CSV
- Includes columns: ID, Title, Description, URL, Dimensions, File Size
- Copyright columns: Artist, Copyright, Copyright Notice, Creator, Keywords
- Metadata columns: Image Description, Upload Date
- Downloads as `images-export-[timestamp].csv`

### 6. Image Detail Page (`src/app/images/[id]/page.tsx`)
- Displays full image with metadata
- Shows "Image Info" section with:
  - Artist/Creator name
  - Copyright notice
  - Copyright holder info
  - Contact information
- Action buttons:
  - Download image (with embedded metadata)
  - View full size
  - Copy image URL
- Shows technical info: dimensions, file size, file type, upload date

### 7. Settings Page (`src/app/settings/page.tsx`)
**Copyright Information Section**:
- Fields for Artist Name, Copyright Year, Copyright Holder, Contact Email
- Save settings to user profile
- Button to "Update All Existing Images" (batch operation)
- Shows progress and results

### 8. Individual Image API (`src/app/api/images/[id]/route.ts`)
**GET /api/images/[id]** - Fetch specific image details
**DELETE /api/images/[id]** - Delete image (ownership verified)

### 9. Reusable Component (`src/components/MetadataDisplay.tsx`)
- `<MetadataDisplay />` component for displaying copyright info
- Used in image detail view and can be reused elsewhere
- Shows artist, copyright, notice, and contact info
- Responsive layout

### 10. Package Configuration
- **package.json** with all required dependencies:
  - Next.js 14
  - Prisma & Turso adapter
  - Sharp for image processing
  - exifr for EXIF reading
  - piexifjs for EXIF writing
  - json2csv for CSV export
  - Vercel Blob SDK

## 🔄 Data Flow

### On Image Upload
```
User uploads image
  ↓
Extract copyright info from User profile
  ↓
Read existing metadata from image (if any)
  ↓
Embed new EXIF/IPTC tags into image buffer
  ↓
Process with Sharp (rotate, optimize)
  ↓
Upload to Vercel Blob
  ↓
Save Image record + metadata JSON to database
  ↓
Return image details to user
```

### On Metadata Update
```
User updates copyright settings in Settings
  ↓
Save to User profile
  ↓
User clicks "Update All Existing Images"
  ↓
For each image:
  - Download from Blob
  - Extract existing metadata
  - Embed new copyright info
  - Re-upload to Blob
  - Update metadata JSON in database
  ↓
Return results (success/error count)
```

### On CSV Export
```
User clicks "Export Images"
  ↓
Fetch all images with metadata
  ↓
Format metadata fields for CSV
  ↓
Generate CSV with json2csv
  ↓
Return as downloadable file
```

## 📋 File Structure

```
src/
├── lib/
│   ├── metadata.ts          # Core EXIF/IPTC logic
│   ├── db.ts               # Prisma client (existing)
│   └── auth.ts             # Authentication (existing)
├── components/
│   └── MetadataDisplay.tsx  # Reusable metadata component
├── app/
│   ├── api/
│   │   ├── images/
│   │   │   ├── route.ts     # Upload & list images
│   │   │   ├── [id]/
│   │   │   │   └── route.ts # Get/delete specific image
│   │   │   └── export/
│   │   │       └── route.ts # CSV export
│   │   └── user/
│   │       └── metadata/
│   │           └── route.ts # Copyright settings & batch update
│   ├── images/
│   │   └── [id]/
│   │       └── page.tsx     # Image detail view
│   └── settings/
│       └── page.tsx         # Settings page with copyright section
prisma/
├── schema.prisma            # Updated with copyright fields
└── migrations/
    └── add_copyright_metadata/
        └── migration.sql    # Database migration
```

## 🚀 Usage Instructions

### For End Users

1. **Set Copyright Info** (Settings page):
   - Go to Settings → Copyright Information
   - Fill in Artist Name, Copyright Year, Holder, Email
   - Click "Save Settings"

2. **Upload Image**:
   - Images automatically get copyright metadata embedded
   - Metadata visible in image detail view

3. **Update Existing Images**:
   - Change copyright info in Settings
   - Click "Update All Existing Images"
   - Wait for batch operation to complete

4. **Download Image**:
   - Go to image detail page
   - Click "Download Image" button
   - Image includes all embedded metadata

5. **Export Metadata**:
   - Click "Export Images" on gallery
   - CSV file includes all copyright metadata

### For Developers

#### Setup
```bash
npm install
npx prisma db push
npm run dev
```

#### Add New Metadata Fields
Edit `src/lib/metadata.ts`:
```typescript
export interface ImageMetadata {
  // Add new fields here
  newField?: string;
}
```

#### Use Metadata Display Component
```tsx
import { MetadataDisplay } from '@/components/MetadataDisplay';

<MetadataDisplay metadata={image.metadata} />
```

## 🔐 Security & Privacy

- **Ownership Verification**: All endpoints verify user owns the image
- **No Public Metadata**: Images are only accessible to owner
- **Safe Metadata**: Only stores non-sensitive copyright info
- **Batch Operations**: Long-running operations can be monitored

## 📊 Database Schema

### User Table Updates
```sql
copyrightArtist STRING     -- Artist/photographer name
copyrightYear STRING       -- Copyright year or range
copyrightHolder STRING     -- Legal entity holding copyright
copyrightEmail STRING      -- Contact email
```

### Image Table Updates
```sql
metadata JSON              -- Stores EXIF/IPTC data as JSON
                           -- Example: {
                           --   "artist": "John Doe",
                           --   "copyright": "© 2024 John Doe",
                           --   "creator": "John Doe",
                           --   "copyrightNotice": "© 2024 John Doe. All rights reserved.",
                           --   "keywords": ["photography", "copyrighted"]
                           -- }
```

## 🧪 Testing Checklist

### Metadata Embedding
- [ ] Upload image → metadata embedded correctly
- [ ] Read EXIF from uploaded image → existing tags preserved
- [ ] Different image formats (JPEG, PNG, WebP) → all work

### Settings & Batch Update
- [ ] Update copyright info → saved to user profile
- [ ] Batch update button → all images updated
- [ ] Check updated image → new metadata visible

### Display & Export
- [ ] Image detail page → metadata displays correctly
- [ ] CSV export → includes all metadata columns
- [ ] Download image → file contains metadata

### Edge Cases
- [ ] Image without EXIF → metadata still embedded
- [ ] Corrupted EXIF → graceful fallback
- [ ] Large batch update → handles many images
- [ ] Missing fields → defaults used appropriately

## 📝 Future Enhancements

- **Watermarking**: Add visual watermark based on copyright info
- **Bulk Import**: Import metadata from CSV
- **IPTC Editor**: Edit IPTC keywords and tags per image
- **Metadata Templates**: Save and reuse metadata presets
- **License Types**: Add EXIF license field
- **Search by Metadata**: Find images by artist, keywords, etc.
- **Metadata Validation**: Ensure copyright info is valid
- **Webhook Notifications**: Notify when batch update completes

## 🐛 Known Limitations

1. **IPTC Support**: `piexifjs` has limited IPTC support. For full IPTC (keywords, etc.), additional libraries may be needed.
2. **Async Batch Updates**: PUT endpoint doesn't return real-time progress. Consider WebSocket for long operations.
3. **Blob Storage Cost**: Each metadata update re-uploads the entire image. Consider conditional updates.

## 📚 References

- [exifr Documentation](https://github.com/MikeKovarik/exifr)
- [piexifjs Documentation](https://piexifjs.readthedocs.io/)
- [EXIF Standard Tags](https://www.exif.org/)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Prisma Turso Adapter](https://www.prisma.io/docs/orm/overview/databases/turso)
