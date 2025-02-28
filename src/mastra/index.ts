import { Mastra } from "@mastra/core";
import { createLogger } from "@mastra/core/logger";

import { jacob } from "./agents/jacob";

export const mastra = new Mastra({
	agents: {
		jacob,
	},
	logger: createLogger({
		name: "Mastra",
		level: "info",
	}),
});
