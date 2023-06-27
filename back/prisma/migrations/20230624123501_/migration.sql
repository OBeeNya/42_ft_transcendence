-- DropForeignKey
ALTER TABLE "user_blocks" DROP CONSTRAINT "user_blocks_blockedId_fkey";

-- DropForeignKey
ALTER TABLE "user_blocks" DROP CONSTRAINT "user_blocks_blockerId_fkey";

-- AddForeignKey
ALTER TABLE "user_blocks" ADD CONSTRAINT "user_blocks_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_blocks" ADD CONSTRAINT "user_blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
