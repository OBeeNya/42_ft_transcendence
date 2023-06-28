/*
  Warnings:

  - You are about to drop the column `exp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `ladders` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `opponents` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wons` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "exp",
DROP COLUMN "ladders",
DROP COLUMN "opponents",
DROP COLUMN "wons";

-- CreateTable
CREATE TABLE "matchhistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "opponentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ladder" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "matchhistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "matchhistory" ADD CONSTRAINT "matchhistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
