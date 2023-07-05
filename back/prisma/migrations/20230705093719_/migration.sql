/*
  Warnings:

  - You are about to drop the `user_chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_chats" DROP CONSTRAINT "user_chats_chatId_fkey";

-- DropForeignKey
ALTER TABLE "user_chats" DROP CONSTRAINT "user_chats_userId_fkey";

-- DropTable
DROP TABLE "user_chats";

-- CreateTable
CREATE TABLE "pong_invitations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "invitedId" INTEGER NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pong_invitations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pong_invitations" ADD CONSTRAINT "pong_invitations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pong_invitations" ADD CONSTRAINT "pong_invitations_invitedId_fkey" FOREIGN KEY ("invitedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
