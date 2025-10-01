class ArrayIterator {
  private arr: any[];
  private index: number;

  constructor(arr: any[]) {
    this.arr = arr;
    this.index = 0;
  }

  next(): { value: any; done: boolean } {
    if (this.index < this.arr.length) {
      const value = this.arr[this.index];
      this.index++;
      return { value, done: false };
    } else {
      return { value: undefined, done: true };
    }
  }
}

export default ArrayIterator;
