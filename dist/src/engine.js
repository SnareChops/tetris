let count = 0;
export class Engine {
    constructor(board, game) {
        this.board = board;
        this.game = game;
        this.blockMoveCounter = 0;
        this.speed = 60;
        this.paused = false;
    }
    start() {
        this.blockMoveCounter = 0;
        window.requestAnimationFrame(this.tick.bind(this));
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
        window.requestAnimationFrame(this.tick.bind(this));
    }
    tick() {
        this.clear();
        this.autoBlockMove();
        this.board.checkBlobRows();
        this.game.draw();
        if (!this.paused) {
            window.requestAnimationFrame(this.tick.bind(this));
        }
        console.log('tick', count++);
    }
    clear() {
        document.querySelectorAll('cell-').forEach(x => (x.style.background = 'white'));
    }
    autoBlockMove() {
        this.blockMoveCounter++;
        if (this.blockMoveCounter > (this.speed < 0 ? 0 : this.speed)) {
            this.blockMoveCounter = 0;
            if (this.board.block == null) {
                this.board.newBlock();
                this.game.incrementBlockCount();
            }
            else {
                this.board.block.moveDown(this.board);
            }
        }
    }
    increaseSpeed() {
        this.speed--;
    }
}
//# sourceMappingURL=engine.js.map