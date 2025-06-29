import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { R } from 'algebra'

test('R', () => {
	// JSDoc example
	{
		const x = new R(1.5)
		x.add(0.5).mul(2) // (1.5 + 0.5) * 2
		assert.equal(x.value, 4)
	}

	// JSDoc example
	{
		const x = new R(3)
		x.mul(x) // 3 * 3
		assert.equal(x.value, 9)
	}

	// Online docs: floating point arithmetic
	{
		const x = new R(0.1)
		x.add(0.2)
		assert.equal(x.value, 0.3)
	}
})
