/*npx
  Warnings:

  - The primary key for the `user_credentials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_credentials` table. All the data in the column will be lost.
  - Added the required column `credentials_id` to the `User_credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_credentials` RENAME COLUMN `id` TO `credentials_id`
