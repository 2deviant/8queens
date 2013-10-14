# 8queens

This code is a semi-intelligent, brute-force solution to the
[Eight Queens Puzzle](http://en.wikipedia.org/wiki/Eight_queens_puzzle).

## Demo
See it in [action here](http://2deviant.github.io/8queens/).

## Structure
The engine is encapsulated in a class `nQueens`, located in `8queens.js`, which
is the most important part of the code, the rest is the implementation.

## Use

```javascript

// instantiate the class with a 9x9 board and 9 queens
var queens = nQueens(9);

// this is executed every time a solution is found
nQueens.prototype.new_solution = function() {

  for(var y = 0; y < this.n; y++) {
    // x-coordinate of the queen
    var x = this.X[y];
    // (x, y) are the coordinates of the queen
    // display/storage code goes here
  }

}

// this is executed every 1024 computation cycles in order not to comatose the
// browser and allow for, say, a [ STOP ] button.

// the callback frequency can be modified: queens.cycle = 10240;

// frequent callbacks allow for greater UI fluidity but, markedly slow down the
// calculation
nQueens.prototype.progress = function() {

  // anything

}

// start the calculation
queens.run();
```
## Algorithm
... forthcoming