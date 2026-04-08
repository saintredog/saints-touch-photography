-- Add copyright fields to User table
ALTER TABLE "User" ADD COLUMN "copyrightArtist" TEXT;
ALTER TABLE "User" ADD COLUMN "copyrightYear" TEXT;
ALTER TABLE "User" ADD COLUMN "copyrightHolder" TEXT;
ALTER TABLE "User" ADD COLUMN "copyrightEmail" TEXT;

-- Add metadata field to Image table to store EXIF/IPTC data
ALTER TABLE "Image" ADD COLUMN "metadata" JSON;

-- Create index for faster metadata queries if needed
CREATE INDEX "idx_image_metadata" ON "Image"("metadata");
