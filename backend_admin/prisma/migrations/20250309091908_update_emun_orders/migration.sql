/*
  Warnings:

  - The values [CONFIRMED] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `img` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
