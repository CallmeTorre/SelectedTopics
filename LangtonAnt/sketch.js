var grid;
var cols;
var rows;
var ants = new Array();
var antsToDie = new Array();
var probability = 98;
var generation = 0;
var resolution = 5;
var gameOn = false;
var workerMode = false;

function makeGrid(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}  

function getRandomDistribution(prob) {
    var states = [[0, 1, 2, 3], -1];
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
            randomConfig = probArray[randomNumber]
            if (Array.isArray(randomConfig)){
                orientation = Math.floor(Math.random() * Math.floor(3));
                randomConfig = randomConfig[orientation];
            }
            if (randomConfig != -1){
                ants.push(new Ant(i, j, randomConfig, 0, rows, cols));
            }
            grid[i][j] = 0;
        }
    }
    gameOn = true;
    draw();

}

function draw() {
    if(gameOn){
        let next = makeGrid(rows, cols);
        let mutualCells = new Map();
        background(0);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * resolution;
                let y = j * resolution;
                let currentVal = grid[i][j];
                if(currentVal != 0){
                    fill(currentVal);
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
        let index = 0;

        for(let ant of ants){
            let currentRow = ant.row;
            let currentCol = ant.col;
            if(workerMode){
                if(ant.life <= 0){
                    antsToDie.push(index);
                    continue;
                }
            }
            drawAnt(ant);

            if(grid[currentRow][currentCol] == 0){
                if(workerMode){
                    grid[currentRow][currentCol] = ant.typeColor;
                }else{
                    grid[currentRow][currentCol] = ant.color;
                }
            }else{
                grid[currentRow][currentCol] = 0;
            }

            ant.moveForward();
            ant.cellValue = grid[ant.row][ant.col];

            if(workerMode){
                if(ant.type == 0 || ant.type == 1){
                    let keyString = ant.row.toString() + ant.col.toString();
                    let current_type_of_ant = mutualCells.get(keyString);
                    if (current_type_of_ant != undefined){
                        if(current_type_of_ant == 1 && ant.type == 0 || current_type_of_ant == 0 && ant.type == 1){
                            let new_ant = new Ant(ant.row, ant.col, int(random(0, 3)), grid[ant.row][ant.col], grid.length, grid[0].length);
                            ants.push(new_ant);
                        }
                    }else{
                        mutualCells.set(ant.row.toString() + ant.col.toString(), ant.type);
                    }
                }
            }
            index += 1;
        }
        if(workerMode){
            killAnts();
        }
    }
}

function killAnts(){
    for (let i = 0; i < antsToDie.length; i++) {
        ants.splice(antsToDie[i], 1);
    }
}

function drawAnt(ant){
    let x = ant.row * resolution;
    let y = ant.col * resolution;
    if (workerMode) {
        if (ant.type == 0)
            fill(245, 0, 87);
        else if (ant.type == 1)
            fill(0, 229, 255);
        else
            fill(188, 170, 164);
        stroke(0);
        rect(y, x, resolution - 1, resolution - 1);
    } else {
        fill(255, 255, 255);
        stroke(0);
        rect(y, x, resolution - 1, resolution - 1);
    }
}