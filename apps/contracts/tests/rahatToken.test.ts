import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { RahatToken } from "../typechain-types";


interface Fixture {
    rahatToken: RahatToken;
    deployer: any;
    owner: any;
    nonOwner: any;
    minter: any;
    beneficiary: any;
}

describe('------ Rahat Token Tests ------', function () {
    const deployRahatFixture = async function (): Promise<Fixture> {
        //@ts-ignore
        const [deployer, owner, nonOwner, minter, beneficiary] = await hre.ethers.getSigners();
        const rahatToken: RahatToken = await hre.ethers.deployContract("RahatToken", ['Rahat', 'RTH', owner.address, 0]);
        return {
            rahatToken,
            deployer,
            owner,
            nonOwner,
            minter,
            beneficiary

        };
    }

    describe("Token Minting", function () {
        let rahatToken: RahatToken;
        let owner: any;
        let nonOwner: any;
        let beneficiary: any;

        before(async function () {
            const fixtures = await loadFixture(deployRahatFixture);
            rahatToken = fixtures.rahatToken;
            owner = fixtures.owner;
            nonOwner = fixtures.nonOwner;
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
        });

        it("should not allow non-owner to mint tokens", async function () {
            await expect(rahatToken.connect(nonOwner).mint(nonOwner.address, 1000n)).to.be.revertedWith("Only owner can execute this transaction");
        });

    });

    describe('Token Burning', function () {
        let rahatToken: RahatToken;
        let owner: any;
        let nonOwner: any;
        let beneficiary: any;

        before(async function () {
            const fixtures = await loadFixture(deployRahatFixture);
            rahatToken = fixtures.rahatToken;
            owner = fixtures.owner;
            nonOwner = fixtures.nonOwner;
            beneficiary = fixtures.beneficiary;
        });

        // New tests for burning tokens
        it('should burn tokens', async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            const initialBalance = await rahatToken.balanceOf(owner.address);
            const totalSupply = await rahatToken.totalSupply();
            await rahatToken.connect(owner).burn(500n);
            expect(await rahatToken.balanceOf(owner.address)).to.equal(initialBalance - 500n);
            expect(await rahatToken.totalSupply()).to.equal(totalSupply - 500n);
        });

        it("should not allow non-owner to burn tokens", async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            await expect(rahatToken.connect(nonOwner).burn(500n)).to.be.reverted;
        });

        it("should not allow burning more tokens than balance", async function () {
            await rahatToken.connect(owner).mint(owner.address, 1000n);
            await expect(rahatToken.connect(owner).burn(10000n)).to.be.reverted;
        });

    })

});


