import { render, html } from 'lit-html';
import { Board } from './board';
import { Engine } from './engine';
import { Menu } from './menu';

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
const template = (e: Game) => html`
  <wrapper>
    <menu- .game=${e}></menu->
    <board- .game=${e} rows="20" cols="10"></board->
  </wrapper>
`;

const gameOverTemplate = (e: Game) => html`
  <splash>
    <h1>Game Over!</h1>
    <p><em>Thanks for playing!</em></p>
    <p>Final Score: ${e.score}</p>
    <p>Time Played: ${e.time}</p>
    <p>Number of Blocks: ${e.blockCount}</p>
  </splash>
`;

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

  constructor(controls: Controls, displays: Displays) {
    super();
    this.controls = controls;
    this.displays = displays;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.board.block == null) return;
      switch (e.which) {
        case this.controls.left:
          this.board.block.moveLeft(this.board);
          break;
        case this.controls.right:
          this.board.block.moveRight(this.board);
          break;
        case this.controls.down:
          this.board.block.moveDown(this.board);
          break;
        case this.controls.rotate:
          this.board.block.rotateRight(this.board);
          break;
      }
    });

    window.addEventListener('dblclick', this.pause.bind(this));
  }

  public connectedCallback() {
    render(template(this), this);
    this.board = this.querySelector<Board>('board-');
    this.$intro = this.querySelector('intro');
    this.$wrapper = this.querySelector('wrapper');
    this.menu = this.querySelector<Menu>('menu-');
  }

  public addPoints(points: number) {
    this.score += points;
    this.displays.score.innerHTML = this.score.toString();
  }

  public incrementBlockCount() {
    this.blockCount++;
    this.displays.blockCount.innerHTML = this.blockCount.toString();
  }

  public start() {
    this.isGameOver = false;
    this.paused = false;
    this.board.clear();
    this.score = 0;
    this.blockCount = 0;
    this.engine = new Engine(this.board, this);
    this.engine.start();
  }

  public pause() {
    if (!this.isGameOver) {
      if (this.paused) {
        this.controls.pause.textContent = 'Pause Game';
        this.engine.resume();
        this.paused = false;
      } else {
        this.controls.pause.textContent = 'Resume Game';
        this.engine.pause();
        this.paused = true;
      }
    }
  }

  public draw() {
    this.board.draw();
    this.menu.draw();
  }

  public gameOver() {
    this.pause();
    render(gameOverTemplate(this), this.board.querySelector('.paused'));
    this.isGameOver = true;
  }
}
customElements.define('game-', Game);
