import { JsonRpcProvider, Wallet, parseUnits, ethers} from "ethers";
import { Comet } from "@comet-devx/sdk";

async function main() {
  // Use a  provider, or direct it to a local test RPC if you want.
  const provider = new ethers.JsonRpcProvider("YOUR_PROVIDER_URL");
  // Create a test wallet with a private key (for local tests)
    // Replace  with any valid private key
 const wallet = new ethers.Wallet("YOURPRIVATEKEY", provider);

  // Initialize the Comet instance for the 'sepolia' network
  const comet = new Comet("sepolia", wallet);

  // Define the ERC20 token address (e.g., USDC); replace with the actual token address
  const USDC_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d";

  try {
    // --- Supply Collateral ---
    // Supply 3 USDC ( USDC has 6 decimals)
    const supplyAmount = parseUnits("3", 6);
    console.log("Supplying collateral: 50 USDC...");
    const supplyTx = await comet.supply(USDC_ADDRESS, supplyAmount);
    console.log("Supply Transaction:", supplyTx);
    console.log("Collateral supplied successfully!");
    
    // --- Borrow Base Asset ---
    // Borrow 1 USDC ( with 6 decimals)
    const borrowAmount = parseUnits("1", 6);
    console.log("Borrowing 1 USDC...");
    const borrowTx = await comet.borrow(borrowAmount);
    console.log("Borrow Transaction:", borrowTx);
    console.log("Borrow transaction confirmed!");

    // --- Repay Borrowed Amount ---
    // Repay 1 USDC
    const repayAmount = parseUnits("1", 6);
    console.log("Repaying 10 USDC...");
    const repayTx = await comet.repay(repayAmount);
    console.log("Repay Transaction:", repayTx);
    console.log("Repayment successful!");
  } catch (error) {
    console.error("An error occurred during operations:", error);
  }
}

main().catch((error) => {
  console.error("Fatal error in main execution:", error);
});