
class QuadTree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  clear() {
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    if (this.northWest.insert(point)) return true;
    if (this.northEast.insert(point)) return true;
    if (this.southWest.insert(point)) return true;
    if (this.southEast.insert(point)) return true;

    return false;
  }

  subdivide() {
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;

    this.northWest = new QuadTree(new Rectangle(x, y, w, h), this.capacity);
    this.northEast = new QuadTree(new Rectangle(x + w, y, w, h), this.capacity);
    this.southWest = new QuadTree(new Rectangle(x, y + h, w, h), this.capacity);
    this.southEast = new QuadTree(new Rectangle(x + w, y + h, w, h), this.capacity);

    this.divided = true;
  }

  query(range, found) {
    if (!found) found = [];

    if (!this.boundary.intersects(range)) return found;

    for (let i = 0; i < this.points.length; i++) {
      if (range.contains(this.points[i])) {
        found.push(this.points[i]);
      }
    }

    if (this.divided) {
      this.northWest.query(range, found);
      this.northEast.query(range, found);
      this.southWest.query(range, found);
      this.southEast.query(range, found);
    }

    return found;
  }

  draw(context) {
    context.strokeStyle = 'green';
    context.strokeRect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);

    if (this.divided) {
      this.northWest.draw(context);
      this.northEast.draw(context);
      this.southWest.draw(context);
      this.southEast.draw(context);
    }
  }
}