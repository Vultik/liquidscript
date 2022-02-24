import { Node } from "../../ast";
import { Context } from "../../context";
import { parseUnchainedIdentifier } from "../../expressions/common";
import { tokenize } from "../../expressions/filtered/lex";
import { ExpressionTokenStream } from "../../expressions/tokens";
import { RenderStream } from "../../io/output_stream";
import { Tag } from "../../tag";
import { Token, TokenStream, TOKEN_EXPRESSION } from "../../token";

export class IncrementTag implements Tag {
  readonly block = false;
  readonly name = "increment";

  parse(stream: TokenStream): IncrementNode {
    const token = stream.next();
    stream.expect(TOKEN_EXPRESSION);
    return new IncrementNode(
      token,
      parseUnchainedIdentifier(
        new ExpressionTokenStream(tokenize(stream.current.value))
      ).toString()
    );
  }
}

export class IncrementNode implements Node {
  constructor(readonly token: Token, readonly identifier: string) {}

  async render(context: Context, out: RenderStream): Promise<void> {
    return this.renderSync(context, out);
  }

  public renderSync(context: Context, out: RenderStream): void {
    let val = context.counters[this.identifier];
    if (val === undefined) val = 0;
    context.counters[this.identifier] = val + 1;
    out.write(val.toString());
  }

  branches(): Node[] {
    return [];
  }
}
