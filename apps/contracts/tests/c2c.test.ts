import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { RahatToken, C2CProject } from "../typechain-types";


interface Fixture {
    rahatToken: RahatToken;
    c2cProject: C2CProject;
    deployer: any;
    owner: any;
    manager: any;
    minter: any;
    beneficiary: any;
}

describe('------ Rahat Token Tests ------', function () {
    const deployRahatFixture = async function (): Promise<Fixture> {
        //@ts-ignore
        const [deployer, owner, manager, minter, beneficiary] = await hre.ethers.getSigners();
        const rahatToken: RahatToken = await hre.ethers.deployContract("RahatToken", ['Rahat', 'RTH', owner.address, 0]);
        const c2cProject = await hre.ethers.deployContract("C2CProject", ['c2c']);
        return {
            rahatToken,
            c2cProject,
            deployer,
            owner,
            manager,
            minter,
            beneficiary

        };
    }

    describe("Project Disbursement", function () {
        let rahatToken: RahatToken;
        let owner: any;
        let manager: any;
        let c2cProject: C2CProject;
        let beneficiary: any;

        before(async function () {
            const fixtures = await loadFixture(deployRahatFixture);
            rahatToken = fixtures.rahatToken;
            owner = fixtures.owner;
            manager = fixtures.manager;
            c2cProject = fixtures.c2cProject;
            beneficiary = fixtures.beneficiary;

        });
        it("should deploy contracts with expected initial values", async function () {
            expect(await rahatToken.name()).to.equal('Rahat');
            expect(await rahatToken.symbol()).to.equal('RTH');
            expect(await rahatToken.decimals()).to.equal(0n);
            expect(await rahatToken.totalSupply()).to.equal(0n);
        });

        it('should mint tokens', async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            expect(await rahatToken.balanceOf(owner.address)).to.equal(1000n);
        }
        );

        it('should transfer tokens to project', async function () {
            await rahatToken.connect(owner).transfer(c2cProject.target, 1000n);
            expect(await rahatToken.balanceOf(c2cProject.target)).to.equal(1000n);
        });

        it("should disburse tokens from project", async function () {
            await c2cProject.disburseProjectToken(rahatToken.target, beneficiary.address, 10n);
            expect(await rahatToken.balanceOf(beneficiary.address)).to.equal(10n);
        }
        );


    });

    describe("EOA Disbursement", function () {
        let rahatToken: RahatToken;
        let owner: any;
        let manager: any;
        let c2cProject: C2CProject;
        let beneficiary: any;

        before(async function () {
            const fixtures = await loadFixture(deployRahatFixture);
            rahatToken = fixtures.rahatToken;
            owner = fixtures.owner;
            manager = fixtures.manager;
            c2cProject = fixtures.c2cProject;
            beneficiary = fixtures.beneficiary;

        });
        it("should deploy contracts with expected initial values", async function () {
            expect(await rahatToken.name()).to.equal('Rahat');
            expect(await rahatToken.symbol()).to.equal('RTH');
            expect(await rahatToken.decimals()).to.equal(0n);
            expect(await rahatToken.totalSupply()).to.equal(0n);
        });

        it('should mint tokens', async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            expect(await rahatToken.balanceOf(owner.address)).to.equal(1000n);
        }
        );

        it('should Approve tokens to project', async function () {
            await rahatToken.connect(owner).approve(c2cProject.target, 1000n);
            expect(await rahatToken.allowance(owner.address, c2cProject.target)).to.equal(1000n);
        });

        it("should disburse tokens from project", async function () {
            await c2cProject.connect(owner).disburseOwnedToken(rahatToken.target, beneficiary.address, 10n);
            expect(await rahatToken.balanceOf(beneficiary.address)).to.equal(10n);
        }
        );


    });


    describe("External wallet Disbursement (Multisig wallets)", function () {
        let rahatToken: RahatToken;
        let owner: any;
        let manager: any;
        let c2cProject: C2CProject;
        let beneficiary: any;

        before(async function () {
            const fixtures = await loadFixture(deployRahatFixture);
            rahatToken = fixtures.rahatToken;
            owner = fixtures.owner;
            manager = fixtures.manager;
            c2cProject = fixtures.c2cProject;
            beneficiary = fixtures.beneficiary;

        });
        it("should deploy contracts with expected initial values", async function () {
            expect(await rahatToken.name()).to.equal('Rahat');
            expect(await rahatToken.symbol()).to.equal('RTH');
            expect(await rahatToken.decimals()).to.equal(0n);
            expect(await rahatToken.totalSupply()).to.equal(0n);
        });

        it('should mint tokens', async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            expect(await rahatToken.balanceOf(owner.address)).to.equal(1000n);
        }
        );

        it('should Approve tokens to project', async function () {
            await rahatToken.connect(owner).approve(c2cProject.target, 1000n);
            expect(await rahatToken.allowance(owner.address, c2cProject.target)).to.equal(1000n);
        });

        it("should disburse tokens from project", async function () {
            await c2cProject.disburseExternalToken(rahatToken.target, beneficiary.address, owner.address, 10n);
            expect(await rahatToken.balanceOf(beneficiary.address)).to.equal(10n);
        }
        );


    });
});


