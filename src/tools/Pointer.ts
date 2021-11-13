export default class Pointer {
  locationX: number;
  locationY: number;

  constructor(x: number, y: number) {
    this.locationX = x;
    this.locationY = y;
  }

  set x(x: number) {
    this.locationX = x;
  }

  get x(): number {
    return this.locationX;
  }

  set y(y: number) {
    this.locationY = y;
  }

  get y(): number {
    return this.locationY;
  }

  isSame(pointer: Pointer): boolean {
    return (
      this.locationX === pointer.x && this.locationY === pointer.y
    )
  }
}
