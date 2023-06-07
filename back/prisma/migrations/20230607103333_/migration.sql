/*
  Warnings:

  - You are about to drop the `direct_messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_senderId_fkey";

-- DropTable
DROP TABLE "direct_messages";
