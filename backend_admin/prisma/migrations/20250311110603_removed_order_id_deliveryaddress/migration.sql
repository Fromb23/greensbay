/*
  Warnings:

  - You are about to drop the column `orderId` on the `deliveryaddress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `deliveryaddress` DROP FOREIGN KEY `DeliveryAddress_orderId_fkey`;

-- DropIndex
DROP INDEX `DeliveryAddress_orderId_fkey` ON `deliveryaddress`;

-- AlterTable
ALTER TABLE `deliveryaddress` DROP COLUMN `orderId`;

-- CreateIndex
CREATE INDEX `DeliveryAddress_userId_fkey` ON `deliveryaddress`(`userId`);
