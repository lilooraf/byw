-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_leagueId_fkey";

-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
