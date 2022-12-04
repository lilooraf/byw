/*
  Warnings:

  - You are about to drop the column `fixtureParentAwayId` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `fixtureParentHomeId` on the `Fixture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_fixtureParentAwayId_fkey";

-- DropForeignKey
ALTER TABLE "Fixture" DROP CONSTRAINT "Fixture_fixtureParentHomeId_fkey";

-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "fixtureParentAwayId",
DROP COLUMN "fixtureParentHomeId";

-- CreateTable
CREATE TABLE "Standing" (
    "id" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "goalsDiff" INTEGER NOT NULL,
    "score" JSON,
    "leagueId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Standing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FixturesH2h" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Standing_id_key" ON "Standing"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Standing_teamId_key" ON "Standing"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "_FixturesH2h_AB_unique" ON "_FixturesH2h"("A", "B");

-- CreateIndex
CREATE INDEX "_FixturesH2h_B_index" ON "_FixturesH2h"("B");

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FixturesH2h" ADD CONSTRAINT "_FixturesH2h_A_fkey" FOREIGN KEY ("A") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FixturesH2h" ADD CONSTRAINT "_FixturesH2h_B_fkey" FOREIGN KEY ("B") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
