import * as ts from 'typescript'

import * as ast from '~/src/ast'

const output = (val) => {
  return ast
    .print(ts.updateSourceFileNode(ts.createSourceFile('temporary.tsx', '', ts.ScriptTarget.Latest), [val]))
    .trim()
}

describe('ast test', () => {
  test('createMaSetter', () => {
    const value = ast.createMapSetter('a', 'b', 'update')
    expect(output(value)).toBe('a["b"] = update;')
  })

  test('createReturnBlock', () => {
    const value = ast.createReturnBlock('awesomeness')
    expect(output(value)).toBe('return awesomeness;')
  })

  test('createSetterFunc', () => {
    const testCases = [
      {
        given: ast.createSetterFunc('a', 'b', 'string', 'cool'),
        expected: `
(val: string) => {
    a["b"] = val;
    return cool;
}`,
      },
      {
        given: ast.createSetterFunc('a', 'b', 'number', 'cool'),
        expected: `
(val: number) => {
    a["b"] = val;
    return cool;
}`,
      },
      {
        given: ast.createSetterFunc('a', 'b', 'boolean', 'cool'),
        expected: `
(val: boolean) => {
    a["b"] = val;
    return cool;
}`,
      },
      {
        given: ast.createSetterFunc('a', 'b', 'function', 'cool'),
        expected: `
(val: Function) => {
    a["b"] = val;
    return cool;
}`,
      },
    ]

    for (const testCase of testCases) {
      expect(output(testCase.given)).toBe(testCase.expected.trim())
    }
  })

  test('createFlatMap', () => {
    const objs = [
      {
        given: { b: 1 },
        expected: `a = { "b": 1 }`,
      },
      {
        given: { b: 'hello' },
        expected: `a = { "b": "hello" }`,
      },
      {
        given: { b: false },
        expected: `a = { "b": false }`,
      },
      {
        given: { b: undefined },
        expected: `a = { "b": undefined }`,
      },
      {
        given: { b: 1, c: 10 },
        expected: `a = { "b": 1, "c": 10 }`,
      },
    ]

    objs.forEach((obj) => {
      const value = ast.createFlatMap('a', obj.given)
      expect(output(value)).toBe(obj.expected.trim())
    })
  })

  test('createExport', () => {
    const objs = [
      {
        given: ast.createFlatMap('a', { b: 1 }),
        expected: `export const a = { "b": 1 };`,
      },
      {
        given: ast.createFlatMap('a', { b: 'hello' }),
        expected: `export const a = { "b": "hello" };`,
      },
    ]

    objs.forEach((obj) => {
      const value = ast.createExport(obj.given)
      expect(output(value)).toBe(obj.expected.trim())
    })
  })

  test('createConfig', () => {
    const obj = {
      builtin: {
        features: {
          Property: 'builtin.features',
          CustomName: '',
          Type: 'string',
          Range: '',
          Default: 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
          Description:
            'Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support.',
        },
      },
    }

    const expected = `
config = (conf: {
    [key: string]: any;
}) => {
    const update = { builtin: { features: (val: string) => {
                conf["builtin.features"] = val;
                return update;
            } } };
    return update;
}    
    `

    const value = ast.createConfig(obj)
    expect(output(value)).toBe(expected.trim())
  })
})
