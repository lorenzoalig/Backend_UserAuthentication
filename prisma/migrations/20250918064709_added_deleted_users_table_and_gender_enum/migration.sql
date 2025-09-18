/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User_credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `Deleted_users` (
    `deleted_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Deleted_users_email_key`(`email`),
    UNIQUE INDEX `Deleted_users_username_key`(`username`),
    PRIMARY KEY (`deleted_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_credentials_email_key` ON `User_credentials`(`email`);
