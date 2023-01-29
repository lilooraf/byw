/*
  Warnings:

  - You are about to drop the column `fixtureId` on the `Odd` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Odd` table. All the data in the column will be lost.
  - Added the required column `type` to the `Odd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Odd` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Odd" DROP CONSTRAINT "Odd_fixtureId_fkey";

-- AlterTable
ALTER TABLE "Odd" DROP COLUMN "fixtureId",
DROP COLUMN "name",
ADD COLUMN     "betId" INTEGER,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Bookmaker" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bookmaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fixtureId" INTEGER,
    "bookmakerId" INTEGER,

    CONSTRAINT "Bet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmaker_id_key" ON "Bookmaker"("id");

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bet" ADD CONSTRAINT "Bet_bookmakerId_fkey" FOREIGN KEY ("bookmakerId") REFERENCES "Bookmaker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Odd" ADD CONSTRAINT "Odd_betId_fkey" FOREIGN KEY ("betId") REFERENCES "Bet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
