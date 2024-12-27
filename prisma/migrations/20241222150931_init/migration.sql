/*
  Warnings:

  - You are about to drop the column `createdat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector_id` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedDate` to the `Campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaigns" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sector_id" INTEGER NOT NULL,
ADD COLUMN     "startedDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdat",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Sector" (
    "sector_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("sector_id")
);

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("sector_id") ON DELETE CASCADE ON UPDATE CASCADE;
