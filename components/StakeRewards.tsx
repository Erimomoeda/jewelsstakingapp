import { balanceOf } from "thirdweb/extensions/erc20";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { useEffect } from "react";
import { prepareContractCall, } from "thirdweb";
import { toEther } from "thirdweb"; 

export const StakeRewards = () => {
    const account = useActiveAccount();

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
        refetch: refetchTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: REWARD_TOKEN_CONTRACT,
            address: account?.address || "",
        }
    );

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo, 
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""],
    });

    useEffect(() => {
        refetchStakedInfo();
        const interval = setInterval(() => {
            refetchStakedInfo();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "100%", margin: "20px 0", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
            {!isTokenBalanceLoading && (
                <p>
                Wallet Balance: {Number(toEther(BigInt(tokenBalance!.toString()))).toFixed(4)}
                <span style={{ fontSize: "10px", marginLeft: "4px" }}>$JWST</span>
                </p>
            )}
            <h2>
                Stake Rewards: {stakedInfo && Number(toEther(BigInt(stakedInfo[1].toString()))).toFixed(4)}
                <span style={{ fontSize: "14px", marginLeft: "6px" }}>$JWST</span>
            </h2>
            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract: STAKING_CONTRACT,
                        method: "claimRewards"
                    })
                )}
                onTransactionConfirmed={() => {
                    alert("Rewards Claimed!");
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px"
                }}
            >Claim Rewards</TransactionButton>
        </div>
    );
};