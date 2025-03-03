-- CreateTable
CREATE TABLE `DeliveryAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `zipCode` VARCHAR(20) NULL,
    `phone` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DeliveryAddress` ADD CONSTRAINT `DeliveryAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DeliveryAddress` ADD CONSTRAINT `DeliveryAddress_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
