import { Point } from './point';
export declare class Shape {
    coordinates: Point[];
    color: string;
    max: Point;
    min: Point;
    constructor(type: number);
}
