-- CreateTable
CREATE TABLE "_FixtureTeams" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FixtureTeams_AB_unique" ON "_FixtureTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_FixtureTeams_B_index" ON "_FixtureTeams"("B");

-- AddForeignKey
ALTER TABLE "_FixtureTeams" ADD CONSTRAINT "_FixtureTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FixtureTeams" ADD CONSTRAINT "_FixtureTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
