/*
  Warnings:

  - You are about to drop the column `table` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "table",
ADD COLUMN     "numerounico" SERIAL NOT NULL;
