/*
  Warnings:

  - You are about to drop the `_owner` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ownerId` to the `channels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_owner" DROP CONSTRAINT "_owner_A_fkey";

-- DropForeignKey
ALTER TABLE "_owner" DROP CONSTRAINT "_owner_B_fkey";

-- AlterTable
ALTER TABLE "channels" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_owner";

-- AddForeignKey
ALTER TABLE "channels" ADD CONSTRAINT "channels_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
