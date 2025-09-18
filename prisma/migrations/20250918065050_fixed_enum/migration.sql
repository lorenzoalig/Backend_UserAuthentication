/*
  Warnings:

  - You are about to alter the column `gender` on the `deleted_users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `gender` on the `user_info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `deleted_users` MODIFY `gender` ENUM('Male', 'Female', 'Other') NOT NULL;

-- AlterTable
ALTER TABLE `user_info` MODIFY `gender` ENUM('Male', 'Female', 'Other') NOT NULL;
