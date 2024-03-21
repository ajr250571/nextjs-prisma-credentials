/*
  Warnings:

  - Added the required column `reloj` to the `elitex` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `elitex` ADD COLUMN `reloj` INTEGER NOT NULL;
