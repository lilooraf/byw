/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Team` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "team_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");
