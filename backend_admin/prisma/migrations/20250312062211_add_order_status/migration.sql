/*
  Warnings:

  - The values [WAITING_TO_BE_SHIPPED,OUT_FOR_DELIVERY] on the enum `order_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('PENDING', 'WAITING TO BE SHIPPED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
