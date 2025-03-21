-- CreateTable
CREATE TABLE `Wishlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlist` ADD CONSTRAINT `Wishlist_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
