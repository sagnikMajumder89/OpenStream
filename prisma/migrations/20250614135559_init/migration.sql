-- CreateEnum
CREATE TYPE "Type" AS ENUM ('MOVIE', 'SERIES', 'DOCUMENTARY', 'ANIME', 'CARTOON');

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);
