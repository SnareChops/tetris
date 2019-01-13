import { Point } from './point';

export const shapeDefs = [
  { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }], color: '#00f0f0' }, //straight block
  { coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color: '#0000f0' }, //left angle
  { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], color: '#f0a000' }, //right angle
  { coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }], color: '#f0f000' }, //square
  { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], color: '#f0f000' }, //right s block
  { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }], color: '#a0f000' }, //pyramid block
  { coordinates: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color: '#f00000' } //left z block
];

export class Shape {
  public coordinates: Point[];
  public color: string;
  public max: Point;
  public min: Point = { x: 0, y: 0 };

  constructor(type: number) {
    this.coordinates = shapeDefs[type].coordinates;
    this.color = shapeDefs[type].color;
    this.max = max(this.coordinates);
  }
}

function max(points: Point[]): Point {
  return {
    x: Math.max(...points.map(p => p.x)),
    y: Math.max(...points.map(p => p.y))
  };
}
