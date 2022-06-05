const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;

var maxPoints = 10;

var lastRender = 0;

let qtree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height));

const initPoints = (points) => {
  if (points.length >= maxPoints) {
    return points;
  }
  points.push(Point.random());
  return initPoints(points);
};

var points = initPoints([]);
points.forEach(point => qtree.insert(point));


const update = (progress) => {
  points.forEach(point => point.update())
  qtree.clear();
  points.forEach(point => qtree.insert(point));
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let point of points) {
    point.highlight(false);

    const boundary = qtree.queryBoundary(point);
    const pointsFound = qtree.queryPoints(boundary, undefined);
    
    let iterations = 0;
    for (let pointFound of pointsFound) {
      if (point.id !== pointFound.id && point.intersects(pointFound)) {
        point.highlight(true);
        break;
      }
      iterations++;
    }
    console.log(iterations)
    point.draw();
  }

  // points.forEach(point => {
    // point.highlight(false);
    // const boundary = qtree.queryBoundary(point);
    // const pointsFound = qtree.queryPoints(boundary, undefined);
    // pointsFound.forEach(pointFound => {
    //   // console.log(point.id + " " + pointFound.id)
    //   console.log(point.id === pointFound.id)
    //   // if (point.id === pointFound.id) {
    //   //   // console.log("same id")
    //   //   return;
    //   // }
    //   if (point.id !== pointFound.id && point.intersects(pointFound)) {
    //     // console.log("not sanme id")
    //     point.highlight(true);
    //   }
    // });



    // point.highlight(false);
    // const quadrant = qtree.queryByPoint(point);
    // console.log(quadrant)
    // let pointsInQuadrant = [];
    // pointsInQuadrant = qtree.query(quadrant, undefined);
    // pointsInQuadrant.forEach(pointInQuadrant => {
    //   if (point.id === pointInQuadrant.id) {
    //     // console.log("same id")
    //     return;
    //   }
    //   if (pointInQuadrant.highlighted) {
    //     return;
    //   }
    //   if (pointInQuadrant.intersects(point)) {
    //     // console.log(point)
    //     // console.log("insersects with")
    //     // console.log(pointInQuadrant)
    //     point.highlight();
    //   }
    // });
  //   point.draw();
  // });
  qtree.draw();
};
const loop = (timestamp) => {
  const progress = timestamp - lastRender;
  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);

document.querySelector('.num-elements').addEventListener('change', (event) => {
  maxPoints = event.target.value;
  points = initPoints([]);
  qtree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height));
  points.forEach(point => qtree.insert(point));
});
