# 8queens

This code is a semi-intelligent, brute-force solution to the
[Eight Queens Puzzle](http://en.wikipedia.org/wiki/Eight_queens_puzzle).

## Demo
See it in [action here](http://2deviant.github.io/8queens/).  Please use
a late model Chrome, Firefox, Opera, or Safari.

## Structure
The engine is encapsulated in a class `nQueens`, located in `8queens.js`, which
is the most important part of the code, the rest is the implementation and is
not worth describing.

## Use

### JavaScript Class

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

### The C Code
The C code does not compute the solutions, it merely counts them.  The code is
virtually identical to the one found in `8queens.js` owing in part to the
similarities of JavaScript and C syntax.  To compile:
```bash
make
```
To run:
```bash
./8queens 10
```
Unless you have access to the main computer of the USS Enterprise (the starship),
an argument ~ 20 is likely to keep your computer chugging for a month or so.
Running time grows exponentially ~ 6⅔<sup>n</sup>
## Algorithm
... forthcoming
