/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_userID_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `admin`;
