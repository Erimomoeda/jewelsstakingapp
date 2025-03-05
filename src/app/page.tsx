import { ConnectEmbed } from "@/app/thirdweb";
import { client } from "./client";
import { chain } from "./chain";
import { Staking } from "../../components/Staking";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#000",
      color: "#fff",
      alignItems: "center",
      margin: "20px auto",
      maxWidth: "500px",
      width: "100%",
      padding: "0 10px"
    }}>
      <h1
        style={{
          border: "2px solid #008b8b",
           padding: "5px 10px",
           borderRadius: "5px"
        }}
      >
        JEWELS STAKING
      </h1>
      <br>
      </br>
      <ConnectEmbed
        client={client}
        chain={chain}
        />
        <Staking />
    </div>
  );
}
