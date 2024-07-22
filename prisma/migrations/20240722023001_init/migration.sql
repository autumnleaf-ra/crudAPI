-- CreateTable
CREATE TABLE `helmets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `price` FLOAT NOT NULL,
    `stock` INTEGER NULL,

    INDEX `type_id`(`type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `helmets` ADD CONSTRAINT `helmets_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
