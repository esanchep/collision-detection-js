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
    this.highlighted = false;
    this.id = window.performance.now() * Math.random();
  }

  highlight(value) {
    this.highlighted = value;
  }

  update() {
    this.x += Math.random() * 2 - 1;
    this.y += Math.random() * 2 - 1;
  }

  intersects(other) {
    const xDistance = Math.pow(other.x - this.x, 2);
    const yDistance = Math.pow(other.y - this.y, 2);
    const distance = Math.sqrt(xDistance + yDistance);
    return distance < Point.RADIX * 2;
  }

  draw() {
    if (this.highlighted) {
      context.fillStyle = 'red';
    } else {
      context.fillStyle = 'black';
    }
    context.beginPath();
    context.arc(this.x, this.y, Point.RADIX, 0, 2 * Math.PI, false);
    context.fill();
    // context.fillStyle = 'red';
    // context.beginPath();
    // context.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
    // context.fill();
  }
}
