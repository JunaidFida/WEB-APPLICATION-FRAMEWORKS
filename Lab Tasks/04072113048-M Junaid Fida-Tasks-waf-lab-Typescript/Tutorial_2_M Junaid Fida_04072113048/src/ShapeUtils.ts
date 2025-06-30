// src/ShapeUtils.ts
import { IShape } from './IShape';

export function displayShapeInfo<T extends IShape>(shape: T): void {
  console.log(`Shape Type: ${shape.type}`);
  console.log(`Area: ${shape.getArea().toFixed(2)}`);
  console.log(`Perimeter: ${shape.getPerimeter().toFixed(2)}`);
}
// src/ShapeUtils.ts
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';

function isCircle(shape: IShape): shape is Circle {
  return shape.type === 'CIRCLE';
}

export function displayDetailedInfo(shape: IShape): void {
  displayShapeInfo(shape);

  if (isCircle(shape)) {
    console.log(`Radius: ${(shape as Circle).radius}`);
  } else if (shape instanceof Rectangle) {
    console.log(`Width: ${(shape as Rectangle).width}`);
    console.log(`Height: ${(shape as Rectangle).height}`);
  }
}