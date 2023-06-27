-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "direct_messages" DROP CONSTRAINT "direct_messages_senderId_fkey";

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
