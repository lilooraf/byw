-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "current" BOOLEAN NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_seasonLeague" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_seasonLeague_AB_unique" ON "_seasonLeague"("A", "B");

-- CreateIndex
CREATE INDEX "_seasonLeague_B_index" ON "_seasonLeague"("B");

-- AddForeignKey
ALTER TABLE "_seasonLeague" ADD CONSTRAINT "_seasonLeague_A_fkey" FOREIGN KEY ("A") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_seasonLeague" ADD CONSTRAINT "_seasonLeague_B_fkey" FOREIGN KEY ("B") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
