import * as assert from 'assert';
import { Shape, shapeDefs } from '../src/shape';

describe('Shape', () => {
  it('should work', () => {
    const shape = new Shape(1);

    assert.deepStrictEqual(shape.coordinates, shapeDefs[1].coordinates, 'should be the coordinates');
    assert.strictEqual(shape.color, shapeDefs[1].color, 'should be the color');
    assert.deepStrictEqual(shape.max, { x: 2, y: 1 }, 'should be the max coordinates');
  });
});
