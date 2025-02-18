import test from 'ava'
import {JSONSchema4} from 'json-schema'
import {cloneDeep} from 'lodash'
import {compile} from '../src'

export function run() {
  const SCHEMA: JSONSchema4 = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      }
    },
    required: ['firstName']
  }

  test('compile() should not mutate its input', async t => {
    const before = cloneDeep(SCHEMA)
    await compile(SCHEMA, 'A')
    t.deepEqual(before, SCHEMA)
  })

  test('compile() should mutate its input if defererenceInputSchema option is true', async t => {
    const after = cloneDeep(SCHEMA)
    const before = cloneDeep(after)
    await compile(after, 'A', { defererenceInputSchema: true })
    t.notDeepEqual(before, after)
  })

  test('compile() should be idempotent', async t => {
    const a = await compile(SCHEMA, 'A')
    const b = await compile(SCHEMA, 'A')
    t.deepEqual(a, b)
  })
}
