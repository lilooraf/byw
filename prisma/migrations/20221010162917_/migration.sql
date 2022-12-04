/*
  Warnings:

  - You are about to drop the column `leagueId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_leagueId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "leagueId";

-- CreateTable
CREATE TABLE "_leagueTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_leagueTeam_AB_unique" ON "_leagueTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_leagueTeam_B_index" ON "_leagueTeam"("B");

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_leagueTeam" ADD CONSTRAINT "_leagueTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_leagueTeam" ADD CONSTRAINT "_leagueTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
