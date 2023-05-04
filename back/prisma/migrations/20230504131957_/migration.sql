/*
  Warnings:

  - Added the required column `userId` to the `matchhistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matchhistory" DROP CONSTRAINT "matchhistory_userName_fkey";

-- AlterTable
ALTER TABLE "matchhistory" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "matchhistory" ADD CONSTRAINT "matchhistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
