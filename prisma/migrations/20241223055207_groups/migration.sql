/*
  Warnings:

  - You are about to drop the column `addresses` on the `tbl_campaign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_campaign" DROP COLUMN "addresses";

-- CreateTable
CREATE TABLE "tbl_beneficiaries_groups" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_beneficiaries_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_groups_uuid_key" ON "tbl_beneficiaries_groups"("uuid");

-- AddForeignKey
ALTER TABLE "tbl_campaign" ADD CONSTRAINT "tbl_campaign_groupUID_fkey" FOREIGN KEY ("groupUID") REFERENCES "tbl_beneficiaries_groups"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
