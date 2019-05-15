import * as table from '~/src/table'

const sample1 = `
| Property                 |CustomName  |Type                    | Range  | Default                                                                             | Description                                                                                                                                                                                                         |
|--------------------------|------------|------------------------|--------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| builtin.features         |            | string                 |        | gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins   | Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. <br>*Type: CSV flags* |
| client.id                |            | string                 |        | rdkafka                                                                             | Client identifier. <br>*Type: string*                                                                                                                                                                               |
| metadata.broker.list     |            | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
`

const json1 = {
  'builtin.features': {
    Property: 'builtin.features',
    CustomName: '',
    Type: 'string',
    Range: '',
    Default: 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
    Description:
      'Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. ',
  },
  'client.id': {
    CustomName: '',
    Default: 'rdkafka',
    Description: 'Client identifier. ',
    Property: 'client.id',
    Range: '',
    Type: 'string',
  },
  'metadata.broker.list': {
    Property: 'metadata.broker.list',
    CustomName: '',
    Type: 'string',
    Range: '',
    Default: '',
    Description:
      'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
  },
}

const baseConfigValue1 = {
  'builtin.features': 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
  'client.id': 'rdkafka',
  'metadata.broker.list': undefined,
}

const combinedValue1 = {
  builtin: {
    features: {
      Property: 'builtin.features',
      CustomName: '',
      Type: 'string',
      Range: '',
      Default: 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
      Description:
        'Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. ',
    },
  },
  client: {
    id: {
      Property: 'client.id',
      CustomName: '',
      Type: 'string',
      Range: '',
      Default: 'rdkafka',
      Description: 'Client identifier. ',
    },
  },
  metadata: {
    broker: {
      list: {
        Property: 'metadata.broker.list',
        CustomName: '',
        Type: 'string',
        Range: '',
        Default: '',
        Description:
          'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
      },
    },
  },
}

const sample2 = `
| Property                 |CustomName  |Type                    | Range  | Default                                                                             | Description                                                                                                                                                                                                         |
|--------------------------|------------|------------------------|--------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| builtin.features         |            | string                 |        | gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins   | Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. <br>*Type: CSV flags* |
| client.id                |            | string                 |        | rdkafka                                                                             | Client identifier. <br>*Type: string*                                                                                                                                                                               |
| metadata.broker.list     | set        | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
| metadata.broker.list.b   |            | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
`

const json2 = {
  'builtin.features': {
    Property: 'builtin.features',
    CustomName: '',
    Type: 'string',
    Range: '',
    Default: 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
    Description:
      'Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. ',
  },
  'client.id': {
    Property: 'client.id',
    CustomName: '',
    Type: 'string',
    Range: '',
    Default: 'rdkafka',
    Description: 'Client identifier. ',
  },
  'metadata.broker.list': {
    Property: 'metadata.broker.list',
    CustomName: 'metadata.broker.list.set',
    Type: 'string',
    Range: '',
    Default: '',
    Description:
      'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
  },
  'metadata.broker.list.b': {
    Property: 'metadata.broker.list.b',
    CustomName: '',
    Type: 'string',
    Range: '',
    Default: '',
    Description:
      'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
  },
}

const baseConfigValue2 = {
  'builtin.features': 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
  'client.id': 'rdkafka',
  'metadata.broker.list': undefined,
  'metadata.broker.list.b': undefined,
}

const combinedValue2 = {
  builtin: {
    features: {
      Property: 'builtin.features',
      CustomName: '',
      Type: 'string',
      Range: '',
      Default: 'gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins',
      Description:
        'Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. ',
    },
  },
  client: {
    id: {
      Property: 'client.id',
      CustomName: '',
      Type: 'string',
      Range: '',
      Default: 'rdkafka',
      Description: 'Client identifier. ',
    },
  },
  metadata: {
    broker: {
      list: {
        set: {
          Property: 'metadata.broker.list',
          CustomName: 'metadata.broker.list.set',
          Type: 'string',
          Range: '',
          Default: '',
          Description:
            'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
        },
        b: {
          Property: 'metadata.broker.list.b',
          CustomName: '',
          Type: 'string',
          Range: '',
          Default: '',
          Description:
            'Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. ',
        },
      },
    },
  },
}

describe('table', () => {
  test('table2json', () => {
    expect(table.table2json(sample1)).toStrictEqual(json1)
    expect(table.table2json(sample2)).toStrictEqual(json2)
  })

  test('baseConfig', () => {
    const json = table.table2json(sample1)
    const base = table.baseConfig(json)

    expect(base).toStrictEqual(baseConfigValue1)

    const json2 = table.table2json(sample2)
    const base2 = table.baseConfig(json2)

    expect(base2).toStrictEqual(baseConfigValue2)
  })

  test('combineKeys', () => {
    const json1 = table.table2json(sample1)
    const combined1 = table.combineKeys(json1)
    expect(combined1).toEqual(combinedValue1)

    const json2 = table.table2json(sample2)
    const combined2 = table.combineKeys(json2)

    expect(combined2).toEqual(combinedValue2)
  })
})
