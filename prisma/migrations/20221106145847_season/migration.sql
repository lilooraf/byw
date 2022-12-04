/*
  Warnings:

  - You are about to drop the column `seasonId` on the `Fixture` table. All the data in the column will be lost.
  - The primary key for the `Season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `current` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `leagueId` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Season` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Standing` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_seasonId_fkey";

-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" INTEGER;

-- AlterTable
CREATE SEQUENCE "season_year_seq";
ALTER TABLE "Season" DROP CONSTRAINT "Season_pkey",
DROP COLUMN "current",
DROP COLUMN "end",
DROP COLUMN "id",
DROP COLUMN "leagueId",
DROP COLUMN "start",
ALTER COLUMN "year" SET DEFAULT nextval('season_year_seq'),
ADD CONSTRAINT "Season_pkey" PRIMARY KEY ("year");
ALTER SEQUENCE "season_year_seq" OWNED BY "Season"."year";

-- AlterTable
ALTER TABLE "Standing" DROP COLUMN "seasonId",
ADD COLUMN     "seasonYear" INTEGER;

-- CreateTable
CREATE TABLE "_LeagueToSeason" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LeagueToSeason_AB_unique" ON "_LeagueToSeason"("A", "B");

-- CreateIndex
CREATE INDEX "_LeagueToSeason_B_index" ON "_LeagueToSeason"("B");

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "Season"("year") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_seasonYear_fkey" FOREIGN KEY ("seasonYear") REFERENCES "Season"("year") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueToSeason" ADD CONSTRAINT "_LeagueToSeason_A_fkey" FOREIGN KEY ("A") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeagueToSeason" ADD CONSTRAINT "_LeagueToSeason_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("year") ON DELETE CASCADE ON UPDATE CASCADE;
