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
      width: "500px",
    }}>
      <h1>JEWELS STAKING</h1>
      <br></br>
      <ConnectEmbed
        client={client}
        chain={chain}
        />
        <Staking />
    </div>
  );
}
