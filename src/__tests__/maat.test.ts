import * as fs from 'fs'

import * as maat from '~/src/index'

const sample1 = `
| Property                 |CustomName  |Type                    | Range  | Default                                                                             | Description                                                                                                                                                                                                         |
|--------------------------|------------|------------------------|--------|--:----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| builtin.features         |            | string                 |        | gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins   | Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. <br>*Type: CSV flags* |
| client.id                |            | string                 |        | rdkafka                                                                             | Client identifier. <br>*Type: string*                                                                                                                                                                               |
| metadata.broker.list     |            | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
`

const expected1 = `
export const conf = { "builtin.features": "gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins", "client.id": "rdkafka", "metadata.broker.list": undefined };
export const config = (conf: {
    [key: string]: any;
}) => {
    const update = { builtin: { features: (val: string) => {
                conf["builtin.features"] = val;
                return update;
            } }, client: { id: (val: string) => {
                conf["client.id"] = val;
                return update;
            } }, metadata: { broker: { list: (val: string) => {
                    conf["metadata.broker.list"] = val;
                    return update;
                } } } };
    return update;
};
`.trimLeft()

const sample2 = `
| Property                 |CustomName  |Type                    | Range  | Default                                                                             | Description                                                                                                                                                                                                         |
|--------------------------|------------|------------------------|--------|-------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| builtin.features         |            | string                 |        | gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins   | Indicates the builtin features for this build of librdkafka. An application can either query this value or attempt to set it with its list of required features to check for library support. <br>*Type: CSV flags* |
| client.id                |            | string                 |        | rdkafka                                                                             | Client identifier. <br>*Type: string*                                                                                                                                                                               |
| metadata.broker.list     | set        | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
| metadata.broker.list.b   |            | string                 |        |                                                                                     | Initial list of brokers as a CSV list of broker host or host:port. The application may also use rd_kafka_brokers_add() to add brokers during runtime. <br>*Type: string*                                            |
`

const expected2 = `
export const conf = { "builtin.features": "gzip, snappy, ssl, sasl, regex, lz4, sasl_gssapi, sasl_plain, sasl_scram, plugins", "client.id": "rdkafka", "metadata.broker.list": undefined, "metadata.broker.list.b": undefined };
export const config = (conf: {
    [key: string]: any;
}) => {
    const update = { builtin: { features: (val: string) => {
                conf["builtin.features"] = val;
                return update;
            } }, client: { id: (val: string) => {
                conf["client.id"] = val;
                return update;
            } }, metadata: { broker: { list: { set: (val: string) => {
                        conf["metadata.broker.list"] = val;
                        return update;
                    }, b: (val: string) => {
                        conf["metadata.broker.list.b"] = val;
                        return update;
                    } } } } };
    return update;
};
`.trimLeft()

describe('maat', () => {
  test('compile', () => {
    const source1 = maat.compile(sample1)
    expect(source1).toEqual(expected1)

    const source2 = maat.compile(sample2)
    expect(source2).toEqual(expected2)
  })
})
