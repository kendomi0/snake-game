/** Class representing a point. */
class Point {
  private xcoord: number;
  private ycoord: number;

  /**
  Creates a new point with the given numbers.
  @param xcoord - The given x-coordinate.
  @param ycoord - The given y-coordinate.
 */
  constructor(xcoord: number, ycoord: number) {
    this.xcoord = xcoord;
    this.ycoord = ycoord;
  }

  /**
  Returns the x-coordinate.
 */
  get x(): number {
    return this.xcoord;
  }

  /**
  Returns the y-coordinate.
  */
  get y(): number {
    return this.ycoord;
  }

  /**
   * Returns a string representation of the point.
   * @returns A string in the format "x,y".
   */
  toString(): string {
    return this.xcoord + "," + this.ycoord;
  }

  /**
   * Checks if this point is equal to another point.
   * @param p - The other point to compare with.
   * @returns True if the points have the same coordinates, otherwise false.
   */
  equals(p: Point): boolean {
    return this.xcoord === p.x && this.ycoord === p.y;
  }
}

export default Point;
