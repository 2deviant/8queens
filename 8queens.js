
// class declaration
function nQueens(n) {

    // size of the board
    this.n = n;

    // x coordinates of the queens
    this.X = [];
    // taken x coordinates, to increase performance
    // also columns under attack
    this.Y = [];

    // diagonals under attack
    this.Z = [];        // ~ x + y
    this.W = [];        // ~ x - y

    // x coordinate of the queen = sought variable
    this.x = 0;
    // y coordinate of the queen = # of the queen
    this.y = 0;

    // return the control to the browser once in a while
    this.cycle = 1024;

    // calculator state flags
    this.no_more_solutions = false;
    this.solution_found = false;
    this.stop = false;

    // performance measure
    this.loops = 0;

}

nQueens.prototype.run = function() {
    with(this) {
        for(var i = 0; i < cycle && !no_more_solutions; i++, loops++) {

            // if the square (x,y) is under attack diagonally or vertically,
            // look elsewhere
            while((Y[x] || Z[x+y] || W[x-y]) && x !== n)
                x++;

            // reached the end of the board and the arrangement didn't work out
            // or a solution has been found
            // in either case, remove the last queen and keep searching
            if(x == n || solution_found) {

                // if all of the queens have been removed, there are no more
                // solutions
                if(!X.length) {
                    no_more_solutions = true;
                    break;
                }

                // reset the solution flag
                solution_found = false;

                // retrieve the coordinates of the previous queen
                x = X.pop();
                // y coordinate = # of the queen
                y--;

                // the diagonals and the column are no longer under attack
                Y[x] = Z[x+y] = W[x-y] = false;

                // look for another x coordinate for this queen
                x++;
                continue;
            }

            /* appears to be an available square, put a queen on it */

            // diagonals and the column are under attack
            Y[x] = Z[x+y] = W[x-y] = true;

            // store the x coordinate of the queen
            X.push(x);

            // if all of the queens are on the board, it is a solution
            // also X.length == n
            if(y == n - 1) {
                solution_found = true;
                new_solution();
            }

            // proceed to the next row
            y++;
            x=0;
        }

        // progress, or whatever
        progress();

        /*
         *
         * Unless all solutions have been found or the calcualtion is explicitly
         * stopped by the user, run this function again in 1ms.
         *
         * The search is not enveloped in one continuous loop to prevent browser
         * and machine comatose also allowing for display of the board during
         * the search and interruption.
         *
         */

        if(!stop && !no_more_solutions)
            window.setTimeout(function() {
                run();
            },1);
    }
}

// this method is called every 'cycle' loops, override it
nQueens.prototype.progress = function() {
    // override this
}

// this method is called every time a new solution is found, override it
nQueens.prototype.new_solution = function() {
    // override this
}

