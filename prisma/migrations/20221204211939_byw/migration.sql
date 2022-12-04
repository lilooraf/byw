-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "BywId" INTEGER;

-- CreateTable
CREATE TABLE "Byw" (
    "id" SERIAL NOT NULL,
    "indice" DOUBLE PRECISION NOT NULL,
    "rank" DOUBLE PRECISION NOT NULL,
    "perf" DOUBLE PRECISION NOT NULL,
    "domExtRank" DOUBLE PRECISION NOT NULL,
    "domExtPerf" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fixtureId" INTEGER NOT NULL,

    CONSTRAINT "Byw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Byw_fixtureId_key" ON "Byw"("fixtureId");

-- AddForeignKey
ALTER TABLE "Byw" ADD CONSTRAINT "Byw_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
