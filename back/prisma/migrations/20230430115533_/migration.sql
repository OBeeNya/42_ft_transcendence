/*
  Warnings:

  - You are about to drop the column `opponentId` on the `matchhistory` table. All the data in the column will be lost.
  - Added the required column `opponentName` to the `matchhistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `winner` on the `matchhistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "matchhistory" DROP COLUMN "opponentId",
ADD COLUMN     "opponentName" TEXT NOT NULL,
DROP COLUMN "winner",
ADD COLUMN     "winner" INTEGER NOT NULL;
