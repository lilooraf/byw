/*
  Warnings:

  - You are about to drop the `_FixturesH2h` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `seasonId` to the `Standing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FixturesH2h" DROP CONSTRAINT "_FixturesH2h_A_fkey";

-- DropForeignKey
ALTER TABLE "_FixturesH2h" DROP CONSTRAINT "_FixturesH2h_B_fkey";

-- AlterTable
ALTER TABLE "Standing" ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_FixturesH2h";

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
