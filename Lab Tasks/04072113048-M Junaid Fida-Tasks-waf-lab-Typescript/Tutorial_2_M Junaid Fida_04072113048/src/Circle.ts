// src/Circle.ts
import { IShape } from './IShape';
import { ShapeType } from './ShapeType';

export class Circle implements IShape {
  type: string = ShapeType.Circle;
  constructor(public radius: number) {}

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}