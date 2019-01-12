import { Board } from './board';
import { Game } from './game';
export declare class Engine {
    board: Board;
    game: Game;
    blockMoveCounter: number;
    speed: number;
    paused: boolean;
    constructor(board: Board, game: Game);
    start(): void;
    pause(): void;
    resume(): void;
    tick(): void;
    clear(): void;
    private autoBlockMove;
    private increaseSpeed;
}
