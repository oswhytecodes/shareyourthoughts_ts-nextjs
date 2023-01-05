-- CreateTable
CREATE TABLE `Favorites` (
    `messageID` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `userMessage` VARCHAR(45) NOT NULL,
    `date` DATETIME(0) NOT NULL,

    PRIMARY KEY (`messageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `userMessage` TEXT NOT NULL,
    `date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `favorite` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
