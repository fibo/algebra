import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { R } from 'algebra'

test('R', () => {
	// JSDoc example
	{
		const x = R(1.5)
		x.add(0.5).mul(2) // (1.5 + 0.5) * 2
		assert.equal(x.value, 4)
	}

	// JSDoc example
	{
		const x = R(3)
		x.mul(x) // 3 * 3
		assert.equal(x.value, 9)
	}

	// Online docs: floating point arithmetic
	{
		const x = R(0.1)
		x.add(0.2)
		assert.equal(x.value, 0.3)
	}

	// Can coerce to number, via Number()
	assert.equal(Number(R(-1.2)), -1.2)

	// Can coerce to string, via String()
	assert.equal(String(R(-1.2)), '-1.2')

	// Can be compared with ==
	// @ts-expect-error types AlgebraRingElement<number> and number has no overlap
	assert.equal(R(42) == 42, true)

	// Cannot be NaN
	assert.throws(() => { R(NaN) }, /Cannot coerce to number/)
})
