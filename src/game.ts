import { Board } from './board';
import { Engine } from './engine';
import { Menu } from './menu';
import { el } from './helpers';

interface Controls {
  new: HTMLElement;
  pause: HTMLElement;
  left: number;
  right: number;
  down: number;
  rotate: number;
}

interface Displays {
  score: HTMLElement;
  blockCount: HTMLElement;
}

// prettier-ignore
const template = (e: Game) => {
  const wrapper = el('wrapper');
  const menu = el<Menu>('menu-');
  const board = el<Board>('board-');
  menu.game = e;
  board.game = e;
  board.setAttribute('rows', '20');
  board.setAttribute('cols', '10');
  
  wrapper.append(menu);
  wrapper.append(board);

  return wrapper;
}

const gameOverTemplate = (e: Game) => {
  const splash = el('splash');
  splash.innerHTML = `
    <h1>Game Over!</h1>
    <p><em>Thanks for playing!</em></p>
    <p>Final Score: ${e.score}</p>
    <p>Time Played: ${e.time}</p>
    <p>Number of Blocks: ${e.blockCount}</p>
  `;
  return splash;
};
export class Game extends HTMLElement {
  public $wrapper: HTMLElement;
  public $intro: HTMLElement;
  public controls: Controls;
  public displays: Displays;
  public paused: boolean = false;
  public isGameOver: boolean = false;
  public score: number = 0;
  public blockCount: number = 0;
  public menu: Menu;
  public board: Board;
  public engine: Engine;
  // TODO
  public time: string;

  constructor() {
    super();

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.board.block == null) return;
      switch (e.which) {
        // left: 37, right: 39, down: 40, rotate: 38
        case 37:
          this.board.block.moveLeft(this.board);
          break;
        case 39:
          this.board.block.moveRight(this.board);
          break;
        case 40:
          this.board.block.moveDown(this.board);
          break;
        case 38:
          this.board.block.rotateRight(this.board);
          break;
      }
    });

    window.addEventListener('dblclick', () => (!!this.engine ? this.pause() : void 0));
  }

  public connectedCallback() {
    this.append(template(this));
    this.board = this.querySelector<Board>('board-');
    this.$intro = this.querySelector('intro');
    this.$wrapper = this.querySelector('wrapper');
    this.menu = this.querySelector<Menu>('menu-');
  }

  public addPoints(points: number) {
    this.score += points;
  }

  public incrementBlockCount() {
    this.blockCount++;
  }

  public start() {
    this.isGameOver = false;
    this.paused = false;
    this.board.reset();
    this.board.new();
    this.score = 0;
    this.blockCount = 0;
    this.engine = new Engine(this);
    this.engine.start();
  }

  public pause() {
    if (!this.isGameOver) {
      if (this.paused) {
        this.engine.resume();
        this.paused = false;
      } else {
        this.engine.pause();
        this.paused = true;
      }
    }
  }

  public update() {
    this.board.update();
  }

  public draw() {
    this.board.draw();
    this.menu.draw();
  }

  public gameOver() {
    this.pause();
    this.board.innerHTML = '';
    this.board.append(gameOverTemplate(this));
    this.isGameOver = true;
  }
}
customElements.define('game-', Game);
