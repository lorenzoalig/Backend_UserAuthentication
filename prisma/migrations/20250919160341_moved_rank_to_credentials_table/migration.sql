/*
  Warnings:

  - You are about to drop the column `rank` on the `user_info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user_credentials` ADD COLUMN `rank` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user_info` DROP COLUMN `rank`;
