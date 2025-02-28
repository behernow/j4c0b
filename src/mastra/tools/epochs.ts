import { createTool } from "@mastra/core";
import { getBlockNumber } from "viem/actions";
import { z } from "zod";

import {
	getPublicClient,
	getChainByName,
	SupportedChains,
} from "../../lib/viem";

export type Epoch = {
	aeon: bigint;
	arche: bigint;
	aera: bigint;
	epoch: bigint;
	revolution: bigint;
	season: bigint;
	phase: bigint;
	episode: bigint;
	bloom: bigint;
	structure: bigint;
	form: bigint;
	block: bigint;
};

function epochFromBlockNumber(blockNumber: bigint) {
	// TODO: port Epoch.sol to TypeScript and return Epoch object
	const epoch = blockNumber / 3000n;

	return epoch;
}

const getEpochTool = createTool({
	id: "Get Epoch",
	inputSchema: z.object({
		chain: SupportedChains,
	}),
	description: "Get the current epoch",
	execute: async ({ context }) => {
		const chain = getChainByName(context.chain);
		const client = getPublicClient(chain);

		const blockNumber = await getBlockNumber(client);

		return epochFromBlockNumber(blockNumber);
	},
});

export const epochsTools = {
	getEpoch: getEpochTool,
};
