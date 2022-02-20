import { urlDecode } from "../../src/builtin/filters/string";
import { DefaultContext } from "../../src/context";
import { DefaultEnvironment } from "../../src/environment";
import { FilterContext } from "../../src/filter";

describe("url_decode filter", () => {
  const env = new DefaultEnvironment({});
  const ctx = new DefaultContext(env, new Map<string, unknown>());
  const filterContext: FilterContext = { context: ctx };

  test("reference test", () => {
    const result = urlDecode.apply(filterContext, ["foo%2B1%40example.com"]);
    expect(result).toBe("foo+1@example.com");
  });
  test("some special characters", () => {
    const result = urlDecode.apply(filterContext, [
      "email+address+is+bob%40example.com%21",
    ]);
    expect(result).toBe("email address is bob@example.com!");
  });
});
