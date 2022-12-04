/*
  Warnings:

  - You are about to drop the `_leagueTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_leagueTeam" DROP CONSTRAINT "_leagueTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_leagueTeam" DROP CONSTRAINT "_leagueTeam_B_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "leagueId" INTEGER;

-- DropTable
DROP TABLE "_leagueTeam";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
