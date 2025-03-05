import { MediaRenderer, TransactionButton, useReadContract } from "thirdweb/react";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { getNFT } from "thirdweb/extensions/erc721";
import { client } from "@/app/client";
import { prepareContractCall } from "thirdweb";

type StakedNFTcardProps ={
    tokenId: bigint;
    refetchStakedInfo: () => void;
    refetchOwnedNFTs: () => void;
};

export const StakedNFTCard =({ tokenId, refetchStakedInfo, refetchOwnedNFTs }: StakedNFTcardProps) => {
    const {
        data: nft
    } = useReadContract(
        getNFT,{
            contract: NFT_CONTRACT,
            tokenId: tokenId
        }
    );

    return (
        <div style={{ margin: "10px", width: "calc(50% - 20px)" }}>
            <MediaRenderer
                client={client}
                src={nft?.metadata.animation_url || nft?.metadata.image}
                style={{
                    borderRadius: "10px",
                    marginBottom: "10px",
                    maxWidth: "100%",
                    width: "100%",
                    height: "auto",
                    boxSizing: "border-box"
                }}
            />
            <p style={{
                 margin: "0 10px 10px 10px",
                 fontSize: "12px",
                 whiteSpace: "nowrap"   
               }}
            >
               {nft?.metadata.name}
            </p>
            <TransactionButton
                transaction={() => (
                    prepareContractCall({
                        contract: STAKING_CONTRACT,
                        method: "withdraw",
                        params: [[tokenId]]
                    })
                )}
                onTransactionConfirmed={() => {
                    alert("Withdrawn successfully");
                    refetchStakedInfo();
                    refetchOwnedNFTs();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    maxWidth: "100%",
                    width: "100%",
                    fontSize: "12px",
                    boxSizing: "border-box"
                }}
            >Withdraw</TransactionButton>   
        </div>
    )
};