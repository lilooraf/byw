-- AlterTable
ALTER TABLE "Fixture" ADD COLUMN     "seasonId" INTEGER;

-- AddForeignKey
ALTER TABLE "Fixture" ADD CONSTRAINT "Fixture_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;
