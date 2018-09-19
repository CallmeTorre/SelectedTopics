var grid;
var cols;
var rows;
var div;
var rules;
var probability;
var generation;
var resolution = 5;
var livingCells = 0; 

function makeGrid(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}  

function getRandomDistribution(prob) {
    var states = [0, 1];
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

function convertToArray(data){
    let arr = new Array(data.length);
    for(let i = 0; i < arr.length; i++){
        arr[i] = data[i].split(",");
    }
    return arr;
}

function fileLoaded(data){
    let temp = convertToArray(data);
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    grid = makeGrid(cols, rows);
    rules = rulesInput.value().split(",");
    resizeCanvas(cols*resolution, rows*resolution);
    tempcols = temp.length;
    temprows = temp[0].length;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(i < temprows){
                if(j < tempcols){
                    grid[i][j] = int(temp[j][i]);
                }
                else{
                    grid[i][j] = 0;
                }
            }else{
                grid[i].fill(0);
            }
        }
    }
    draw();
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
    
    distributionLabel = createP("Probabilidad de 0s");
    distributionLabel.position(900, 90);
    distributionInput = createInput("50");
    distributionInput.position(1100, 100);
    distributionInput.size(90, 20);

    rulesLabel = createP("Inserte la regla deseada");
    rulesLabel.position(900,130);
    rulesInput = createInput("2,3,3,3");
    rulesInput.position(1100,140);
    rulesInput.size(90,20);

    randomBtn = createButton("Generación Aleatoria");
    randomBtn.position(900, 190);
    randomBtn.mousePressed(randomGeneration);

    startBtn = createButton("Continuar");
    startBtn.position(1050, 190);
    startBtn.mousePressed(loop);

    stopBtn = createButton("Alto");
    stopBtn.position(1150, 190);
    stopBtn.mousePressed(noLoop);

    fileBtn = createButton("Importar Archivo");
    fileBtn.position(900,220);
    fileBtn.mousePressed(fileSelected);

    manualBtn = createButton("Generación Manual");
    manualBtn.position(1050,220);
    manualBtn.mousePressed(manualGeneration);

    div = createDiv("").id("toHide");
    colsLabel.parent("toHide");
    colsInput.parent("toHide");
    rowsLabel.parent("toHide");
    rowsInput.parent("toHide");
    distributionLabel.parent("toHide");
    distributionInput.parent("toHide");
    rulesLabel.parent("toHide");
    rulesInput.parent("toHide");
    randomBtn.parent("toHide");  
    fileBtn.parent("toHide");
    noLoop(); 
}

function manualGeneration() {
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    rules = rulesInput.value().split(",");
    grid = makeGrid(cols, rows);
    resizeCanvas(cols*resolution, rows*resolution);
    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    table.style.width = "100%";
    table.id = "manual_grid";
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("input");
            cell.type = "button";
            cell.className = "btn";
            cell.value = "0";
            cell.id = j + "," + i;
            cell.setAttribute("onclick", "setValue(this.id);");
            cell.style.className = "btn_grid";
            cell.style.width = "100%";
            cell.style.height = "100%";
            cell.style.backgroundColor = "#FFFFFF";
            var td = document.createElement("td");

            td.appendChild(cell);
            tr.appendChild(td);

            grid[j][i] = 0;
        }
        tableBody.appendChild(tr);
    }
    table.appendChild(tableBody);
    body.appendChild(table);
}

function setValue(id) {
    id = id.split(",");
    state = document.getElementById(id).value;

    if (state == 0) {
        state = 1;
        document.getElementById(id).style.backgroundColor = "#212121";
    } else{
        state = 0;
        document.getElementById(id).style.backgroundColor = "#FFFFFF";
    }
    grid[id[0]][id[1]] = state;
    document.getElementById(id).value = state;

}


function fileSelected(file){
    loadStrings("board.txt", fileLoaded);
}

function randomGeneration(){
    generation = 0;
    cols = parseInt(colsInput.value());
    rows = parseInt(rowsInput.value());
    probability = parseInt(distributionInput.value());
    grid = makeGrid(cols, rows);
    rules = rulesInput.value().split(",");
    
    var probArray = getRandomDistribution(probability);
    resizeCanvas(cols*resolution, rows*resolution);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            randomNumber = floor(random(100));
            grid[i][j] = probArray[randomNumber];
        }
    }
    draw();
}

function draw(){
    let next = makeGrid(cols, rows);
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if(grid[i][j] == 1){
                fill(255);
                livingCells += 1;
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
            let state = grid[i][j];
            let neighbours = countNeighbours(grid, i, j); 
            if(state == 0 && neighbours == parseInt(rules[2])){
                next[i][j] = 1;
            }
            else if(state == 1 && neighbours < parseInt(rules[0])){
                next[i][j] = 0;
            }
            else if(state == 1 && neighbours > parseInt(rules[1])){
                next[i][j] = 0;
            }else{
                next[i][j] = state;
            }
        }
    }
    grid = next;
    generation+=1;
    livingCells = 0;
    deadCells = 0;
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