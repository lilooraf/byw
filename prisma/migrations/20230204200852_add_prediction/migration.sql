-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "comparison" JSON,
    "predictions" JSON,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_fixtureId_key" ON "Prediction"("fixtureId");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_fixtureId_fkey" FOREIGN KEY ("fixtureId") REFERENCES "Fixture"("id") ON DELETE CASCADE ON UPDATE CASCADE;
