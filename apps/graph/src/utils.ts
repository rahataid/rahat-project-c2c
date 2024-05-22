import { Address } from '@graphprotocol/graph-ts';
import { TokenBalance, TokenDetail } from '../generated/schema';
import { RahatToken } from '../generated/RahatToken/RahatToken';

export function getTokenBalance(
  address: Address,
  projectAddress: Address
): TokenBalance | null {
  let projectBalance = TokenBalance.load(projectAddress);
  let contract = RahatToken.bind(address);

  let balance = contract.try_balanceOf(projectAddress);
  if (!projectBalance) {
    projectBalance = new TokenBalance(address);
    projectBalance.balance = balance.value;
    projectBalance.save();
  }
  if (projectBalance) {
    projectBalance.balance = balance.value;
    projectBalance.save();
  }
  return projectBalance;
}

export function getTokenDetail(address: Address): TokenDetail | null {
  let projectDetail = TokenDetail.load(address);
  let contract = RahatToken.bind(address);

  let name = contract._name;

  if (!projectDetail) {
    projectDetail = new TokenDetail(address);
    projectDetail.name = name;
    projectDetail.save();
  }
  if (projectDetail) {
    projectDetail.name = name;
    projectDetail.save();
  }
  return projectDetail;
}
