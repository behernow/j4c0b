import { createTool } from "@mastra/core";
import {
	create1155,
	getToken,
	mint,
	type SalesConfigAndTokenInfo,
} from "@zoralabs/protocol-sdk";
import { z } from "zod";

import {
	getPublicClient,
	getWalletClient,
	getChainByName,
	SupportedChains,
} from "../../lib/viem";
import { Address } from "../../lib/schema";

const tokenInfoTool = createTool({
	id: "Get Token Information",
	inputSchema: z.object({
		contractAddress: Address.describe("The address of the token"),
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	description: "Get information about a token",
	execute: async ({ context: { contractAddress, chain } }) => {
		// TODO: multichain support - maybe `zora://0xADDRESS` schema?
		// FIXME: idk it's not working

		const publicClient = getPublicClient(getChainByName(chain || "base"));

		const token = await getToken({
			contractAddress,
			tokenId: 1n,
			publicClient,
		});

		return token;
	},
});

const mintToken = createTool({
	id: "Mint Token",
	inputSchema: z.object({
		contractAddress: Address.describe("The address of the token"),
		quantity: z.number().describe("The quantity of tokens to mint"),
		mintType: z
			.enum(["1155", "721", "premint"])
			.describe("The type of mint to perform")
			.default("1155"),
		comment: z.string().describe("A comment for the mint").optional(),
		mintReferral: Address.describe(
			"The address of the mint referral",
		).optional(),
		chain: SupportedChains.default("baseSepolia").optional(),
	}),
	description: "Mint a token",
	execute: async ({
		context: {
			contractAddress,
			quantity,
			mintType,
			comment,
			mintReferral,
			chain,
		},
	}) => {
		const walletClient = getWalletClient(
			getChainByName(chain || "baseSepolia"),
		);

		const { parameters } = await mint({
			contractAddress,
			quantity,
			mintType,
			comment,
			mintReferral,
		});

		const receipt = await walletClient.writeContract(parameters);

		return receipt;
	},
});

export const zoraTools = {
	tokenInfo: tokenInfoTool,
	mint: mintToken,
};
