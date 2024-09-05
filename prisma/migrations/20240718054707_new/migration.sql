-- CreateEnum
CREATE TYPE "SettingDataType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'OBJECT');

-- CreateEnum
CREATE TYPE "BeneficiaryType" AS ENUM ('ENROLLED', 'REFERRED');

-- CreateEnum
CREATE TYPE "DisbursementType" AS ENUM ('PROJECT', 'EOA', 'MULTISIG');

-- CreateEnum
CREATE TYPE "DisbursementStatus" AS ENUM ('DRAFT', 'PENDING', 'COMPLETED', 'REJECTED');

-- CreateTable
CREATE TABLE "tbl_settings" (
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "dataType" "SettingDataType" NOT NULL,
    "requiredFields" TEXT[],
    "isReadOnly" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tbl_settings_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "tbl_beneficiaries" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "walletAddress" TEXT,
    "extras" JSONB,
    "type" "BeneficiaryType" NOT NULL DEFAULT 'ENROLLED',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_campaign" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,

    CONSTRAINT "tbl_campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disbursement" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "type" "DisbursementType" NOT NULL DEFAULT 'PROJECT',
    "status" "DisbursementStatus" NOT NULL DEFAULT 'DRAFT',
    "timestamp" TEXT,
    "amount" INTEGER,
    "transactionHash" TEXT,
    "extras" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Disbursement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisbursementBeneficiary" (
    "id" SERIAL NOT NULL,
    "disbursementId" INTEGER NOT NULL,
    "beneficiaryWalletAddress" TEXT NOT NULL,
    "from" TEXT,
    "amount" INTEGER,
    "transactionHash" TEXT,
    "extras" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "DisbursementBeneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_settings_name_key" ON "tbl_settings"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_uuid_key" ON "tbl_beneficiaries"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_beneficiaries_walletAddress_key" ON "tbl_beneficiaries"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Disbursement_uuid_key" ON "Disbursement"("uuid");

-- AddForeignKey
ALTER TABLE "DisbursementBeneficiary" ADD CONSTRAINT "DisbursementBeneficiary_disbursementId_fkey" FOREIGN KEY ("disbursementId") REFERENCES "Disbursement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisbursementBeneficiary" ADD CONSTRAINT "DisbursementBeneficiary_beneficiaryWalletAddress_fkey" FOREIGN KEY ("beneficiaryWalletAddress") REFERENCES "tbl_beneficiaries"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
