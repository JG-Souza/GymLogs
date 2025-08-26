-- CreateTable
CREATE TABLE `Treino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `horaInicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `horaFim` DATETIME(3) NULL,
    `notas` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `notas` VARCHAR(191) NOT NULL,
    `treinoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Serie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `peso` DOUBLE NOT NULL,
    `repeticao` INTEGER NOT NULL,
    `exercicioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Treino` ADD CONSTRAINT `Treino_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercicio` ADD CONSTRAINT `Exercicio_treinoId_fkey` FOREIGN KEY (`treinoId`) REFERENCES `Treino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Serie` ADD CONSTRAINT `Serie_exercicioId_fkey` FOREIGN KEY (`exercicioId`) REFERENCES `Exercicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
