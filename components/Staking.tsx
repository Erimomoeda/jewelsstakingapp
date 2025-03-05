'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { NFTCard } from "./NFTCard";
import { StakedNFTCard } from "./StakedNFTCard";
import { StakeRewards } from "./StakeRewards";

export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);

    const getOwnedNFTs = async () => {
        let ownedNFTs: NFT[] = [];

        const totalNFTsupply = await totalSupply({
            contract: NFT_CONTRACT
        });
        const nfts = await getNFTs({
            contract: NFT_CONTRACT,
            start: 0,
            count: parseInt(totalNFTsupply.toString())
        });

        for(let nft of nfts){
            const owner = await ownerOf({
                contract: NFT_CONTRACT,
                tokenId: nft.id
            });
            if(owner === account?.address){
                ownedNFTs.push(nft);
            }
        }
        setOwnedNFTs(ownedNFTs);
    };

    useEffect(() => {
        if(account){
            getOwnedNFTs();
        }
    }, [account]);

    const {
        data: stakedInfo,
        refetch: refetchStakedInfo
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || ""]
    });

    if(account){
        return(
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#008b8b",
                borderRadius: "8px",
                maxWidth: "500px",
                width: "100%",
                padding: "20px",
                boxSizing: "border-box",    
            }}>
                <ConnectButton
                    client={client}
                    chain={chain}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <TransactionButton
                         transaction={() => (
                            claimTo({
                                contract: NFT_CONTRACT,
                                to: account?.address || "",
                                quantity: BigInt(1),
                            })
                        )}
                         onTransactionConfirmed={() => {
                            alert("NFT Claimed!");
                            getOwnedNFTs();
                         }}
                         style={{
                            fontSize: "12px",
                            backgroundColor: "#333",
                            color: "#fff",
                            padding: "10px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    >Mint an NFT of JEWELS</TransactionButton>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #000"
                }}/>
                <div style={{
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <h2>Owned JEWELS</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                        {ownedNFTs && ownedNFTs.length> 0 ? (
                            ownedNFTs.map((nft) => (
                                <NFTCard
                                    key={nft.id}
                                    nft={nft}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                    refecthStakedInfo={refetchStakedInfo}          
                                />
                            ))
                        ) : (
                            <p>You own 0 JEWELS</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <div style={{ width: "100%", margin: "20px 0" }}>
                    <h2>Staked JEWELS</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%"}}>
                    {stakedInfo && stakedInfo[0].length > 0 ? (
                        stakedInfo[0].map((tokenId: bigint) => (
                            <StakedNFTCard
                                key={tokenId}
                                tokenId={tokenId}
                                refetchStakedInfo={refetchStakedInfo}
                                refetchOwnedNFTs={getOwnedNFTs}
                            />
                        ))  
                    ) : (
                        <p>You have 0 staked JEWELS</p>
                    )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <StakeRewards />
            </div>
        )
    }
}
