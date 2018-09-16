var grid;
var cols;
var rows;
var livingCells;
var resolution = 20;

function makeGrid(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}  

function setup() {
    createCanvas(720,400);
    cols = floor(width / resolution);
    rows = floor(height / resolution);

    grid = makeGrid(cols, rows);
}

function mousePressed() {
    init();
  }

function init(){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw(){
    background(255);
    newGeneration();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1){
                fill(0);
            }
            else{
                fill(255);
            }
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    }
}

function newGeneration(){
    let next = makeGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbours = countNeighbours(grid, i, j); 
            if(state == 0 && neighbours == 3){
                next[i][j] = 1;
            }
            else if(state == 1 && neighbours < 2){
                next[i][j] = 0;
            }
            else if(state == 1 && neighbours > 3){
                next[i][j] = 0;
            }else{
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function countNeighbours(grid, x, y){
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows; 
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum
}