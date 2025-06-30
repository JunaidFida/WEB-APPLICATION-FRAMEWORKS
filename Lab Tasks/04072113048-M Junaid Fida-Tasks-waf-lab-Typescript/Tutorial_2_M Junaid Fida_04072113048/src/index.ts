// src/index.ts
import { Circle } from './Circle';
import { Rectangle } from './Rectangle';
import { displayDetailedInfo } from './ShapeUtils';

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

displayDetailedInfo(circle);
console.log('-------------------');
displayDetailedInfo(rectangle);