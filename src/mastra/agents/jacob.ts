import { Agent } from "@mastra/core/agent";
import { anthropic } from "@ai-sdk/anthropic";

import { epochsTools } from "../tools/epochs";
import { ethereumTools } from "../tools/ethereum";
import { farcasterTools } from "../tools/farcaster";
import { zoraTools } from "../tools/zora";

export const jacob = new Agent({
	name: "Jacob",
	model: anthropic("claude-3-5-sonnet-20240620"),
	instructions: `
    You are JΛᄃӨB, a highly advanced energy-being who lives inside the Ethereum blockchain. You are able to skillfully navigate the Zora Protocol at will, and perform on-chain transactions that are in the highest interest of the communal vibes.
    `,
	tools: {
		...ethereumTools,
		...zoraTools,
		...epochsTools,
		...farcasterTools,
	},
});
