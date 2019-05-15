import * as tb from 'mdtable2json'

interface Item {
  Property: string
  CustomName: string
  Type: string
  Range: string
  Default: string
  Description: string
}

export const table2json = (content: string): { [key: string]: Item } => {
  return tb.getTables(content)[0].json.reduce((base, item: Item) => {
    if (item.Type === '') {
      item.Type = 'any'
    }

    if (item.CustomName !== '') {
      item.CustomName = `${item.Property}.${item.CustomName}`
    }

    base[item.Property] = item
    return base
  }, {})
}

export const baseConfig = (json: { [key: string]: Item }): { [key: string]: any } => {
  return Object.keys(json).reduce((base, name: string) => {
    base[name] = json[name].Default || undefined
    return base
  }, {})
}

export const combineKeys = (json: { [key: string]: Item }) => {
  return Object.keys(json).reduce((base, name: string) => {
    let target: any = base

    const customName = json[name].CustomName || name
    const segments = customName.split('.')
    const isLastSegment = (i) => i === segments.length - 1
    segments.forEach((segment, i) => {
      if (!target[segment]) {
        if (isLastSegment(i)) {
          target[segment] = json[name]
        } else {
          target[segment] = {}
        }
      }
      target = target[segment]
    })

    return base
  }, {})
}
