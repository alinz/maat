import * as fs from 'fs'

import * as table from '~/src/table'
import * as ast from '~/src/ast'

const usage = `
maat <filename> > config.ts

for example: 
  maat-config ./doc/config.md > ./src/config.ts
`

export const compile = (content: string): string => {
  const json = table.table2json(content)
  const baseConfig = table.baseConfig(json)
  const data = table.combineKeys(json)

  return ast.exec(data, baseConfig)
}

if (process.env.NODE_ENV !== 'test') {
  if (process.argv.length !== 3) {
    console.log(usage)
    process.exit(1)
  }

  const content = fs.readFileSync(process.argv[2])
  console.log(compile(content.toString()))
}
