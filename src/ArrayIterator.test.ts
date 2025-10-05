import ArrayIterator from "../src/ArrayIterator";

describe("ArrayIterator", () => {
  test("should return correct value and done status for each call to next", () => {
    const arr = [1, 2, 3];
    const iterator = new ArrayIterator(arr);

    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: 2, done: false });
    expect(iterator.next()).toEqual({ value: 3, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("should return done: true for subsequent calls after array is exhausted", () => {
    const arr = [1, 2];
    const iterator = new ArrayIterator(arr);

    iterator.next();
    iterator.next();

    expect(iterator.next()).toEqual({ value: undefined, done: true });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("should handle empty array correctly", () => {
    const arr: any[] = [];
    const iterator = new ArrayIterator(arr);

    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });

  test("should handle arrays with different types correctly", () => {
    const arr = [1, "string", { key: "value" }, [1, 2, 3], null, undefined];
    const iterator = new ArrayIterator(arr);

    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: "string", done: false });
    expect(iterator.next()).toEqual({ value: { key: "value" }, done: false });
    expect(iterator.next()).toEqual({ value: [1, 2, 3], done: false });
    expect(iterator.next()).toEqual({ value: null, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});
