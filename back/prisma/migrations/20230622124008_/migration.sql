/*
  Warnings:

  - You are about to drop the `matchhistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "matchhistory" DROP CONSTRAINT "matchhistory_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "history" JSONB[];

-- DropTable
DROP TABLE "matchhistory";
