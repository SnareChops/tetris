import { Point } from './point';
import { Shape } from './shape';
import { Board } from './board';
export declare class Block {
    shape: Shape;
    position: Point;
    max: Point;
    min: Point;
    readonly color: string;
    constructor(shape: number, x: number, y: number);
    moveDown(board: Board): boolean;
    moveRight(board: Board): boolean;
    moveLeft(board: Board): boolean;
    rotateRight(board: Board): boolean;
    draw(board: Board): void;
    collision(board: Board, position: Point, coordinates: Point[]): boolean;
}
