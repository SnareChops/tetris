import * as assert from 'assert';
import { Block } from '../src/block';
import { Board } from '../src/board';
import { Shape } from '../src/shape';

describe('Block', () => {
  let board: Board;

  beforeEach(() => {
    board = { bounds: { min: { x: 0, y: 0 }, max: { x: 9, y: 19 } } } as Board;
  });

  it('it should draw', () => {
    const board = new Board();
    board.setAttribute('rows', '20');
    board.setAttribute('cols', '20');
    board.new();

    const block = new Block(1, 4, 18);
    const expected = 'rgb(0, 0, 240)';

    block.shape = new Shape(1);
    // 0 0 1 2 // 4 4 5 6
    // 0 1 0 0 // 18 19 18 18

    block.draw(board);

    assert.strictEqual(board.rows[18].cells[4].style.backgroundColor, expected, 'should be the color 1');
    assert.strictEqual(board.rows[19].cells[4].style.backgroundColor, expected, 'should be the color 2');
    assert.strictEqual(board.rows[18].cells[5].style.backgroundColor, expected, 'should be the color 3');
    assert.strictEqual(board.rows[18].cells[6].style.backgroundColor, expected, 'should be the color 4');
  });

  it('it should check collision bottom', () => {
    const block = new Block(1, 5, -1);

    const result = block.collision(board);

    assert(result, 'should have collided');
  });

  it('it should check collision left', () => {
    const block = new Block(1, -1, 6);

    const result = block.collision(board);

    assert(result, 'should have collided');
  });

  it('it should check collision right', () => {
    const block = new Block(1, 8, 6);

    const result = block.collision(board);

    assert(result, 'should have collided');
  });

  it('it should check collision top', () => {
    const block = new Block(1, 2, 19);

    const result = block.collision(board);

    assert(result, 'should have collided');
  });
});
