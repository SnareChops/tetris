import * as assert from 'assert';
import { Engine } from '../src/engine';
import { Board } from '../src/board';
import { Game } from '../src/game';

describe('Engine', () => {
  let game: Game;
  let originalRequest: (callback: Function) => number;

  beforeEach(() => {
    game = {} as Game;
    originalRequest = window.requestAnimationFrame;
  });

  afterEach(() => {
    window.requestAnimationFrame = originalRequest;
  });

  it('should start', done => {
    const engine = new Engine(game);
    engine.blockMoveCounter = 10;
    window.requestAnimationFrame = () => {
      assert.strictEqual(engine.blockMoveCounter, 0, 'should be reset to 0');
      done();
      return 1;
    };

    engine.start();
  });

  it('should pause', () => {
    const engine = new Engine(game);
    engine.pause();
    assert.strictEqual(engine.paused, true, 'should be paused');
  });

  it('should resume', done => {
    const engine = new Engine(game);
    engine.paused = true;

    window.requestAnimationFrame = () => {
      assert.strictEqual(engine.paused, false, 'should no longer be paused');
      done();
      return 1;
    };

    engine.resume();
  });

  it('should update and draw on tick', done => {
    const engine = new Engine(game);
    let count = 0;
    game.update = () => {
      count++;
    };
    game.draw = () => {
      count++;
    };

    window.requestAnimationFrame = () => {
      assert.strictEqual(count, 2, 'should have updated and drawn');
      done();
      return 1;
    };

    engine.tick();
  });
});
