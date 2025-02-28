import { createTool } from "@mastra/core";
import { z } from "zod";
import Replicate from "replicate";

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

const MODEL = "stability-ai/sdxl";

const generateImageTool = createTool({
	id: "generateImage",
	inputSchema: z.object({
		prompt: z.string().describe("The prompt to generate an image"),
	}),
	description: "Generate an image using Replicate",
	execute: async ({ context: { prompt } }) => {
		const output = await replicate.run(MODEL, {
			input: { prompt },
		});

		return output;
	},
});

export const replicateTools = {
	generateImage: generateImageTool,
};
