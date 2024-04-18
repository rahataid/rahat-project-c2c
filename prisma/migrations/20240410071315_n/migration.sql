/*
  Warnings:

  - You are about to drop the column `beneficiariesReferred` on the `tbl_beneficiaries` table. All the data in the column will be lost.
  - You are about to drop the column `referralBeneficiaryId` on the `tbl_beneficiaries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tbl_beneficiaries" DROP COLUMN "beneficiariesReferred",
DROP COLUMN "referralBeneficiaryId";
