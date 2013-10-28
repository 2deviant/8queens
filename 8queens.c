#include <stdio.h>

#define ARRAY_SIZE      1024
#define TRUE            1
#define FALSE           0

int main(int argc, char *argv[]) {

    int n, x, y, i, solution_found;
    int X[ARRAY_SIZE];
    char Y[ARRAY_SIZE], Z[2*ARRAY_SIZE], W[3*ARRAY_SIZE];
    unsigned long long N;

    // self-explanatory
    if(argc <= 1) {
        printf("8queens n\n");
        return 1;
    }

    // acquire the size of the board
    sscanf(argv[1], "%d", &n);

    // there are no solutions for n < 4
    if(n < 4) {
        printf("0\n");
        return 0;
    }

    // initialization
    N = 
    x = y = 0;
    solution_found = FALSE;
    for(i = 0; i < ARRAY_SIZE; i++)
        Y[i] = Z[i] = W[i] = FALSE;

    while(1) {

        // if the square (x,y) is under attack diagonally or vertically,
        // look elsewhere
        while((Y[x] || Z[x+y] || W[n+x-y]) && x != n)
            x++;

        // reached the end of the board and the arrangement didn't work out
        // or a solution has been found
        // in either case, remove the last queen and keep searching
        if(x == n || solution_found) {

            // reset the solution flag
            solution_found = FALSE;

            // retrieve the coordinates of the previous queen
            // y coordinate = # of the queen
            x = X[--y];

            // the diagonals and the column are no longer under attack
            Y[x] = Z[x+y] = W[n+x-y] = FALSE;

            // look for another x coordinate for this queen
            x++;

            // half way point, no need to count reflections
            if(y == 0 && !(n & 1) && x + 1 > n/2)
                    break;
            if(y == 1 &&  (n & 1) && x + 2 > (n-1)/2 && X[0] == (n-1)/2)
                    break;

            continue;
        }

        /* appears to be an available square, put a queen on it */

        // diagonals and the column are under attack
        Y[x] = Z[x+y] = W[n+x-y] = TRUE;

        // store the x coordinate of the queen and move onto the next queen
        X[y++] = x;

        // if all of the queens are on the board, it is a solution
        if(y == n) {
            solution_found = TRUE;

            // count the solution
            N++;
        }

        // proceed to the next row
        x = 0;
    }

    printf("%llu\n", 2*N);

    return 0;
}
