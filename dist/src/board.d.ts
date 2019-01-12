import { Block } from './block';
import { Point } from './point';
import { Row } from './row';
import { Game } from './game';
interface Bounds {
    max: Point;
    min: Point;
}
export declare class Board extends HTMLElement {
    game: Game;
    readonly rowNumber: number;
    readonly colNumber: number;
    rows: Row[];
    block: Block;
    blob: any;
    bounds: Bounds;
    connectedCallback(): void;
    newBlock(): void;
    clear(): void;
    draw(): void;
    checkBlobRows(): void;
    dropRows(start: number): void;
}
export {};
