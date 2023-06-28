/*
  Warnings:

  - You are about to drop the column `losses` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `opponents` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "losses",
DROP COLUMN "opponents",
DROP COLUMN "wins",
ADD COLUMN     "exp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "gameDates" TEXT[];
