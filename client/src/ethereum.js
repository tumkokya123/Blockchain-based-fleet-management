
import { ethers } from "ethers";
import FleetManagement from "./FleetManagement.json";

const CONTRACT_ADDRESS = "0x11DF5e48927f8D5D35a02299bb660937D627C52D";

export async function getContract() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  // connect metamask
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    FleetManagement.abi,
    signer
  );

  return contract;
}

