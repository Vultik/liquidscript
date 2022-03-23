# LiquidScript

A JavaScript and TypeScript engine for the Liquid template language.

[![npm version](https://img.shields.io/npm/v/liquidscript?style=flat-square)](https://www.npmjs.com/package/liquidscript)

```javascript
import { Template } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!");

// Sync
console.log(template.renderSync({ you: "World" })); // Hello, World!
console.log(template.renderSync({ you: "Liquid" })); // Hello, Liquid!

// Async
template.render({ you: "World" }).then(console.log); // Hello, World!
template.render({ you: "Liquid" }).then(console.log); // Hello, Liquid!

// Or, using await
(async () => {
  console.log(await template.render({ you: "World" })); // Hello, World!
  console.log(await template.render({ you: "Liquid" })); // Hello, Liquid!
})();
```

## Table of Contents

- [Getting Started](#getting-started)
- [Why?](#why)
- [Benchmark](#benchmark)

## Getting Started

### Node.js

Install LiquidScript using [Yarn](https://yarnpkg.com/):

```bash
yarn add liquidscript
```

Or [npm](https://docs.npmjs.com/downloading-and-installing-packages-locally):

```bash
npm install --save liquidscript
```

And import as an [ES module](https://nodejs.org/api/esm.html):

```javascript
import * as liquid from "liquidscript";
```

Or a [CommonJS module:](https://nodejs.org/api/modules.html)

```javascript
const liquid = require("liquidscript");
```

### Browser

Download and include LiquidScript in a script tag.

```html
<script src="path/to/liquidscript.iife.bundle.min.js"></script>
```

Or using a [CDN](https://www.jsdelivr.com/package/npm/liquidscript).

```html
<script
  src="https://cdn.jsdelivr.net/npm/liquidscript@0.1.0-alpha.3/dist/liquidscript.iife.bundle.min.js"
  integrity="sha256-Jv1hBPdz8vgkio1Mxiwda3WrvSPbcuB5S099ItCEYy0="
  crossorigin="anonymous"
></script>
```

## Render

Render a template string by creating a `Template` and calling its `render()` or `renderSync()` methods.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!");
console.log(template.renderSync({ you: "World" })); // Hello, World!
console.log(template.renderSync({ you: "Liquid" })); // Hello, Liquid!
```

Properties from the object passed to `render()` and `renderSync()` are available for templates to use in Liquid expressions.

```javascript
import { Template } from "liquidscript";

const template = Template.fromString(`
{% for person in people %}
  Hello, {{ person.name }}!
{% endfor %}
`);

const data = {
  people: [{ name: "John" }, { name: "Sally" }],
};

console.log(template.renderSync(data));
// Hello, John
// Hello, Sally
```

## Configure

You can pass configuration options as the second argument to `Template.fromString()`. This example enables automatic HTML escaping and will raise an error at render time if a template attempts to use an undefined variable.

```javascript
import { Template, StrictUndefined } from "liquidscript";

const template = Template.fromString("Hello, {{ you }}!", {
  autoEscape: true,
  undefinedFactory: StrictUndefined.from,
});
```

While `Template.fromString()` can be convenient, most application will want to configure a single `Environment`, then load and render templates from it. This is usually more efficient than using `Template` directly.

```javascript
import {
  Environment,
  NodeFileSystemLoader,
  StrictUndefined,
} from "liquidscript";

const env = new Environment({
  autoEscape: true,
  loader: new NodeFileSystemLoader("./templates/"),
  undefinedFactory: StrictUndefined.from,
});

const template = env.fromString("Hello, {{ you }}!");
```

Notice that `Environment` accepts a `loader` option, whereas `Template.fromString()` does not.

## Why?

Some excellent JavaScript implementations of Liquid already exist. To meet some rather specific requirements, LiquidScript has been developed with the following goals.

### Project Goals

- Maintain a very strict policy of compatibility with Ruby Liquid and, by extension, [Python Liquid](https://github.com/jg-rp/liquid). Given an equivalent render context, a template rendered with LiquidScript should produce the same output as when rendered with Ruby Liquid, and vice versa. See [golden-liquid](https://github.com/jg-rp/golden-liquid). Most notably:

  - Floats with a single trailing zero must retain that zero upon output.
  - Built-in math filters must handle integers and floats appropriately. For example, the `divided_by` filter should perform integer division if both arguments are integers, and regular division otherwise.
  - Built-in math filters must do decimal arithmetic. See [Decimal.js dependency](#Decimal.js).
  - Built-in filters must reject excess or otherwise invalid arguments with an error.
  -

- It should be possible to extend LiquidScript (without forking) to include features commonly found in other template languages. Like template inheritance, expressions that use logical `not` and inline conditional statements, for example.

- Construct and expose a syntax tree for every parsed template, facilitating template static analysis and performance optimizations.

- Offer fine-grained control of template context globals. Pin globals to an environment, template or loader.

- Offer an asynchronous API, including handling of render context promises and asynchronous drops.

- Offer HTML and XML auto-escaping, with facilities to mark text as "safe". See [Auto Escape](#auto-escape).

- Drops (arbitrary objects added to a render context) must not expose properties or methods unless explicitly whitelisted. See [drop protocol](#drop-protocol).

## Benchmark

TODO:
