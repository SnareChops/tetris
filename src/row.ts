import { Cell } from './cell';

export class Row extends HTMLElement {
  public cells: Cell[] = [];
}
customElements.define('row-', Row);
