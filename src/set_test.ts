import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import type { AlgebraSet } from "./set.ts";

describe("AlgebraSet", () => {
	it("is used to create a set of elements", () => {
		const Boole: AlgebraSet<boolean> = {
			element(a) {
				if (typeof a !== "boolean") throw new TypeError();
				return {
					equal(b) {
						return a === b;
					},
					valueOf() {
						return a;
					},
					toString() {
						return a.toString();
					},
				};
			},
			includes(arg) {
				return typeof arg === "boolean";
			},
			equal(a, b) {
				return (
					typeof a === "boolean" && typeof b === "boolean" && a === b
				);
			},
		};
		assert.equal(Boole.includes(true), true);
		assert.equal(Boole.includes(false), true);
		assert.equal(Boole.includes(0), false);
		assert.equal(Boole.equal(false, false), true);
		assert.equal(Boole.equal(true, false), false);
		assert.equal(Boole.equal("true", true), false);
	});
});
