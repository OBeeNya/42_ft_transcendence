/*
  Warnings:

  - You are about to drop the column `history` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "history",
ADD COLUMN     "ladders" INTEGER[],
ADD COLUMN     "opponents" TEXT[],
ADD COLUMN     "wons" BOOLEAN[];
