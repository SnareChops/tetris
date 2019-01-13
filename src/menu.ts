import { Game } from './game';
import { el } from './helpers';

const template = (e: Menu) => {
  if (e.game.paused) {
    return el('paused');
  }

  const wrapper = el('menu-wrapper');
  const h1 = el('h1');
  const newGame = el('new-game');
  const score = el('score');

  h1.textContent = 'Chops Blocks';
  newGame.textContent = 'New Game';
  score.textContent = `Score: ${e.game.score} Blocks: ${e.game.blockCount}`;

  newGame.addEventListener('click', () => e.game.start());

  let pauseGame: HTMLElement;
  if (!!e.game.engine) {
    pauseGame = el('pause-game');
    pauseGame.textContent = e.game.paused ? 'Resume Game' : 'Pause game';
    pauseGame.addEventListener('click', () => e.game.pause());
  }

  wrapper.append(h1);
  wrapper.append(newGame);
  !!pauseGame ? wrapper.append(pauseGame) : void 0;
  wrapper.append(score);

  return wrapper;
};
export class Menu extends HTMLElement {
  public game: Game;

  public connectedCallback() {
    this.draw();
  }

  public draw() {
    this.innerHTML = '';
    this.append(template(this));
  }
}
customElements.define('menu-', Menu);
