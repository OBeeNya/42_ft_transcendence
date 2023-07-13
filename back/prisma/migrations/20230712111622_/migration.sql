/*
  Warnings:

  - You are about to drop the column `userId` on the `Chanmessages` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Chanmessages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chanmessages" DROP CONSTRAINT "Chanmessages_userId_fkey";

-- AlterTable
ALTER TABLE "Chanmessages" DROP COLUMN "userId",
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Chanmessages" ADD CONSTRAINT "Chanmessages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
