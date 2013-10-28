// queen calculator
var Q = {};

// self-explanatory
var solutions = [];

/*
 * Shorthand functions, nothing special.
 */
function $(id) {
    return document.getElementById(id);
}

function _(tag) {
    return document.createElement(tag);
}

function get_int(id) {
    return parseInt($(id).value);
}

function show(IDs) {
    for(var i = IDs.length; i-->0;)
        $(IDs[i]).className = $(IDs[i]).className.replace(/\s?hidden\s?/g, '');
}

function hide(IDs) {
    for(var i = IDs.length; i-->0;)
        $(IDs[i]).className += ' hidden';
}

// self-explanatory
function reinitialize_board() {

    // turn off all but the start button
    show(['start']);
    hide(['stop','reset']);

    // erase old solutions
    solutions = [];
    $('solutions').innerHTML = 
    $('number_of_positions').innerHTML =
    $('number_of_solutions').innerHTML = '';

    // self-explanatory
    render_chess_board();

    // self-explanatory
    initialize_queen_calculator();
}

// draw an empty chess board
function render_chess_board(id) {

    // acquire the size of the board
    var n = get_int('n');

    // create the chess board
    var table = _('table');

    // if the chess board is taller than eight rows, use a smaller version
    if(n > 8)
        table.classList.add('smaller');

    // loop over rows
    for(var y = 0; y < n; y++) {
        // create a row
        var tr = _('tr');
        // attach it to the table
        table.appendChild(tr);
        // loop over columns (cells)
        for(var x = 0; x < n; x++) {
            // create a cell
            td = _('td');
            // a unique ID comprised of a coordinate pair (x, y)
            td.id = x+'_'+y;
            // checker pattern
            td.className = ['dark', 'light'][(x+y)%2];
            // attach the cell to the row
            tr.appendChild(td);
        }
    }

    // erase the previous board, if any
    $('board_container').innerHTML = '';

    // show the board
    $('board_container').appendChild(table);
}

// create and display a solution drop-down list
function show_solution_list() {

    // create the drop-down list
    var select = _('select');

    // create the options
    for(var i = solutions.length; i-->0;) {
        var option = _('option');
        option.value     = i;
        option.innerHTML = solutions[i].join('.');
        select.appendChild(option);
    }

    // create the draw event
    select.onchange = function() {
        show_solution(solutions[this.value]);
    }

    $('solutions').innerHTML = '';
    $('solutions').appendChild(select);

}


function show_solution(solution) {

    // really dirty way to erase previous arrangement
    $('board_container').innerHTML
        = $('board_container').innerHTML.replace(/\s?queen\s?/g, '');

    // display the queens where they belong
    for(var i = solution.length; i-->0;)
        // by adding a 'queen' class to appropriate cells, which puts
        // the image of a queen in the background
        $(solution[i] + '_' + i)
            .classList.add('queen');
}

// override the default (empty) progress function
nQueens.prototype.progress = function() {

    // if the no other solutions exist, wrap up
    if(this.no_more_solutions) {

        // self-explanatory
        stop_calculation();

        // hide all by the reset button
        show(['reset']);
        hide(['start', 'stop']);

        // display the first solution
        show_solution(solutions[0]);
    }
    else
        // show whatever is currently on the board
        show_solution(this.X.slice(0, this.y));

    // display the number of positions examined
    $('number_of_positions').innerHTML = this.loops;
}

// self-explanatory
function add_solution(solution) {

    solutions.push(solution);

    // add it to the solution list
    var option = _('option');
    option.value = solutions.length - 1;
    option.innerHTML = solution.join('.');
    $('solutions').appendChild(option);

    // update the number of solutions
    $('number_of_solutions').innerHTML = solutions.length;
}

// override the default (empty) new solution funciton
nQueens.prototype.new_solution = function() {

    // the array has to be cloned else it is stored by reference
    var solution1 = this.X.slice(0);

    // store the first solution
    add_solution(solution1);

    // second solution is the horizontal reflection of the first about the
    // middle of the board

    var solution2 = [];

    // find the reflection
    for(var i = this.n; i-->0;)
        solution2[i] = this.n - 1 - solution1[i];

    // store the second solution
    add_solution(solution2);

}

function initialize_queen_calculator() {

    // delete the reference to the queen calculator
    delete Q;

    // instantiate the queen calculator class
    Q = new nQueens(get_int('n'));
}

// stop button action
function stop_calculation() {

    Q.stop = true;

    // turn off everything but the start button
    show(['start']);
    hide(['progress', 'stop']);

}

// start button action
function start_calculation() {

    // show the stop button and Calculating... sign
    show(['stop', 'progress']);

    // hide start and reset buttons
    hide(['start', 'reset']);

    // acquire compute cycle
    Q.cycle = get_int('cycle');

    // safety off
    Q.stop = false;

    // start the calcuation
    Q.run();
}

