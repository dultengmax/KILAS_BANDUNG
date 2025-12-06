/*
  Warnings:

  - You are about to drop the column `authorBio` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `Article` table. All the data in the column will be lost.
  - The `category` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subcategory` column on the `Article` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "authorBio",
DROP COLUMN "seoDescription",
DROP COLUMN "seoTitle",
ALTER COLUMN "excerpt" DROP NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" JSONB,
DROP COLUMN "subcategory",
ADD COLUMN     "subcategory" JSONB,
ALTER COLUMN "readTime" DROP NOT NULL,
ALTER COLUMN "views" DROP NOT NULL,
ALTER COLUMN "featuredImage" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;
