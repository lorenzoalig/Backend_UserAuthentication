/*
  Warnings:

  - You are about to drop the `deleted_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_credentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_credentials` DROP FOREIGN KEY `User_credentials_user_infoId_fkey`;

-- DropTable
DROP TABLE `deleted_users`;

-- DropTable
DROP TABLE `user_credentials`;

-- DropTable
DROP TABLE `user_info`;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credentials` (
    `credentialsId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rank` INTEGER NOT NULL DEFAULT 1,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Credentials_email_key`(`email`),
    UNIQUE INDEX `Credentials_username_key`(`username`),
    UNIQUE INDEX `Credentials_userId_key`(`userId`),
    PRIMARY KEY (`credentialsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
