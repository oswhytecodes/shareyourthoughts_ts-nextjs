-- RenameIndex
ALTER TABLE `Favorites` RENAME INDEX `userID` TO `Favorites_userId_fkey`;

-- RenameIndex
ALTER TABLE `Messages` RENAME INDEX `userID` TO `Messages_userId_fkey`;
