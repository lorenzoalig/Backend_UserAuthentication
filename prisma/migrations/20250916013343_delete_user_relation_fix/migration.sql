-- DropForeignKey
ALTER TABLE `user_credentials` DROP FOREIGN KEY `User_credentials_user_infoId_fkey`;

-- AddForeignKey
ALTER TABLE `User_credentials` ADD CONSTRAINT `User_credentials_user_infoId_fkey` FOREIGN KEY (`user_infoId`) REFERENCES `User_info`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
