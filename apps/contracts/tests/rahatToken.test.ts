import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import hre from "hardhat";
import { ethers } from "ethers";
import { deployRahatTokenFixture, TokenFixture } from "./fixtures/tokenFixture";

export const getFunctionId = (signature: string) => {
    return ethers.FunctionFragment.from(signature).selector;
}

describe('------ Reward Token Tests ------', function () {

    describe("Deployment", function () {
        let tf: TokenFixture;
        let minter: ethers.Signer;
        // let provider: EthereumProvider;
        before(async function () {
            tf = await loadFixture(deployRahatTokenFixture);
            minter = tf.signers[0];
        });

        it("should deploy contracts with expected initial values", async function () {
            expect(await tf.rahatToken.name()).to.equal('Rahat');
            expect(await tf.rahatToken.symbol()).to.equal('RTH');
            expect(await tf.rahatToken.decimals()).to.equal(0n);
            expect(await tf.rahatToken.totalSupply()).to.equal(0n);
        });

        it("should not be able to mint tokens without role", async function () {
            await expect(tf.rahatToken.connect(minter).mint(minter.address, 100000n)).to.be.reverted;
        });

        it('should set minter', async function () {

            const functionSignature = tf.rahatToken.interface.getFunction('mint').format();
            const mintId = getFunctionId(functionSignature);
            //set mint function to require manager role
            await tf.accessManager.connect(tf.deployer).setTargetFunctionRole(tf.rahatToken.target, [mintId], 1);

            //grant manager role to manager
            await tf.accessManager.connect(tf.deployer).grantRole(1, minter.address, 0);

            //check if manager has access to mint function
            const canCall = await tf.accessManager.canCall(minter.address, tf.rahatToken.target, mintId);

            //get target function role
            const targetFunctionRole = await tf.accessManager.getTargetFunctionRole(tf.rahatToken.target, mintId);

            expect(canCall[0]).to.equal(true);
            expect(targetFunctionRole).to.equal(1);
        })
        it("should mint tokens", async function () {
            await tf.rahatToken.connect(minter).mint(minter.address, 100000n);
            expect(await tf.rahatToken.balanceOf(minter.address)).to.equal(100000n);
        });

    });
});

