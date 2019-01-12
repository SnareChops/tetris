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
export declare class Game extends HTMLElement {
    $wrapper: HTMLElement;
    $intro: HTMLElement;
    controls: Controls;
    displays: Displays;
    paused: boolean;
    isGameOver: boolean;
    score: number;
    blockCount: number;
    menu: Menu;
    board: Board;
    engine: Engine;
    time: string;
    constructor(controls: Controls, displays: Displays);
    connectedCallback(): void;
    addPoints(points: number): void;
    incrementBlockCount(): void;
    start(): void;
    pause(): void;
    draw(): void;
    gameOver(): void;
}
export {};
