/*
  Warnings:

  - Added the required column `src` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "src" TEXT NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'MOVIE';

-- AlterTable
ALTER TABLE "Series" ALTER COLUMN "type" SET DEFAULT 'SERIES';

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "seriesId" INTEGER,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episodes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "seasonId" INTEGER,

    CONSTRAINT "Episodes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episodes" ADD CONSTRAINT "Episodes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;
