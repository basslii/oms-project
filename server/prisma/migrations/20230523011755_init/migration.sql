/*
  Warnings:

  - You are about to drop the `Auth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userId_fkey";

-- DropTable
DROP TABLE "Auth";
