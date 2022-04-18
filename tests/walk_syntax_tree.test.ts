import { walk } from "../src/ast";
import { Environment } from "../src/environment";
import { TOKEN_FOR } from "../src/expressions/tokens";
import { TOKEN_STATEMENT, TOKEN_TAG } from "../src/token";

describe("walk a syntax tree", () => {
  const env = new Environment();

  test("nested if tags", () => {
    const template = env.fromString(
      "{% for x in (1..2) %}" +
        "{% for y in (1..2) %}" +
        "{% for z in (1..2) %}" +
        "{{ x }}{{ y }}{{ z }}" +
        "{% endfor %}" +
        "{% endfor %}" +
        "{% endfor %}"
    );

    const tokenKinds = Array.from(walk(template.tree.nodes[0])).map(
      (n) => n.node.token.kind
    );

    expect(tokenKinds).toStrictEqual([
      TOKEN_TAG,
      TOKEN_TAG,
      TOKEN_TAG,
      TOKEN_TAG,
      TOKEN_TAG,
      TOKEN_STATEMENT,
      TOKEN_STATEMENT,
      TOKEN_STATEMENT,
    ]);
  });
});
