# Rahat Project C2C Documentation

## Summary

The Rahat Project C2C is a monorepo designed to facilitate a Crypto-2-Crypto Cash Voucher Assistance (CVA) flow. It includes features such as a deposit token feature with a QR code, user roles and permissions with whitelisting for disbursement transactions, disbursement approvals with detailed execution information, and a multi-sig disbursement flow directed back to the safe wallet. This project is dependent on the `rahat-core` project, which must be set up and running before starting the Rahat Project C2C.

## Prerequisites

Ensure your system has the following dependencies installed:

- Docker: Version 20.10.7 or higher
- Node.js: Version 20.10.0 or higher
- pnpm (Package Manager): Version 6.16.1 or higher

Before beginning, ensure the `rahat-core` project is set up and running by following the instructions in the `rahat-core` repository.

## Setup and Running Locally

### Step 1: Clone the Project

Clone the Rahat Project C2C repository using the following command:

```sh
git clone git@github.com:rahataid/rahat-project-c2c.git
```

### Step 2: Navigate to the Project Directory and Bootstrap the Project

Navigate to the project directory and bootstrap the project using pnpm:

```sh
pnpm bootstrap
```

### Step 3: Run the Project

Start the project using the following command:

```sh
pnpm start
```

## Description

### Crypto-2-Crypto CVA Flow

#### Deposit Token Feature

- **QR Code Feature:** Consider adding a QR code feature that can be shared. Offer users the option to deposit via wallet or generate a QR code.

#### User Roles and Permissions

- **Whitelisting:** Implement whitelisting for users who can access disbursement transactions.

#### Disbursement Approvals

- **Execution Details:** Include the person who executed the last transaction and add a timestamp instead of just the date.

#### Multi-Sig Disbursement

- **Disbursement Flow:** Identify the flow for directing multi-sig disbursements back to the safe wallet.

By following these instructions, you will be able to set up and run the Rahat Project C2C locally, and leverage its features for Crypto-2-Crypto Cash Voucher Assistance.

---
