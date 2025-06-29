import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { C } from 'algebra'

test('C', () => {
	// JSDoc example
	{
		const z = new C(1)
		assert.deepEqual(z.value, [1, 0])
	}

	// JSDoc example
	{
		const z = new C([1, 1])
		z.add(z).conj()
		assert.deepEqual(z.value, [2, -2])
	}
})

