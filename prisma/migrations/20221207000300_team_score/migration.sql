/*
  Warnings:

  - Added the required column `awayScore` to the `Fixture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeScore` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "awayScore" INTEGER NOT NULL,
ADD COLUMN     "homeScore" INTEGER NOT NULL;
