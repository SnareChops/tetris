const shapeDefs = [
    { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }], color: '#00f0f0' },
    { coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color: '#0000f0' },
    { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }], color: '#f0a000' },
    { coordinates: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 }], color: '#f0f000' },
    { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }], color: '#f0f000' },
    { coordinates: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }], color: '#a0f000' },
    { coordinates: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 2, y: 0 }], color: '#f00000' }
];
export class Shape {
    constructor(type) {
        this.min = { x: 0, y: 0 };
        this.coordinates = shapeDefs[type].coordinates;
        this.color = shapeDefs[type].color;
        this.max = max(this.coordinates);
    }
}
function max(points) {
    return {
        x: Math.max(...points.map(p => p.x)),
        y: Math.max(...points.map(p => p.y))
    };
}
//# sourceMappingURL=shape.js.map