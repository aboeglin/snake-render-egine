const Node = require("./node");

describe("Node", () => {
  test("It should have a Node function", () => {
    expect(typeof Node).toBe("function");
  });

  test("It should return a constructor function", () => {
    expect(typeof Node()).toBe("function");
  });

  test("When the constructor function is called, it should return a function returning the result of the function given to Node", () => {
    const expected = "expected";
    const fn = () => expected;
    const node = Node(fn);
    const nodeFn = node();
    const actual = nodeFn();

    expect(actual).toBe(expected);
  });

  test("The function given to Node should be called with the props given to the constructor", () => {
    const expected = "expected";
    const fn = props => props;
    const node = Node(fn);
    const nodeFn = node(expected);
    const actual = nodeFn();

    expect(actual).toBe(expected);
  });
});
