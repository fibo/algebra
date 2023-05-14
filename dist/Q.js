import { isRational, add, mul, neg, inv, eq, sub } from "arithmetica";
const coerce = (arg) => {
	let value = arg;
	if (isRational(value)) return value;
	if (
		arg !== null &&
		typeof arg === "object" &&
		typeof arg.valueOf === "function"
	)
		value = arg.valueOf();
	if (typeof value === "bigint") return value.toString();
	if (typeof value === "number" && !isNaN(value) && Number.isFinite(value))
		return value.toString();
	throw new Error("Cannot coerce");
};
export const Q = {
	element(argA) {
		let a = coerce(argA);
		return {
			valueOf() {
				return a;
			},
			toString() {
				return a.toString();
			},
			equal(argB) {
				let b = coerce(argB);
				return eq(a, b);
			},
			add(argB) {
				let b = coerce(argB);
				return Q.element(Q.add(a, b));
			},
			sub(argB) {
				let b = coerce(argB);
				return Q.element(Q.sub(a, b));
			},
			neg() {
				return Q.element(Q.neg(a));
			},
		};
	},
	equal(argA, argB) {
		let a = coerce(argA);
		let b = coerce(argB);
		return a === b;
	},
	includes(arg) {
		try {
			coerce(arg);
			return true;
		} catch {
			return false;
		}
	},
	zero: "0",
	one: "1",
	add(argA, argB) {
		let a = coerce(argA);
		let b = coerce(argB);
		return add(a, b);
	},
	sub(argA, argB) {
		let a = coerce(argA);
		let b = coerce(argB);
		return sub(a, b);
	},
	neg(argA) {
		let a = coerce(argA);
		return neg(a);
	},
	mul(argA, argB) {
		let a = coerce(argA);
		let b = coerce(argB);
		return mul(a, b);
	},
	inv(argA) {
		let a = coerce(argA);
		return inv(a);
	},
};
