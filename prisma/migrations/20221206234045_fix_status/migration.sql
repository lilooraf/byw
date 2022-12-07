/*
  Warnings:

  - You are about to drop the column `status` on the `Fixture` table. All the data in the column will be lost.
  - Added the required column `status_` to the `Fixture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "status",
ADD COLUMN     "status_" TEXT NOT NULL;
