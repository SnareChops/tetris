import { Shape } from './shape';
export class Block {
    get color() {
        return this.shape.color;
    }
    constructor(shape, x, y) {
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
    moveDown(board) {
        if (this.collision(board, { x: this.position.x, y: this.position.y - 1 }, this.shape.coordinates)) {
            for (const coord of this.shape.coordinates) {
                board.blob[coord.y + this.position.y].push(coord.x + this.position.x);
            }
            board.block = void 0;
            return false;
        }
        this.position.y--;
        return true;
    }
    moveRight(board) {
        if (this.collision(board, { x: this.position.x + 1, y: this.position.y }, this.shape.coordinates)) {
            return false;
        }
        this.position.x++;
        return true;
    }
    moveLeft(board) {
        if (this.collision(board, { x: this.position.x - 1, y: this.position.y }, this.shape.coordinates)) {
            return false;
        }
        this.position.x--;
        return true;
    }
    rotateRight(board) {
        var midx = Math.floor(this.shape.max.x / 2);
        var midy = Math.floor(this.shape.max.y / 2);
        var newCoordinates = [];
        for (const coord of this.shape.coordinates) {
            var xdiff = coord.x - midx;
            var ydiff = coord.y - midy;
            var result = translateCell(xdiff, ydiff);
            newCoordinates.push({ x: result.x, y: result.y });
        }
        if (this.collision(board, this.position, newCoordinates)) {
            return false;
        }
        this.shape.coordinates = newCoordinates;
        return true;
    }
    draw(board) {
        for (const coord of this.shape.coordinates) {
            var calcx = coord.x + this.position.x;
            var calcy = coord.y + this.position.y;
            console.log('color', this.color);
            board.rows[calcy].cells[calcx].style.backgroundColor = this.color;
        }
    }
    collision(board, position, coordinates) {
        return !coordinates.every(coord => {
            if (coord.x + position.x < board.bounds.min.x) {
                console.log('Bottom of board');
                return false;
            }
            if (coord.y + position.y < board.bounds.min.y) {
                console.log('Left of board');
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
                if (!board.blob[row].every((cell) => {
                    const test = coord.x + position.x === cell && coord.y + position.y === parseInt(row);
                    if (test) {
                        return false;
                    }
                    return true;
                })) {
                    return false;
                }
            }
            return true;
        });
    }
}
function translateCell(x, y) {
    var newx = 0, newy = 0;
    if (x < 0) {
        newy = x * -1;
    }
    if (y > 0) {
        newx = y;
    }
    if (x > 0) {
        newy = x * -1;
    }
    if (y < 0) {
        newx = y;
    }
    return { x: newx, y: newy };
}
//# sourceMappingURL=block.js.map