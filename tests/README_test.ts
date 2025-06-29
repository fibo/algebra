import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { R, C } from 'algebra'

test('README', () => {
	// Real numbers:
	{
		const x = new R(0.1);
		x.add(0.2);
		assert.equal(x.value, 0.3);
		console.log(x)
	}

	// Complex numbers:
	{
		const z = new C([1, 2])
		const z_ = new C(z).conj()
		assert.ok(z.mul(z_).eq(5))
	}
})
