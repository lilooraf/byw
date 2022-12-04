-- DropForeignKey
ALTER TABLE "Standing" DROP CONSTRAINT "Standing_leagueId_fkey";

-- AddForeignKey
ALTER TABLE "Standing" ADD CONSTRAINT "Standing_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE CASCADE ON UPDATE CASCADE;
