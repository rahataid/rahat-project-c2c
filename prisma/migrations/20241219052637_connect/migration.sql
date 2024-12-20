/*
  Warnings:

  - You are about to drop the column `campaignId` on the `tbl_campaign` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `tbl_campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `tbl_campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `tbl_campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportId` to the `tbl_campaign` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `tbl_campaign` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "tbl_campaign" DROP COLUMN "campaignId",
ADD COLUMN     "addresses" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "groupUID" UUID,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT,
ADD COLUMN     "transportId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "uuid" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tbl_campaign_uuid_key" ON "tbl_campaign"("uuid");
