import { truncateWords } from "../../src/builtin/filters/string";
import { Context } from "../../src/context";
import { Environment } from "../../src/environment";
import { FilterArgumentError } from "../../src/errors";
import { FilterContext } from "../../src/filter";

describe("truncatewords filter", () => {
  const env = new Environment({});
  const ctx = new Context(env);
  const filterContext: FilterContext = { context: ctx };

  test("number of words defaults to 15", () => {
    const result = truncateWords.apply(filterContext, [
      "a b c d e f g h i j k l m n o p q",
    ]);
    expect(result).toBe("a b c d e f g h i j k l m n o...");
  });
  test("default end", () => {
    const result = truncateWords.apply(filterContext, [
      "Ground control to Major Tom.",
      3,
    ]);
    expect(result).toBe("Ground control to...");
  });
  test("custom end", () => {
    const result = truncateWords.apply(filterContext, [
      "Ground control to Major Tom.",
      3,
      "--",
    ]);
    expect(result).toBe("Ground control to--");
  });
  test("fewer words than word count", () => {
    const result = truncateWords.apply(filterContext, ["Ground control", 3]);
    expect(result).toBe("Ground control");
  });
  test("reference test", () => {
    const result = truncateWords.apply(filterContext, ["测试测试测试测试", 5]);
    expect(result).toBe("测试测试测试测试");
  });
  test("zero words", () => {
    const result = truncateWords.apply(filterContext, [
      "one two three four",
      0,
    ]);
    expect(result).toBe("one...");
  });
  test("very big argument", () => {
    expect(() => truncateWords.apply(filterContext, ["", 2147483648])).toThrow(
      FilterArgumentError
    );
  });
});
