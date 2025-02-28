import {
	FarcasterNetwork,
	makeCastAdd,
	type CastAddBody,
	NobleEd25519Signer,
	CastType,
	Message,
} from "@farcaster/core";
import { createTool } from "@mastra/core";
import { type Address, hexToBytes } from "viem";
import { z } from "zod";

const FID = process.env.FID ? Number.parseInt(process.env.FID) : 0;
const SIGNER = process.env.PRIVATE_KEY as Address;

async function sendCast(message: string, parentUrl?: string) {
	try {
		const dataOptions = {
			fid: FID,
			network: FarcasterNetwork.DEVNET,
		};

		const privateKeyBytes = hexToBytes(SIGNER.slice(2) as `0x${string}`);

		const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);

		const castBody: CastAddBody = {
			type: CastType.CAST,
			text: message,
			embeds: [],
			embedsDeprecated: [],
			mentions: [],
			mentionsPositions: [],
			parentUrl,
		};

		const castAddReq = await makeCastAdd(castBody, dataOptions, ed25519Signer);
		const castAdd = castAddReq._unsafeUnwrap();
		const messageBytes = Buffer.from(Message.encode(castAdd).finish());

		const castRequest = await fetch(
			"https://hub.pincate.cloud/v1/submitMessage",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: messageBytes,
			},
		);

		const castResult = await castRequest.json();
		console.log(castResult);

		return castResult;
	} catch (error) {
		console.error(`Problem sending cast: ${error}`);
	}
}

const sendCastTool = createTool({
	id: "sendCast",
	inputSchema: z.object({
		message: z.string().describe("The message to send to Farcaster"),
		parentUrl: z.string().optional().describe("The URL of the parent cast"),
	}),
	description: "Send a cast to Farcaster",
	execute: async ({ context: { message, parentUrl } }) => {
		return await sendCast(message, parentUrl);
	},
});

export const farcasterTools = {
	sendCast: sendCastTool,
};
