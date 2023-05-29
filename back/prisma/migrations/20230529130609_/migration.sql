/*
  Warnings:

  - Added the required column `tfa_url` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tfa_url" TEXT NOT NULL;
