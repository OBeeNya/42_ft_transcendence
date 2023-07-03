/*
  Warnings:

  - You are about to drop the column `chatId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `chats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_chats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channelId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_chatId_fkey";

-- DropForeignKey
ALTER TABLE "user_chats" DROP CONSTRAINT "user_chats_chatId_fkey";

-- DropForeignKey
ALTER TABLE "user_chats" DROP CONSTRAINT "user_chats_userId_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "chatId",
ADD COLUMN     "channelId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "chats";

-- DropTable
DROP TABLE "user_chats";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
