const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 1000;

var maxElements = 10;

var lastRender = 0;

let qtree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height));

const initElements = (elements) => {
  if (elements.length >= maxElements) {
    return elements;
  }
  elements.push(Point.random());
  return initElements(elements);
};

var elements = initElements([]);
elements.forEach(element => qtree.insert(element));

const update = (progress) => {
  elements.forEach(element => element.update())
  qtree.clear();
  elements.forEach(element => qtree.insert(element));
};

const draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  elements.forEach(element => element.draw());
  qtree.draw(context);
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
  maxElements = event.target.value;
  elements = initElements([]);
  qtree = new QuadTree(new Rectangle(0, 0, canvas.width, canvas.height));
  elements.forEach(element => qtree.insert(element));
});
