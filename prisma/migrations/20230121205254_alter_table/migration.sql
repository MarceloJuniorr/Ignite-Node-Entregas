/*
  Warnings:

  - Made the column `end_at` on table `deliveries` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `deliveries` MODIFY `end_at` DATETIME(3) NOT NULL;
