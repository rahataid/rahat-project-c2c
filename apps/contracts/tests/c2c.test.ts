import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { RahatToken, C2CProject } from "../typechain-types";
import { C2CFixture, deployC2CFixture } from "./fixtures";

describe('------ Rahat Token Tests ------', function () {

    describe("Project Disbursement", function () {

        let cf: C2CFixture;
        before(async function () {
            cf = await loadFixture(deployC2CFixture);

        });
        it("should deploy contracts with expected initial values", async function () {
            expect(await cf.rahatToken.name()).to.equal('Rahat');
            expect(await cf.rahatToken.symbol()).to.equal('RTH');
            expect(await cf.rahatToken.decimals()).to.equal(0n);
            expect(await cf.rahatToken.totalSupply()).to.equal(0n);
            console.log(await cf.accessManager.ADMIN_ROLE());
        });

        it('should mint tokens', async function () {
            await cf.rahatToken.connect(cf.admin).mint(cf.admin.address, 1000n);
            expect(await cf.rahatToken.balanceOf(cf.admin.address)).to.equal(1000n);
        }
        );

        it('should transfer tokens to project', async function () {
            await cf.rahatToken.connect(cf.admin).transfer(cf.c2cProject.target, 1000n);
            expect(await cf.rahatToken.balanceOf(cf.c2cProject.target)).to.equal(1000n);
        });


        it('should not be disburse by non-admin', async function () {
            await expect(cf.c2cProject.connect(cf.notAdmin).disburseProjectToken(cf.rahatToken.target, cf.beneficiary.address, 10n)).to.be.reverted;
        });

        it("should disburse tokens from project", async function () {
            await cf.c2cProject.disburseProjectToken(cf.rahatToken.target, cf.beneficiary.address, 10n);
            expect(await cf.rahatToken.balanceOf(cf.beneficiary.address)).to.equal(10n);
        }
        );

        it('should not be able to withdraw from project by non-admin', async function () {
            const prevBalance = await cf.rahatToken.balanceOf(cf.c2cProject.target);
            expect(cf.c2cProject.connect(cf.notAdmin).withdrawToken(cf.rahatToken.target, cf.beneficiary.address)).to.be.reverted;
            expect(await cf.rahatToken.balanceOf(cf.c2cProject.target)).to.equal(prevBalance);
        }
        );

        it('should be able to withdraw from project by admin', async function () {
            const prevBalance = await cf.rahatToken.balanceOf(cf.c2cProject.target);
            await cf.c2cProject.connect(cf.admin).withdrawToken(cf.rahatToken.target, cf.admin.address);
            expect(await cf.rahatToken.balanceOf(cf.c2cProject.target)).to.equal(0n);
            expect(await cf.rahatToken.balanceOf(cf.admin.address)).to.equal(prevBalance);
        });




    });

    describe("EOA Disbursement", function () {

        let cf: C2CFixture;
        before(async function () {
            cf = await loadFixture(deployC2CFixture);

        });
        it("should deploy contracts with expected initial values", async function () {
            expect(await cf.rahatToken.name()).to.equal('Rahat');
            expect(await cf.rahatToken.symbol()).to.equal('RTH');
            expect(await cf.rahatToken.decimals()).to.equal(0n);
            expect(await cf.rahatToken.totalSupply()).to.equal(0n);
        });

        it('should mint tokens', async function () {
            await cf.rahatToken.connect(cf.admin).mint(cf.admin.address, 1000n);
            expect(await cf.rahatToken.balanceOf(cf.admin.address)).to.equal(1000n);
        }
        );

        it('should Approve tokens to project', async function () {
            await cf.rahatToken.connect(cf.admin).approve(cf.c2cProject.target, 1000n);
            expect(await cf.rahatToken.allowance(cf.admin.address, cf.c2cProject.target)).to.equal(1000n);
        });

        it('should not be disburse by non-admin', async function () {
            await expect(cf.c2cProject.connect(cf.notAdmin).disburseOwnedToken(cf.rahatToken.target, cf.beneficiary.address, 10n)).to.be.reverted;
        });

        it("should disburse tokens from EOA", async function () {
            await cf.c2cProject.connect(cf.admin).disburseOwnedToken(cf.rahatToken.target, cf.beneficiary.address, 10n);
            expect(await cf.rahatToken.balanceOf(cf.beneficiary.address)).to.equal(10n);
        }
        );


    });


    describe("External wallet Disbursement (Multisig wallets)", function () {
        let cf: C2CFixture;
        before(async function () {
            cf = await loadFixture(deployC2CFixture);
        });

        it("should deploy contracts with expected initial values", async function () {
            expect(await cf.rahatToken.name()).to.equal('Rahat');
            expect(await cf.rahatToken.symbol()).to.equal('RTH');
            expect(await cf.rahatToken.decimals()).to.equal(0n);
            expect(await cf.rahatToken.totalSupply()).to.equal(0n);
        });

        it('should mint tokens', async function () {
            await cf.rahatToken.connect(cf.admin).mint(cf.admin.address, 1000n);
            expect(await cf.rahatToken.balanceOf(cf.admin.address)).to.equal(1000n);
        }
        );

        it('should Approve tokens to project', async function () {
            await cf.rahatToken.connect(cf.admin).approve(cf.c2cProject.target, 1000n);
            expect(await cf.rahatToken.allowance(cf.admin.address, cf.c2cProject.target)).to.equal(1000n);
        });

        it('should not be disburse by non-admin', async function () {
            await expect(cf.c2cProject.connect(cf.notAdmin).disburseExternalToken(cf.rahatToken.target, cf.beneficiary.address, cf.admin.address, 10n)).to.be.reverted;
        });

        it("should disburse tokens from project", async function () {
            await cf.c2cProject.connect(cf.admin).disburseExternalToken(cf.rahatToken.target, cf.beneficiary.address, cf.admin.address, 10n);
            expect(await cf.rahatToken.balanceOf(cf.beneficiary.address)).to.equal(10n);
        }
        );


    });
});


