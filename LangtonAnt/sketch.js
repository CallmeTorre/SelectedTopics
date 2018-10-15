var grid;
var cols;
var rows;
var ants = new Array();
var probability = 98;
var generation = 0;
var resolution = 5;
var gameOn = false;

function makeGrid(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}  

function getRandomDistribution(prob) {
    var states = [10,0];
    var probabilities = [prob, 100 - prob]; 
    var probArray = new Array(); 
    var state = 0;

    while (state < states.length) {
        for (let i = 0; i < probabilities[state]; i++)
            probArray[probArray.length] = states[state];
        state++;
    }
    return probArray;
}

function setup() {
    colsLabel = createP("Inserte Número de Columnas");
    colsLabel.position(900,10);
    colsInput = createInput("50");
    colsInput.position(1100,20);
    colsInput.size(90,20);

    rowsLabel = createP("Inserte Número de Filas");
    rowsLabel.position(900,50);
    rowsInput = createInput("50");
    rowsInput.position(1100,60);
    rowsInput.size(90,20);

    distributionLabel = createP("Probabilidad de Hormigas");
    distributionLabel.position(900, 90);
    distributionInput = createInput("2");
    distributionInput.position(1100, 100);
    distributionInput.size(90, 20);

    randomBtn = createButton("Distribución Aleatoria");
    randomBtn.position(900, 190);
    randomBtn.mousePressed(randomGeneration);

    startBtn = createButton("Continuar");
    startBtn.position(1050, 190);
    startBtn.mousePressed(loop);

    stopBtn = createButton("Alto");
    stopBtn.position(1150, 190);
    stopBtn.mousePressed(noLoop);

    noLoop();
}

function keyTyped() {
    if (key === 'n') {
        draw();
    }
}

function randomGeneration(){
    generation = 0;
    cols = parseInt(colsInput.value());
    rows = parseInt(rowsInput.value());
    grid = makeGrid(rows, cols);
    probability = parseInt(distributionInput.value());

    var probArray = getRandomDistribution(probability);
    resizeCanvas(cols*resolution, rows*resolution);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            randomNumber = floor(random(100));
            grid[i][j] = probArray[randomNumber];
        }
    }
    gameOn = true;
    draw();

}

function draw() {
    if(gameOn){
        let next = makeGrid(rows, cols);
        background(0);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if(grid[i][j] == 1){
                    fill(255);
                    stroke(0);
                    rect(y, x, resolution - 1, resolution - 1);
                }
                if(grid[i][j] > 2){
                    ants.push([i,j,grid[i][j]])
                    fill(100);
                    stroke(0);
                    rect(y, x, resolution - 1, resolution - 1);
                }
            }
        }
        moveAnts(ants);
    }
}

function moveAnts(ants){
    for (let i = 0; i < ants.length; i++) {
        let ant = ants[i];
        let row = ant[0];
        let col = ant[1];
        let configuration = ant[2];

        let cell_color = configuration % 10;
        let direction = floor(configuration/10)

        if (cell_color == 1) {
            grid[row][col] = 0;
            if (direction == 1) {
                col += 1;
                if (col >= grid[0].length)
                    col = 0;
                moveAnt(row, col, '2');
            } else if (direction == 2) {
                row += 1;
                if (row >= grid.length)
                    row = 0;
                moveAnt(row, col, '3');
            } else if (direction == 3) {
                col -= 1;
                if (col < 0)
                    col = grid[0].length - 1;
                moveAnt(row, col, '4');
            } else {
                row -= 1;
                if (row < 0)
                    row = grid.length - 1;
                moveAnt(row, col, '1');
            }
        } else {
            grid[row][col] = 1;
            if (direction == 1) {
                col -= 1;
                if (col < 0)
                    col = grid[0].length - 1;
                moveAnt(row, col, '4');

            } else if (direction == 4) {
                row += 1;
                if (row >= grid.length)
                    row = 0;
                moveAnt(row, col, '3');

            } else if (direction == 3) {
                col += 1;
                if (col >= grid[0].length)
                    col = 0;
                moveAnt(row, col, '2');

            } else {
                row -= 1;
                if (row < 0)
                    row = grid.length - 1;
                moveAnt(row, col, '1');
            }
        }
    }
}

function moveAnt(next_row, next_col, new_direction) {
    let next_element = grid[next_row][next_col];
    if (next_element == 0) {
        grid[next_row][next_col] = int(new_direction + '0');
    } else {
        grid[next_row][next_col] = int(new_direction + '1');
    }
}