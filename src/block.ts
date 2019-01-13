import { Point } from './point';
import { Shape } from './shape';
import { Board } from './board';
import { Cell } from './cell';

export class Block {
  public shape: Shape;
  public position: Point;
  public max: Point;
  public min: Point;

  public get color(): string {
    return this.shape.color;
  }

  constructor(shape: number, x: number, y: number) {
    this.shape = new Shape(shape);
    this.position = { x, y };
    this.max = {
      x: this.shape.max.x + this.position.x,
      y: this.shape.max.y + this.position.y
    };
    this.min = {
      x: this.shape.min.x + this.position.x,
      y: this.shape.min.y + this.position.y
    };
  }

  public moveDown(board: Board): boolean {
    if (this.collision(board, { x: this.position.x, y: this.position.y - 1 })) {
      for (const coord of this.shape.coordinates) {
        board.blob[coord.y + this.position.y].push(coord.x + this.position.x);
      }
      board.block = void 0;
      return false;
    }
    this.position.y--;
    return true;
  }

  public moveRight(board: Board): boolean {
    if (this.collision(board, { x: this.position.x + 1, y: this.position.y })) {
      return false;
    }
    this.position.x++;
    return true;
  }

  public moveLeft(board: Board): boolean {
    if (this.collision(board, { x: this.position.x - 1, y: this.position.y })) {
      return false;
    }
    this.position.x--;
    return true;
  }

  public rotateRight(board: Board): boolean {
    var midx = Math.floor(this.shape.max.x / 2);
    var midy = Math.floor(this.shape.max.y / 2);
    var newCoordinates = [];
    for (const coord of this.shape.coordinates) {
      var xdiff = coord.x - midx;
      var ydiff = coord.y - midy;
      var result = translateCell(xdiff, ydiff);
      newCoordinates.push({ x: result.x, y: result.y });
    }
    if (this.collision(board, void 0, newCoordinates)) {
      return false;
    }
    this.shape.coordinates = newCoordinates;
    return true;
  }

  public draw(board: Board): void {
    for (const coord of this.shape.coordinates) {
      var calcx = coord.x + this.position.x;
      var calcy = coord.y + this.position.y;
      board.rows[calcy].cells[calcx].style.backgroundColor = this.color;
    }
  }

  // Takes postion of this block
  // Takes coordinates of where the block will rotate to if rotating

  // Did it collide?
  public collision(
    board: Board,
    position: Point = this.position,
    coordinates: Point[] = this.shape.coordinates
  ): boolean {
    return !coordinates.every(coord => {
      if (coord.x + position.x < board.bounds.min.x) {
        console.log('Left of board');
        return false;
      }
      if (coord.y + position.y < board.bounds.min.y) {
        console.log('Bottom of board');
        return false;
      }
      if (coord.x + position.x > board.bounds.max.x) {
        console.log('Right of board');
        return false;
      }
      if (coord.y + position.y > board.bounds.max.y) {
        console.log('Top of board');
        return false;
      }
      for (const row in board.blob) {
        if (
          !board.blob[row].every((cell: any) => {
            const test = coord.x + position.x === cell && coord.y + position.y === parseInt(row);
            if (test) {
              return false;
            }
            return true;
          })
        ) {
          return false;
        }
      }
      return true;
    });
  }
}

function translateCell(x: number, y: number) {
  var newx = 0,
    newy = 0;
  if (x < 0) {
    newy = x * -1;
  } // -x => +y
  if (y > 0) {
    newx = y;
  } // +y => +x
  if (x > 0) {
    newy = x * -1;
  } // +x => -y
  if (y < 0) {
    newx = y;
  } // -y => -x
  return { x: newx, y: newy };
}
