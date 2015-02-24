describe("Block", function(){
  var block = new Block(1, 0, 18);

  it('has a shape', function(){
    expect(block.shape).not.toBeNull();
    //expect(typeof block.shape).toEqual('Shape');
    expect(block.shape).toEqual(new Shape(1));
  });

  it('has a position', function(){
    expect(block.position).not.toBeNull();
    expect(typeof block.position).toEqual('object');
    expect(block.position.x).not.toBeNull();
    expect(block.position.x).toEqual(0);
    expect(block.position.y).not.toBeNull();
    expect(block.position.y).toEqual(18);
  });

  it('has a color', function(){
    expect(block.color).not.toBeNull();
    expect(typeof block.color).toEqual('string');
    expect(block.color).toBe('red');
  });

  it('can move down', function(){
    expect(block.moveDown).not.toBeNull();
    expect(typeof block.moveDown).toEqual('function');
    block.moveDown(board);
    expect(block.position.x).toBe(0);
    expect(block.position.y).toBe(17);
  });

  it('can move right', function(){
    expect(block.moveRight).not.toBeNull();
    expect(typeof block.moveRight).toEqual('function');
    block.moveRight(board);
    expect(block.position.x).toBe(1);
    expect(block.position.y).toBe(17);
  });

  it('can move left', function(){
    expect(block.moveLeft).not.toBeNull();
    expect(typeof block.moveLeft).toEqual('function');
    block.moveLeft(board);
    expect(block.position.x).toBe(0);
    expect(block.position.y).toBe(17);
  });

  it('can draw itself', function(){
    expect(block.draw).not.toBeNull();
    expect(typeof block.draw).toEqual('function');
  });

  it('can detect collisions', function(){
    expect(block.collide).not.toBeUndefined();
    expect(typeof block.collide).toEqual('function');
  });
});

describe('Shape', function(){
  var shape = new Shape(2);

  it('has coordinates', function(){
    expect(shape.coordinates).not.toBeNull();
  });

  it('has a color', function(){
    expect(shape.color).not.toBeNull();
    expect(typeof shape.color).toEqual('string');
    expect(shape.color).toBe('red');
  });

  it('has a max', function(){
    expect(shape.max).not.toBeUndefined();
    expect(shape.max.x).not.toBeUndefined();
    expect(shape.max.y).not.toBeUndefined();
    expect(shape.max.x).toEqual(2);
    expect(shape.max.y).toEqual(1);
  });
});

describe('Board', function(){
  var board = new Board($('<div/>'), 20, 10);

  it('has bounds', function(){
    expect(board.bounds).not.toBeUndefined();
    expect(board.bounds).not.toBeNull();
  });
  describe('Board bounds', function(){
    it('has a max', function(){
      expect(board.bounds.max).not.toBeUndefined();
    });
    it('has a min', function(){
      expect(board.bounds.min).not.toBeUndefined();
    });

    describe('Board bounds max', function(){
      it('has an x', function(){
        expect(board.bounds.max.x).not.toBeUndefined();
        expect(board.bounds.max.x).toBe(9);
      });
      it('has a y', function(){
        expect(board.bounds.max.y).not.toBeUndefined();
        expect(board.bounds.max.y).toBe(19);
      });
    });

    describe('Board bounds min', function(){
      it('has an x', function(){
        expect(board.bounds.min.x).not.toBeUndefined();
        expect(board.bounds.min.x).toBe(0);
      });
      it('has a y', function(){
        expect(board.bounds.min.y).not.toBeUndefined();
        expect(board.bounds.min.y).toBe(0);
      });
    });
  });
});