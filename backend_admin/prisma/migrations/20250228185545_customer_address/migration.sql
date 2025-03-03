-- CreateTable
CREATE TABLE `CustomerAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `CustomerAddress_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerAddress` ADD CONSTRAINT `CustomerAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
