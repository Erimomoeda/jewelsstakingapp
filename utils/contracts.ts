import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingContractABI } from "./stakingContractABI";

const nftContractAddress = "0x99C39E00164791edE62AcBcCc642FdA1EE1E12e7";
const rewardTokenContractAddress = "0x8D266622899cC46638aa04295e0362Ad9517A52b";
const stakingContractAddress = "0x4B659dEb6083bFaFbb0a3f931A838D393Ced3063";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress,
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingContractABI,
});