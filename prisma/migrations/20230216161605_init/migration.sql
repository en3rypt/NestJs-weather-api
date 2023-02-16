-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(191) NOT NULL,
    `temperature` DOUBLE NOT NULL,
    `date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
