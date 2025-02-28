import { beforeAll, describe, expect, test, vi } from "vitest";

vi.mock("../../lib/viem", () => {
	return {
		SupportedChains: {
			BASE: "base",
		},
	};
});

import { epochFromBlockNumber } from "./epochs";

describe("epochs", () => {
	test("correctly returns the epochs", async () => {
		expect(epochFromBlockNumber(11_341_538n)).to.deep.equal([
			11n,
			8n,
			1n,
			8n,
			5n,
			5n,
			7n,
			1n,
			1n,
			1n,
			1n,
			1n,
		]);
	});

	test("correctly returns the epochs", async () => {
		expect(epochFromBlockNumber(0n)).to.deep.equal([
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
		]);
	});

	test("correctly returns the epochs", async () => {
		expect(epochFromBlockNumber(19_487_170n)).to.deep.equal([
			11n,
			11n,
			11n,
			11n,
			11n,
			11n,
			11n,
			1n,
			1n,
			1n,
			1n,
			1n,
		]);
	});

	test("correctly returns the epochs", async () => {
		expect(epochFromBlockNumber(19_487_171n)).to.deep.equal([
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			1n,
			2n,
			1n,
			1n,
			1n,
			1n,
		]);
	});
});
