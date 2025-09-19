/*
  Warnings:

  - Added the required column `rank` to the `User_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_info` ADD COLUMN `rank` INTEGER NOT NULL;
