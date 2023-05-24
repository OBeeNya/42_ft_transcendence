/*
  Warnings:

  - Added the required column `tfa_key` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tfa_key" TEXT NOT NULL;
