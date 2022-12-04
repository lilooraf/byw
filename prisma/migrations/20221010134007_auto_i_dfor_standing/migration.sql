-- DropIndex
DROP INDEX "Standing_id_key";

-- AlterTable
CREATE SEQUENCE "standing_id_seq";
ALTER TABLE "Standing" ALTER COLUMN "id" SET DEFAULT nextval('standing_id_seq');
ALTER SEQUENCE "standing_id_seq" OWNED BY "Standing"."id";
