var grid;
var cols;
var rows;
var livingCells;
var resolution = 10;

function makeGrid(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}  

function setup() {
    colsLabel = createP("Inserte Número de Columnas");
    colsLabel.position(0,10);
    colsInput = createInput("50");
    colsInput.position(200,20);
    colsInput.size(90,20);

    rowsLabel = createP("Inserte Número de Filas");
    rowsLabel.position(0,50);
    rowsInput = createInput("50");
    rowsInput.position(200,60);
    rowsInput.size(90,20);
    
    distributionLabel = createP("Probabilidad de 0s");
    distributionLabel.position(400, 50);
    distributionInput = createInput("50");
    distributionInput.position(540, 60);
    distributionInput.size(90, 20);

    randomBtn = createButton("Generación Aleatoria");
    randomBtn.position(10, 110);
    randomBtn.mousePressed(randomGeneration);

    stopBtn = createButton("Alto");
    stopBtn.position(160, 110);
    stopBtn.mousePressed(noLoop);

    startBtn = createButton("Continuar");
    startBtn.position(220, 110);
    startBtn.mousePressed(loop);

    createDiv("").id("content");
    colsLabel.parent("content");
    colsInput.parent("content");
    rowsLabel.parent("content");
    rowsInput.parent("content");
    distributionLabel.parent("content");
    distributionInput.parent("content");
    randomBtn.parent("content");
    stopBtn.parent("content");
    startBtn.parent("content");    
}

function randomGeneration(){
    cols = parseInt(colsInput.value());
    rows = parseInt(rowsInput.value());

    createCanvas(cols*resolution,rows*resolution);

    grid = makeGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    loop();
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