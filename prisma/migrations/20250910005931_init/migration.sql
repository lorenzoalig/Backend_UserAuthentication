-- CreateTable
CREATE TABLE `User_info` (
    `user_id` INTEGER NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_credentials` (
    `user_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
