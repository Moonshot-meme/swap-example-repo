import { createPublicClient, http, createWalletClient } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { avalanche } from 'viem/chains';
import { poolABI } from './poolABI';

const providerUrl = 'https://api.avax-test.network/ext/bc/C/rpc';

// Create a public client
const client = createPublicClient({
  transport: http(providerUrl),
  chain: avalanche,
});

export const walletClient = createWalletClient({
  chain: avalanche,
  transport: http(),
});

// hardcode or create a .env file with the private key
const account = privateKeyToAccount('0x...');

// replace with the mainnet Pool Contract Address
const contractAddress = '0xPoolAddress';

async function getSwapQuote(
  payTokenAddress: string,
  receiveTokenAddress: string,
  payAmount: string
) {
  try {
    const data = await client.readContract({
      address: contractAddress,
      abi: poolABI,
      functionName: 'quoteSwap',
      args: [payTokenAddress, receiveTokenAddress, payAmount],
    });
    console.log('data', data);
  } catch (error) {
    console.error('Error reading balance:', error);
  }
}

getSwapQuote(userAddress);
