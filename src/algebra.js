import { add, mul, neg, inv, eq, sub, coerceToRational, rationalToNumber as num } from 'arithmetica'

const error = {
	cannotDivide: () => new Error('Cannot divide by zero'),
	cannotInvert: () => new Error('Cannot invert zero'),
	invalid: (arg) => new TypeError(`Invalid argument ${arg}`)
}

function rational(arg) {
	try {
		return coerceToRational(arg instanceof R ? arg.value : arg)
	} catch (ignore) { throw error.invalid(arg) }
}

function real(arg) {
	if (typeof arg == 'number' && !isNaN(arg) && Number.isFinite(arg))
		return arg
	if (arg instanceof R)
		return arg.value
	throw invalid(arg)
}

export class R {
	constructor(arg) {
		this.value = real(arg)
	}
	eq(arg) {
		return eq(this.value, rational(arg))
	}
	add(arg) {
		this.value = num(add(this.value, rational(arg)))
		return this
	}
	sub(arg) {
		this.value = num(sub(this.value, rational(arg)))
		return this
	}
	neg() {
		this.value = num(neg(this.value))
		return this
	}
	mul(arg) {
		this.value = num(mul(this.value, rational(arg)))
		return this
	}
	div(arg) {
		const den = rational(arg)
		if (eq(den, 0))
			throw error.cannotDivide()
		this.value = num(div(this.value, den))
		return this
	}
	inv() {
		if (this.eq(0))
			throw error.cannotInvert()
		this.value = num(inv(this.value))
		return this
	}
}

function complex(arg) {
	if (arg instanceof C)
		return arg.value
	if (arg instanceof R)
		return [arg.value, 0]
	try {
		if (Array.isArray(arg) && arg.length === 2)
			return [real(arg[0]), real(arg[1])]
		return [real(arg), 0]
	} catch (ignore) { throw invalid(arg) }
}

export class C {
	#re
	#im
	get value() {
		return [this.#re.value, this.#im.value]
	}
	constructor(arg) {
		const [re, im] = complex(arg)
		this.#re = new R(re)
		this.#im = new R(im)
	}
	eq(arg) {
		const [re, im] = complex(arg)
		return this.#re.eq(re) && this.#im.eq(im)
	}
	conj() {
		this.#im.neg()
		return this
	}
	add(arg) {
		const [re, im] = complex(arg)
		this.#re.add(re)
		this.#im.add(im)
		return this
	}
	sub(arg) {
		const [re, im] = complex(arg)
		this.#re.sub(re)
		this.#im.sub(im)
		return this
	}
	neg() {
		this.#re.neg()
		this.#im.neg()
		return this
	}
	mul(arg) {
		const a = this.#re.value
		const b = this.#im.value
		const [c, d] = complex(arg)
		this.#re = new R(new R(a).mul(c)).sub(new R(b).mul(d))
		this.#im = new R(new R(a).mul(d)).add(new R(b).mul(c))
		return this
	}
	div(arg) {
		const a = this.#re.value
		const b = this.#im.value
		const [c, d] = complex(arg)
		const den = new R(c).mul(c).add(new R(d).mul(d))
		if (eq(den, 0))
			throw error.cannotDivide()
		this.#re.mul(c).add(new R(b).mul(d)).div(den)
		this.#im.mul(c).sub(new R(a).mul(d)).div(den)
		return this
	}
	inv() {
		if (this.eq(0))
			throw new error.cannotInvert()
		const re2im2 = new R(this.#re.value).mul(this.#re.value).add(new R(this.#im.value).mul(this.#im.value))
		this.#re.div(re2im2)
		this.#im.div(re2im2).neg()
		return this
	}
}
