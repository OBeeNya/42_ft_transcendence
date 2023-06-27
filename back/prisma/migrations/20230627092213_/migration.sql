/*
  Warnings:

  - You are about to drop the column `channelId` on the `messages` table. All the data in the column will be lost.
  - Added the required column `chatId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_channelId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "channelId",
ADD COLUMN     "chatId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
