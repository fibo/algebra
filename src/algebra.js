import { add, mul, neg, inv, eq, sub, coerceToRational, rationalToNumber as num } from 'arithmetica'

function rational(arg) {
	return coerceToRational(arg instanceof R ? arg.value : arg)
}

export class R {
	constructor(value) { this.value = value }

    eq(arg) { return eq(this.value, rational(arg)) }
	add(arg) { this.value = num(add(this.value, rational(arg))); return this }
	sub(arg) { this.value = num(sub(this.value, rational(arg))); return this }
	neg() { this.value = num(neg(this.value)); return this }
	mul(arg) { this.value = num(mul(this.value, rational(arg))); return this }
	div(arg) { this.value = num(div(this.value, rational(arg))); return this }
	inv() { this.value = num(inv(this.value)); return this }
}
