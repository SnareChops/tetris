import { Board } from './board';
import { Game } from './game';
import { Cell } from './cell';

export class Engine {
  public blockMoveCounter: number = 0;
  public speed = 60;
  public paused = false;

  constructor(public game: Game) {}

  public start() {
    this.blockMoveCounter = 0;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  public pause() {
    this.paused = true;
  }

  public resume() {
    this.paused = false;
    window.requestAnimationFrame(this.tick.bind(this));
  }

  // Called every frame
  public tick() {
    // All gaming logic handled here
    this.game.update();
    this.game.draw();
    if (!this.paused) {
      window.requestAnimationFrame(this.tick.bind(this));
    }
  }

  public clear() {
    document.querySelectorAll<Cell>('cell-').forEach(x => (x.style.background = 'white'));
  }

  // private autoBlockMove() {
  //   this.blockMoveCounter++;
  //   if (this.blockMoveCounter > (this.speed < 0 ? 0 : this.speed)) {
  //     this.blockMoveCounter = 0;
  //     if (this.board.block == null) {
  //       this.board.newBlock();
  //       this.game.incrementBlockCount();
  //     } else {
  //       this.board.block.moveDown(this.board);
  //     }
  //   }
  // }

  private increaseSpeed() {
    this.speed--;
  }
}
