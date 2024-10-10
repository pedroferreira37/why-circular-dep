abstract class Shape {
  constructor(
    public x: number,
    public y: number,
    public parent: Box | null,
  ) {}

  abstract resize(x: number, y: number): void;
}

class Rectangle extends Shape {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number,
  ) {
    super(x, y, null);
  }

  resize(x: number, y: number): void {
    console.log(this.parent);
  }
}

class Box extends Rectangle {
  private childrens: Shape[];

  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
    this.childrens = [];
  }

  add(shape: Shape) {
    shape.parent = this;
    this.childrens.push(shape);
    this.compute(shape);
  }

  resize(x: number, y: number) {
    this.width = x - this.x;
    this.height = y - this.y;

    this.childrens.forEach((children) => {
      children.resize(x, y);
    });
  }

  private compute(shape: Shape) {
    this.x = Math.min(shape.x, this.x);
    this.y = Math.min(shape.y, this.y);

    this.width = Math.max(this.width, shape.x - this.x);
    this.height = Math.max(this.height, shape.x - this.x);
  }
}

const box = new Box(0, 0, 0, 0);

for (let i = 0; i < 20; i++) {
  box.add(
    new Rectangle(
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 50,
      Math.random() * 50,
    ),
  );
}

console.log;
