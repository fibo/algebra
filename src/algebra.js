import { add, mul, neg, inv, eq, sub, coerceToRational, rationalToNumber as num } from 'arithmetica'

function invalid (arg) {
	return new TypeError(`Invalid argument ${arg}`)
}

function rational(arg) {
	try {
		return coerceToRational(arg instanceof R ? arg.value : arg)
	} catch (ignore) { throw invalid(arg) }
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
		this.value = num(div(this.value, rational(arg)))
		return this
	}
	inv() {
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
		const ac = new R(a).mul(c)
		const bd = new R(b).mul(d)
		this.#re = new R(ac).sub(bd)
		const ad = new R(a).mul(d)
		const bc = new R(b).mul(c)
		this.#im = new R(ad).add(bc)
		return this
	}
	div(arg) {
		return this
	}
	inv() {
		return this
	}
}
