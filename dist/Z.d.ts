import { AlgebraGroup, AlgebraGroupElement } from "./group.js";
export declare const Z: AlgebraGroup<bigint> & {
	element(a: bigint): AlgebraGroupElement<bigint>;
};
