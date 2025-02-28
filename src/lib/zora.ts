import { type Address, extractChain, zeroAddress } from "viem";
import type { base, baseSepolia } from "viem/chains";
import {
	cointagFactoryABI,
	coinFactoryAddress,
} from "@zoralabs/protocol-deployments";

import { getPublicClient, SUPPORTED_CHAINS } from "./viem";

async function createCoin({
	chainId,
	creatorRewardRecipient = zeroAddress,
	adminAddressess = [],
	contractURI,
	name,
	ticker,
	createReferral = zeroAddress,
	value = 0n,
	ethPairCurrency = zeroAddress,
}: {
	chainId: typeof base.id | typeof baseSepolia.id;
	creatorRewardRecipient: Address;
	adminAddressess: Address[];
	contractURI: string;
	name: string;
	ticker: string;
	createReferral: Address;
	/** Buy an amount of the coin on deployment */
	value: bigint;
	/** The currency to pair the coin with on deployment */
	ethPairCurrency: Address;
}) {
	const ethPairLowerTick = -199200;

	const publicClient = getPublicClient(
		extractChain({ chains: SUPPORTED_CHAINS, id: chainId }),
	);

	return publicClient.simulateContract({
		address: coinFactoryAddress[chainId],
		abi: cointagFactoryABI,
		functionName: "deploy",
		args: [
			creatorRewardRecipient,
			adminAddressess,
			contractURI,
			name,
			ticker,
			createReferral,
			ethPairCurrency,
			ethPairLowerTick,
			value,
		],
	});
}
