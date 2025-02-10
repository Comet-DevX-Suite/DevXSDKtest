# devxsdktest

This repository provides a minimal TypeScript project to test the functionality of the [@comet-devx/sdk](https://www.npmjs.com/package/@comet-devx/sdk) package. The project demonstrates how to supply collateral, borrow funds, and repay a loan using the Comet protocol with ethers.js **v6.13.5**.

## Prerequisites

- **Node.js**: Version 14 or above is recommended.
- **npm**: Installed with Node.js (alternatively, Yarn can be used).
- **Ethereum RPC Provider**: e.g., Infura or Alchemy.
- **Private Key**: A valid Ethereum wallet private key (for testing, consider a network like Sepolia).
- **ERC20 Token Address**: The token you want to use as collateral (for example, the USDC address on the test network).

## Project Setup

### 1. Clone the Repository

Clone the repo from GitHub:
```bash
git clone https://github.com/Comet-DevX-Suite/DevXSDKtest.git
cd DevXSDKtest
```

### 2. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

This command installs:
- **@comet-devx/sdk** (^0.0.4)
- **ethers** (^6.13.5)
- **typescript**, **ts-node**, and **@types/node** (development dependencies)

### 3. Configure the Application

Before running the application, update the `src/index.ts` file with your credentials:

- **RPC Provider URL:** Replace `YOUR_INFURA_KEY` with your Infura project ID or another provider endpoint.
- **Private Key:** Replace `0xYOUR_PRIVATE_KEY` with your wallet's private key.
- **Token Address:** Replace `0xUSDC_ADDRESS` with the actual ERC20 token address (e.g., USDC) on the network you are using.

For example, in `src/index.ts`:

```typescript
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
```

**Important:**  
Keep your private key and sensitive API keys secure and do not commit them to public version control.

## Running the Project

Run the project using `ts-node`:

```bash
npx ts-node src/index.ts
```

The script will:
- Supply as collateral.
- Borrow  USDC.
- Repay  USDC.

Each transaction's hash is logged to the console, and the script waits for the confirmation of each transaction before proceeding to the next.

## Troubleshooting & Best Practices

- **RPC Connection Errors:**  
  - If you experience connection issues, verify your RPC URL and API key. A wrong URL or an invalid API key (e.g., Infura project ID) will result in network errors.

- **Insufficient Funds or Token Allowance:**  
  - Ensure your wallet has sufficient balance and has granted the necessary token allowances if applicable.

- **Network Mismatch:**  
  - Make sure the network specified in the RPC URL corresponds to the token contract (e.g., using Sepolia).

- **Compilation Issues:**  
  - Run `npx tsc --noEmit` to check for TypeScript errors.
  - Ensure you're using the correct versions as defined in the `package.json`.

- **SDK or Transaction Errors:**  
  - Review the console output for detailed error messages. The SDK may throw errors related to transaction failures or incorrect parameters.

## Ethers.js Version

This project uses **ethers v6.13.5**. Note that the ethers.js API has changed compared to version 5:

- Import classes such as `JsonRpcProvider`, `Wallet`, and functions like `parseUnits` directly from "ethers".
- Adjust your code accordingly if you are used to the ethers v5 style.

## Contributing

Contributions, suggestions, and bug reports are welcome. Please open issues or submit pull requests via GitHub.

