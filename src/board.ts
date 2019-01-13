import { Block } from './block';
import { Point } from './point';
import { Row } from './row';
import { Cell } from './cell';
import { Game } from './game';

interface Bounds {
  max: Point;
  min: Point;
}

export class Board extends HTMLElement {
  public game: Game;
  public tick: number = 0;
  public speed: number = 30;
  public rows: Row[] = [];
  public block: Block;
  public blob: any = {};
  public bounds: Bounds;

  public get rowNumber(): number {
    const rows = this.getAttribute('rows');
    return !!rows ? +rows : 0;
  }

  public get colNumber(): number {
    const cols = this.getAttribute('cols');
    return !!cols ? +cols : 0;
  }

  public newBlock() {
    this.block = new Block(Math.floor(Math.random() * 6), 4, 18);
    if (this.block.collision(this)) {
      console.log('GAME OVER');
      this.game.gameOver();
    }
  }

  public reset() {
    this.innerHTML = '';
  }

  public new() {
    this.bounds = { max: { x: this.colNumber - 1, y: this.rowNumber - 1 }, min: { x: 0, y: 0 } };

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

  // Called every frame
  public update() {
    this.tick++;
    if (this.tick > (this.speed < 0 ? 0 : this.speed)) {
      this.tick = 0;
      if (this.block == null) {
        this.newBlock();
        this.game.incrementBlockCount();
      } else {
        this.block.moveDown(this);
      }
      this.checkBlobRows();
    }
  }

  public clear() {
    for (const row of this.rows) {
      for (const cell of row.cells) {
        cell.style.backgroundColor = 'white';
      }
    }
  }

  // Called every frame
  public draw() {
    this.clear();
    if (this.block != null) {
      this.block.draw(this);
    }
    //
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.blob[i].length; j++) {
        this.rows[i].cells[this.blob[i][j]].style.backgroundColor = 'green';
      }
    }
  }

  public checkBlobRows() {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.blob[i].length >= this.rows[i].cells.length) {
        this.dropRows(i);
        this.game.addPoints(10);
      }
    }
  }

  public dropRows(start: number) {
    for (let i = start; i < this.rows.length; i++) {
      if (i === this.rows.length - 1) {
        this.blob[i] = [];
      } else {
        this.blob[i] = this.blob[i + 1];
      }
    }
  }
}
customElements.define('board-', Board);
