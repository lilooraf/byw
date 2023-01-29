-- CreateTable
CREATE TABLE "Odd" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "fixtureId" INTEGER,

    CONSTRAINT "Odd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Odd_id_key" ON "Odd"("id");

-- AddForeignKey
ALTER TABLE "Odd" ADD CONSTRAINT "Odd_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
