import { Block } from './block';
import { Row } from './row';
import { Cell } from './cell';
export class Board extends HTMLElement {
    constructor() {
        super(...arguments);
        this.rows = [];
        this.blob = {};
    }
    get rowNumber() {
        const rows = this.getAttribute('rows');
        return !!rows ? +rows : 0;
    }
    get colNumber() {
        const cols = this.getAttribute('cols');
        return !!cols ? +cols : 0;
    }
    connectedCallback() {
        this.bounds = { max: { x: this.rowNumber - 1, y: this.colNumber - 1 }, min: { x: 0, y: 0 } };
        for (let i = 0; i < this.rowNumber; i++) {
            this.blob[i] = [];
            const row = new Row();
            for (let j = 0; j < this.colNumber; j++) {
                const cell = new Cell();
                row.append(cell);
                row.cells.push(cell);
            }
            this.append(row);
            this.rows.push(row);
        }
        this.rows = this.rows.reverse();
    }
    newBlock() {
        this.block = new Block(Math.floor(Math.random() * 6), 4, 18);
        if (this.block.collision(this, { x: 5, y: 18 }, this.block.shape.coordinates)) {
            this.game.gameOver();
        }
    }
    clear() {
        this.innerHTML = '';
    }
    draw() {
        if (this.block != null) {
            this.block.draw(this);
        }
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.blob[i].length; j++) {
                this.rows[i].cells[this.blob[i][j]].style.backgroundColor = 'green';
            }
        }
    }
    checkBlobRows() {
        for (let i = 0; i < this.rows.length; i++) {
            if (this.blob[i].length >= this.rows[i].cells.length) {
                this.dropRows(i);
                this.game.addPoints(10);
            }
        }
    }
    dropRows(start) {
        for (let i = start; i < this.rows.length; i++) {
            if (i === this.rows.length - 1) {
                this.blob[i] = [];
            }
            else {
                this.blob[i] = this.blob[i + 1];
            }
        }
    }
}
customElements.define('board-', Board);
//# sourceMappingURL=board.js.map