/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,provider_account_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider_account_id` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropIndex
DROP INDEX `Account_provider_providerAccountId_key` ON `account`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `providerAccountId`,
    DROP COLUMN `userId`,
    ADD COLUMN `provider_account_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `account_provider_provider_account_id_key` ON `account`(`provider`, `provider_account_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Institute_name_key` ON `Institute`(`name`);

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
