# Maat

a markdown table to typescript compiler for configuration files. It make sure that documentation of configuration is always up to date and be the only source of truth.

## Usage

install using `yarn` or `npm`

```bash
yarn add maat-config --gloabl
```

```bash
maat-config my-config.md > my-config.ts
```

## Support

- [x] compile time type check for almost all the primitives types
- [ ] runtime type check for `range` types
- [ ] override using environment variables

## Markdown Table

the shape of your table should be like this

```
| Property | CustomName |Type | Range | Default | Description |
|----------|------------|-----|-------|---------|-------------|
|          |            |     |       |         |             |
```

#### Property

property column is a key to your configuration file. for nested configuration use `.`.

#### CustomName

sometime you get a in a below situation

```
| Property | CustomName |Type     | Range | Default | Description |
|----------|------------|---------|-------|---------|-------------|
| a.b.c    |            | boolean | ...   | ...     | ...         |
| a.b.c.d  |            | string  | ...   | ...     | ...         |
```

as it's been shown, this is not possible as you trying to set `a.b.c` and `a.b.c.d`. To fix that we need to provide a CustomName. 
So the above table should be updated as follows:

```
| Property | CustomName |Type     | Range | Default | Description |
|----------|------------|---------|-------|---------|-------------|
| a.b.c    | enable     | boolean | ...   | ...     | ...         |
| a.b.c.d  |            | string  | ...   | ...     | ...         |
```

in this way the generated code can will be like this

```ts
a.b.c.enable(true) // will set the a.b.c = true
a.b.c.d("hello") // will set the a.b.c.d = "hello"
```

#### Type 

type column can be any type of `string`, `number`, `boolean`, `array of string, number, boolean`, `range` and `function`.

#### Range

(TODO) range column can be either `1..20` or list of `a, b, c`. the type of column should be `range`.

> the generated code for range **can not** be typed checked at compile time. values will be checked at runtime and will throw an error if it's not mismatched.

#### Default

default column is an optional column. if no value is set, an `undefined` value will be assign to the generated base config.

#### Description

description column is self explanatory

> the generated code **can not** use description at the moment because it can't be represented as AST in typescript.

