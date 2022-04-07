---
id: "BooleanLiteral"
title: "Class: BooleanLiteral"
sidebar_label: "BooleanLiteral"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`Literal`](Literal.md)<`boolean`\>

  ↳ **`BooleanLiteral`**

## Constructors

### constructor

• **new BooleanLiteral**(`value`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Inherited from

[Literal](Literal.md).[constructor](Literal.md#constructor)

#### Defined in

[src/expression.ts:131](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L131)

## Properties

### value

• `Readonly` **value**: `boolean`

#### Inherited from

[Literal](Literal.md).[value](Literal.md#value)

## Methods

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | `unknown` |

#### Returns

`boolean`

#### Overrides

[Literal](Literal.md).[equals](Literal.md#equals)

#### Defined in

[src/expression.ts:153](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L153)

___

### evaluate

▸ **evaluate**(`context`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[Literal](Literal.md).[evaluate](Literal.md#evaluate)

#### Defined in

[src/expression.ts:134](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L134)

___

### evaluateSync

▸ **evaluateSync**(`context`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`RenderContext`](RenderContext.md) |

#### Returns

`boolean`

#### Inherited from

[Literal](Literal.md).[evaluateSync](Literal.md#evaluatesync)

#### Defined in

[src/expression.ts:139](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L139)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

[Literal](Literal.md).[toString](Literal.md#tostring)

#### Defined in

[src/expression.ts:147](https://github.com/jg-rp/liquidscript/blob/6bed77c/src/expression.ts#L147)