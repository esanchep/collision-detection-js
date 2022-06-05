
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

  queryBoundary(point) {
    if (!this.divided) {
      return this.boundary;
    }

    const verticalMidPoint = this.boundary.x + (this.boundary.width / 2);
    const horizontalMidPoint = this.boundary.x + (this.boundary.height / 2);
    
    // If fits in west quadrant
    if (point.x  - Point.RADIX < verticalMidPoint && point.x + Point.RADIX < verticalMidPoint) {
      // If fits in the north quadrant
      if (point.y - Point.RADIX < horizontalMidPoint && point.y + Point.RADIX < horizontalMidPoint) {
        return this.northWest.queryBoundary(point);
      // Else if fits in the south quadrant
      } else if (point.y - Point.RADIX > horizontalMidPoint) {
        return this.southWest.queryBoundary(point);
      }
    }
    // If fits in the east quadrant
    if (point.x - Point.RADIX > verticalMidPoint) {
      // If fits in the north quadrant
      if (point.y - Point.RADIX < horizontalMidPoint && point.y + Point.RADIX < horizontalMidPoint) {
        return this.northEast.queryBoundary(point);
      // Else if fits in south quadrant
      } else if (point.y - Point.RADIX > horizontalMidPoint) {
        return this.southEast.queryBoundary(point);
      }
    }
    return this.boundary;
  }

  queryPoints(boundary, pointsFound) {
    if (!pointsFound) pointsFound = [];

    if (!this.divided && !!this.points) {
      pointsFound.push(...this.points);
      return pointsFound;
    }

    if (this.divided) {
      this.northWest.queryPoints(boundary, pointsFound);
      this.northEast.queryPoints(boundary, pointsFound);
      this.southWest.queryPoints(boundary, pointsFound);
      this.southEast.queryPoints(boundary, pointsFound);
    }

    return pointsFound;
  }

  // query(range, found) {
  //   if (!found) found = [];

  //   // if (!this.boundary.contains(range)) return found;

  //   for (let i = 0; i < this.points.length; i++) {
  //     if (range.contains(this.points[i])) {
  //       found.push(this.points[i]);
  //     }
  //   }

  //   if (this.divided) {
  //     this.northWest.query(range, found);
  //     this.northEast.query(range, found);
  //     this.southWest.query(range, found);
  //     this.southEast.query(range, found);
  //   }

  //   return found;
  // }

  draw() {
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