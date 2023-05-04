/*
  Warnings:

  - Changed the type of `winner` on the `matchhistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "matchhistory" DROP COLUMN "winner",
ADD COLUMN     "winner" INTEGER NOT NULL;
