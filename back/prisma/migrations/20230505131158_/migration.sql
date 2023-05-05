/*
  Warnings:

  - You are about to drop the column `winner` on the `matchhistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "matchhistory" DROP COLUMN "winner",
ADD COLUMN     "won" BOOLEAN NOT NULL DEFAULT false;
