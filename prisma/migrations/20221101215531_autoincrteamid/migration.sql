-- AlterTable
CREATE SEQUENCE "team_id_seq";
ALTER TABLE "Team" ALTER COLUMN "id" SET DEFAULT nextval('team_id_seq'),
ALTER COLUMN "logo" DROP NOT NULL;
ALTER SEQUENCE "team_id_seq" OWNED BY "Team"."id";
