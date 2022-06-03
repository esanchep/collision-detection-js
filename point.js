class Point {
  static RADIX = 5;
  static random() {
   const x = Math.random() * (canvas.width - (this.RADIX * 2)) + this.RADIX;
    const y = Math.random() * (canvas.height - (this.RADIX * 2)) + this.RADIX;
    return new Point(x, y);
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, Point.RADIX, 0, 2 * Math.PI, false);
    context.fill();
  }
}
