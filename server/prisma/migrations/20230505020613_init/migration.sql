-- DropIndex
DROP INDEX "Auth_id_key";

-- AlterTable
CREATE SEQUENCE auth_id_seq;
ALTER TABLE "Auth" ALTER COLUMN "id" SET DEFAULT nextval('auth_id_seq'),
ADD CONSTRAINT "Auth_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE auth_id_seq OWNED BY "Auth"."id";
