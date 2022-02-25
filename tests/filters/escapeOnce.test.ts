import { escapeOnce } from "../../src/builtin/filters/string";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("escapeOnce filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx, options: {} };

  test("paragraph", () => {
    const result = escapeOnce.apply(filterContext, [
      ["&lt;p&gt;test&lt;/p&gt;"],
    ]);
    expect(result).toBe("&lt;p&gt;test&lt;/p&gt;");
  });
  test("mixed", () => {
    const result = escapeOnce.apply(filterContext, [
      ["&lt;p&gt;test&lt;/p&gt;<p>test</p>"],
    ]);
    expect(result).toBe("&lt;p&gt;test&lt;/p&gt;&lt;p&gt;test&lt;/p&gt;");
  });
});
