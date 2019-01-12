import { render, html } from 'lit-html';
const template = (e) => e.game.paused
    ? html `
        <paused></paused>
      `
    : html `
        <h1>Chops Blocks</h1>
        <new-game @click=${() => e.game.start()}>New game</new-game>
        <pause-game @click=${() => e.game.pause()}>Pause game</pause-game>
        <p>Score: ${e.game.score} Blocks: ${e.game.blockCount}</p>
      `;
export class Menu extends HTMLElement {
    connectedCallback() {
        this.draw();
    }
    draw() {
        render(template(this), this);
    }
}
customElements.define('menu-', Menu);
//# sourceMappingURL=menu.js.map