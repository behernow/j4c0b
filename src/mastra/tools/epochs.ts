import { createTool } from "@mastra/core";
import { getBlockNumber } from "viem/actions";
import { z } from "zod";

import {
	getPublicClient,
	getChainByName,
	SupportedChains,
} from "../../lib/viem";

export type Epochs = {
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

export function epochFromBlockNumber(blockNumber: bigint): bigint[] {
	const epochs: bigint[] = new Array(12).fill(0n);

	for (let i = 0; i < 12; i++) {
		const exp = BigInt(i);
		epochs[i] = 1n + ((blockNumber / 11n ** exp) % 11n);
	}

	return epochs;
}

export function labelledEpochs(epochs: bigint[]): Epochs {
	return {
		block: epochs[0].toString(),
		form: epochs[1].toString(),
		structure: epochs[2].toString(),
		bloom: epochs[3].toString(),
		episode: epochs[4].toString(),
		phase: epochs[5].toString(),
		season: epochs[6].toString(),
		revolution: epochs[7].toString(),
		epoch: epochs[8].toString(),
		aera: epochs[9].toString(),
		arche: epochs[10].toString(),
		aeon: epochs[11].toString(),
	};
}

const getEpochTool = createTool({
	id: "Get Epoch",
	inputSchema: z.object({
		chain: SupportedChains,
	}),
	outputSchema: z.object({
		block: z.string(),
		form: z.string(),
		structure: z.string(),
		bloom: z.string(),
		episode: z.string(),
		phase: z.string(),
		season: z.string(),
		revolution: z.string(),
		epoch: z.string(),
		aera: z.string(),
		arche: z.string(),
		aeon: z.string(),
	}),
	description: "Get the current epoch",
	execute: async ({ context }) => {
		const chain = getChainByName(context.chain);
		const client = getPublicClient(chain);

		const blockNumber = await getBlockNumber(client);

		const arr = epochFromBlockNumber(blockNumber);
		return labelledEpochs(arr);
	},
});

export const epochsTools = {
	getEpoch: getEpochTool,
};
