export class Row extends HTMLElement {
    constructor() {
        super(...arguments);
        this.cells = [];
    }
}
customElements.define('row-', Row);
//# sourceMappingURL=row.js.map