-- AlterEnum
ALTER TYPE "VideoStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "videoId" TEXT;
