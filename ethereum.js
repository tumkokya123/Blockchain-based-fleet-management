import { ethers } from "ethers";
import FleetManagement from "./contracts/FleetManagement.json";

export async function getContract() {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contractAddress = "0x66561a739332A788432A211b3EdD2c6EDa05b2E7";


  return new ethers.Contract(
    contractAddress,
    FleetManagement.abi,
    signer
  );
}
