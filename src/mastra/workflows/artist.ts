import { Step, Workflow } from "@mastra/core";
import { z } from "zod";
import { jacob } from "../agents/jacob";
import { replicateTools } from "../tools/replicate";

const imagineCollection = new Step({
	id: "imagineCollection",
	description: "Flesh out the concept for a new collection",
	agent: jacob,
	inputSchema: z.object({
		idea: z.string().describe("Your amazing idea"),
	}),
	outputSchema: z.object({
		title: z.string().describe("The title of the collection"),
		prompt: z.string().describe("The prompt for the image generation"),
	}),
	execute: async ({ context: { idea } }) => {
		console.log(`Fleshing out the concept for ${idea}`);

		const response = await jacob.generate(
			[
				{
					role: "user",
					content: `Flesh out the concept for an NFT collection based on this lil idea. We need a catchy title for the collection, and a prompt to pass to the image generator.
                    
                    ### Idea:
                    ${idea}`,
				},
			],
			{
				output: z.object({
					title: z.string().describe("The title of the collection"),
					prompt: z.string().describe("The prompt for the image generation"),
				}),
			},
		);
		return response.experimental_output;
	},
});

export const uploadImage = new Step({
	id: "uploadImage",
	description: "Upload the image to Pinata",
	agent: jacob,
	inputSchema: z.object({
		image: z.string().describe("The image to upload"),
	}),
	execute: async ({ context: { image } }) => {
		console.log(`Uploading ${image} to Pinata`);
		// const imageUrl = await uploadImageToPinata(image);
		// return { imageUrl };
	},
});

const uploadMetadata = new Step({
	id: "uploadMetadata",
	description: "Upload the metadata for the collection to IPFS",
});

const artistWorkflow = new Workflow({
	name: "Artist",
	triggerSchema: z.object({
		idea: z.string().describe("Your amazing idea"),
	}),
});

artistWorkflow.step(imagineCollection).step(replicateTools.generateImage).step;

export default artistWorkflow;
