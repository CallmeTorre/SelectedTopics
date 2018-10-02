var grid;
var cols;
var rows;
var div;
var rules;
var probability;
var generation = 0;
var resolution = 5;
var livingCells = 0;
var gameOn = false;


function setup() {
    colsLabel = createP("Inserte Número de Columnas");
    colsLabel.position(900, 10);
    colsInput = createInput("5");
    colsInput.position(1130, 20);
    colsInput.size(90, 20);

    rowsLabel = createP("Inserte Número de Filas");
    rowsLabel.position(900, 50);
    rowsInput = createInput("10");
    rowsInput.position(1130, 60);
    rowsInput.size(90, 20);

    distributionLabel = createP("Probabilidad de 0s");
    distributionLabel.position(900, 90);
    distributionInput = createInput("50");
    distributionInput.position(1130, 100);
    distributionInput.size(90, 20);

    rulesLabel = createP("Inserte la regla deseada");
    rulesLabel.position(900, 130);
    rulesInput = createInput("2,3,3,3");
    rulesInput.position(1130, 140);
    rulesInput.size(90, 20);

    randomBtn = createButton("Generación Aleatoria");
    randomBtn.position(900, 190);
    randomBtn.mousePressed(randomGeneration);

    startBtn = createButton("Continuar");
    startBtn.position(1060, 190);
    startBtn.mousePressed(loop);

    stopBtn = createButton("Alto");
    stopBtn.position(1170, 190);
    stopBtn.mousePressed(noLoop);

    fileBtn = createButton("Importar Archivo");
    fileBtn.position(900, 225);
    fileBtn.mousePressed(fileSelected);

    manualBtn = createButton("Generación Manual");
    manualBtn.position(1050, 225);
    manualBtn.mousePressed(manualGeneration);

    manualBtn = createButton("Graficar");
    manualBtn.position(900, 260);
    manualBtn.mousePressed(graph);
    localStorage.setItem("gameOn", 0);

    noLoop();
}


function draw() {
    if (gameOn) {
        let next = makeGrid(rows, cols);
        background(0);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] == 1) {
                    fill(255);
                    livingCells += 1;
                    stroke(0);
                    rect(y, x, resolution - 1, resolution - 1);
                }
                let state = grid[i][j];
                let neighbours = countNeighbours(grid, i, j);
                if (state == 0 && neighbours == parseInt(rules[2])) {
                    next[i][j] = 1;
                } else if (state == 1 && neighbours < parseInt(rules[0])) {
                    next[i][j] = 0;
                } else if (state == 1 && neighbours > parseInt(rules[1])) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        localStorage.setItem("livingCells", livingCells);
        localStorage.setItem("generation", generation);
        grid = next;
        generation += 1;
        livingCells = 0;
        deadCells = 0;
    }
}