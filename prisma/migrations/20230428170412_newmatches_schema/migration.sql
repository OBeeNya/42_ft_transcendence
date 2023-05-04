/*
  Warnings:

  - Added the required column `userName` to the `matchhistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "matchhistory" ADD COLUMN     "userName" INTEGER NOT NULL;
