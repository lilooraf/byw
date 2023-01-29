-- DropIndex
DROP INDEX "Odd_id_key";

-- AlterTable
CREATE SEQUENCE "odd_id_seq";
ALTER TABLE "Odd" ALTER COLUMN "id" SET DEFAULT nextval('odd_id_seq');
ALTER SEQUENCE "odd_id_seq" OWNED BY "Odd"."id";
