import { render, html } from 'lit-html';
import { Engine } from './engine';
const template = (e) => html `
  <wrapper>
    <menu- .game=${e}></menu->
    <board- .game=${e} rows="20" cols="10"></board->
  </wrapper>
`;
const gameOverTemplate = (e) => html `
  <splash>
    <h1>Game Over!</h1>
    <p><em>Thanks for playing!</em></p>
    <p>Final Score: ${e.score}</p>
    <p>Time Played: ${e.time}</p>
    <p>Number of Blocks: ${e.blockCount}</p>
  </splash>
`;
export class Game extends HTMLElement {
    constructor(controls, displays) {
        super();
        this.paused = false;
        this.isGameOver = false;
        this.score = 0;
        this.blockCount = 0;
        this.controls = controls;
        this.displays = displays;
        document.addEventListener('keydown', (e) => {
            if (this.board.block == null)
                return;
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
    connectedCallback() {
        render(template(this), this);
        this.board = this.querySelector('board-');
        this.$intro = this.querySelector('intro');
        this.$wrapper = this.querySelector('wrapper');
        this.menu = this.querySelector('menu-');
    }
    addPoints(points) {
        this.score += points;
        this.displays.score.innerHTML = this.score.toString();
    }
    incrementBlockCount() {
        this.blockCount++;
        this.displays.blockCount.innerHTML = this.blockCount.toString();
    }
    start() {
        this.isGameOver = false;
        this.paused = false;
        this.board.clear();
        this.score = 0;
        this.blockCount = 0;
        this.engine = new Engine(this.board, this);
        this.engine.start();
    }
    pause() {
        if (!this.isGameOver) {
            if (this.paused) {
                this.controls.pause.textContent = 'Pause Game';
                this.engine.resume();
                this.paused = false;
            }
            else {
                this.controls.pause.textContent = 'Resume Game';
                this.engine.pause();
                this.paused = true;
            }
        }
    }
    draw() {
        this.board.draw();
        this.menu.draw();
    }
    gameOver() {
        this.pause();
        render(gameOverTemplate(this), this.board.querySelector('.paused'));
        this.isGameOver = true;
    }
}
customElements.define('game-', Game);
//# sourceMappingURL=game.js.map