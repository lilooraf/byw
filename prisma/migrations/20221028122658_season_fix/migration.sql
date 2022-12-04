/*
  Warnings:

  - You are about to drop the `_seasonLeague` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `leagueId` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_seasonLeague" DROP CONSTRAINT "_seasonLeague_A_fkey";

-- DropForeignKey
ALTER TABLE "_seasonLeague" DROP CONSTRAINT "_seasonLeague_B_fkey";

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "leagueId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_seasonLeague";

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
