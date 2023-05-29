/*
  Warnings:

  - You are about to drop the column `tfa_url` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "tfa_url";
