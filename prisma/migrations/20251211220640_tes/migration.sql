-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "image" TEXT,
ADD COLUMN     "video" TEXT,
ALTER COLUMN "type" DROP NOT NULL;
