/*
  Warnings:

  - You are about to drop the column `userId` on the `matchhistory` table. All the data in the column will be lost.
  - Added the required column `userName` to the `matchhistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "matchhistory" DROP CONSTRAINT "matchhistory_userId_fkey";

-- AlterTable
ALTER TABLE "matchhistory" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "matchhistory" ADD CONSTRAINT "matchhistory_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
