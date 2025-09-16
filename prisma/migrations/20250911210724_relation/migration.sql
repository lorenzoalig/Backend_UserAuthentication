/*
  Warnings:

  - The primary key for the `user_credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password_` on the `user_credentials` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User_credentials` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_infoId]` on the table `User_credentials` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `User_credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User_credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_infoId` to the `User_credentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_credentials` DROP PRIMARY KEY,
    DROP COLUMN `password_`,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_infoId` INTEGER NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_info` MODIFY `user_id` INTEGER NOT NULL AUTO_INCREMENT;

-- CreateIndex
CREATE UNIQUE INDEX `User_credentials_username_key` ON `User_credentials`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `User_credentials_user_infoId_key` ON `User_credentials`(`user_infoId`);

-- AddForeignKey
ALTER TABLE `User_credentials` ADD CONSTRAINT `User_credentials_user_infoId_fkey` FOREIGN KEY (`user_infoId`) REFERENCES `User_info`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
