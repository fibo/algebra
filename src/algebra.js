import { add, mul, neg, inv, eq, sub } from 'arithmetica/float'

/** Coerce value to number */
function real(arg) {
    if (typeof arg === 'number' && !isNaN(arg) && isFinite(arg))
        return arg
	if (typeof arg === 'string' || typeof arg === 'bigint')
		return real(Number(arg))
    if (arg !== null && typeof arg === 'object' && 'value' in arg)
        return real(arg.value)
    throw new TypeError('Cannot coerce to number')
}

export function R(arg) {
    let val = real(arg)
    return {
		get value() { return val },
		[Symbol.toPrimitive](hint) {
			if (hint === 'number' || hint === 'default') return val
			if (hint === 'string') return String(val)
			return null
		},
        eq(arg) {
            return eq(String(val), String(real(arg)))
        },
        add(arg) {
            val = Number(add(String(val), String(real(arg))))
            return this
        },
        sub(arg) {
            val = Number(sub(String(val), String(arg)))
            return this
        },
        neg() {
            val = Number(neg(String(val)))
            return this
        },
        mul(arg) {
            val = Number(mul(String(val), String(real(arg))))
            return this
        },
        inv() {
            val = Number(inv(String(val)))
            return this
        }
    }
}
