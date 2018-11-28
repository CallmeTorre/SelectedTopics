var grid;
var cols;
var rows;
var rules;
var probability;
var nodes;
var memory;
let patternsDict;
var gensToRemember;
var criterion;
let patternsCounter = [0, 0, 0];
var generation = 0;
var contador = 0;
var resolution = 5;
var livingCells = 0; 
var gameOn = false;
var currentConfig = 0;
var createAtractor = false;
var seachingNodes = new Map();
var configNumber = 0;


function makeGrid(rows, cols) {
    let arr = new Array(rows);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
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
    grid = makeGrid(rows, cols);
    rules = rulesInput.value().split(",");
    memory = makeGrid(rows, cols);
    gensToRemember = parseInt(memoryInput.value());
    criterion = criterionInput.value()
    resizeCanvas(cols*resolution, rows*resolution);
    temprows = temp.length;
    tempcols = temp[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            memory[i][j] = [];
            if(i < temprows){
                if(j < tempcols){
                    grid[i][j] = int(temp[i][j]);
                }
                else{
                    grid[i][j] = 0;
                }
            }else{
                grid[i].fill(0);
            }
        }
    }
    gameOn = true;
    draw();
}

function setup() {
    colsLabel = createP("Inserte Número de Columnas");
    colsLabel.position(900,10);
    colsInput = createInput("5");
    colsInput.position(1100,20);
    colsInput.size(90,20);

    rowsLabel = createP("Inserte Número de Filas");
    rowsLabel.position(900,50);
    rowsInput = createInput("10");
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

    manualBtn = createButton("Graficar");
    manualBtn.position(900,260);
    manualBtn.mousePressed(graph);

    atractorBtn = createButton("Atractor");
    atractorBtn.position(1050,260);
    atractorBtn.mousePressed(generateAtractor);

    memoryLabel = createP("Generaciones a recordar");
    memoryLabel.position(900, 300);
    memoryInput = createInput("5");
    memoryInput.position(1100,310);
    memoryInput.size(90, 20);

    criterionLabel = createP("Inserte Criterio");
    criterionLabel.position(900, 350);
    criterionInput = createInput("Paridad");
    criterionInput.position(1100,360);
    criterionInput.size(90, 20);

    patternsDict = generatePatternsDict();

    noLoop(); 
}

function binaryArrayToGrid(binary_array, size){
    let result = [];
    while(binary_array.length) {
        result.push(binary_array.splice(0,size));
    }
    return result
}

function gridToNumber(array){
    let configuration = array.flat().join("");
    let decimalNumber = parseInt(configuration, 2);
    return decimalNumber;
}

function numberToBinaryArray(number){
    let binary_number;
    let result;
    binary_number = number.toString(2);
    result = binary_number.split("");
    while(result.length < (rows*cols)){
        result.unshift("0");
    }
    return result.map(Number);
}

function configGrid(number, chunks_size){
    let binary_array;
    binary_array = numberToBinaryArray(number);
    return binaryArrayToGrid(binary_array, chunks_size)
}

function generateDictionary(number_of_nodes) {
    const nodes = new Map();
    for (let index = 0; index < number_of_nodes; index++) {
        var mySet = new Set();
        nodes.set(index, mySet);
    }

    return nodes;
}

function generateAtractor(){
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    rules = rulesInput.value().split(",");
    resizeCanvas(cols*resolution, rows*resolution);
    configNumber = Math.pow(2, rows*cols);
    seachingNodes = generateDictionary(configNumber);
    grid = configGrid(currentConfig, rows);
    createAtractor = true;
    gameOn = true;
}

function keyTyped() {
    if (key === 'n') {
        draw();
    }
}

function graph(){
    localStorage.setItem("gameOn", true);
    localStorage.setItem("rows", rows);
    localStorage.setItem("cols", cols);
    localStorage.setItem("patterns", patternsCounter);
}

function manualGeneration() {
    gameOn = true;
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    rules = rulesInput.value().split(",");
    grid = makeGrid(rows, cols);
    resizeCanvas(cols*resolution, rows*resolution);
    var body = document.getElementsByTagName("body")[0];
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    for (var i = 0; i < rows; i++) {
        var tableRow = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement("input");
            cell.type = "button";
            cell.value = "0";
            cell.id = i + "," + j;
            cell.setAttribute("onclick", "setValue(this.id);");
            cell.style.backgroundColor = "#FFFFFF";
            var td = document.createElement("td");

            td.appendChild(cell);
            tableRow.appendChild(td);

            grid[i][j] = 0;
        }
        tableBody.appendChild(tableRow);
    }
    table.appendChild(tableBody);
    body.appendChild(table);
}

function setValue(id) {
    id = id.split(",");
    col = id[1];
    row = id[0];
    state = document.getElementById(id).value;

    if (state == 1) {
        state = 0;
        document.getElementById(id).style.backgroundColor = "#FFFFFF";
    } else{
        state = 1;
        document.getElementById(id).style.backgroundColor = "#212121";

    }
    grid[row][col] = state;
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
    grid = makeGrid(rows, cols);
    memory = makeGrid(rows, cols);
    rules = rulesInput.value().split(",");
    gensToRemember = parseInt(memoryInput.value());
    criterion = criterionInput.value()
    var probArray = getRandomDistribution(probability);
    resizeCanvas(cols*resolution, rows*resolution);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            randomNumber = floor(random(100));
            grid[i][j] = probArray[randomNumber];
            memory[i][j] = [];
        }
    }
    gameOn = true;
    draw();
}

function createJSON(dictionary){
    var jsonObj = {
        nodes: [],
        edges: []
    }

    for (var [key, value] of dictionary) {

        jsonObj['nodes'].push({
            "data": {
                "id": key.toString()
            }
        });
        for (let item of value) {
            jsonObj['edges'].push({
                "data": {
                    "source": key.toString(),
                    "target": item.toString()
                }
            });
        }
    }

    saveJSON(jsonObj, 'graph.json');
}

function draw(){
    if(gameOn){
        let next = makeGrid(rows, cols);
        background(0);
        let currentNode;
        if(createAtractor == true){
            currentNode = gridToNumber(grid);
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if(grid[i][j] == 1){
                    fill(255);
                    livingCells += 1;
                    stroke(0);
                    rect(y, x, resolution - 1, resolution - 1);
                }
                if(contador < parseInt(gensToRemember)){
                    memory[i][j][contador] = grid[i][j];
                    let state = grid[i][j];
                    let neighbours_array = countNeighbours(grid, i, j);
                    let neighbours = neighbours_array[0]
                    countPatterns(neighbours_array[1]) 
                    if(state == 0 && neighbours >= parseInt(rules[2]) && neighbours <= parseInt(rules[3])){
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
                }else{
                    contador = 0;
                    if(criterion == "Paridad"){
                        console.log("Halp");
                        var count = 0;
                        for(var cont = 0; cont < memory[i][j].length; ++cont){
                            if(memory[i][j][cont] == 1)
                                count++;
                            }
                        if(count%2 == 0){
                            next[i][j] = 1;
                        }
                        else{
                            next[i][j] = 0;
                        }
                        memory[i][j] = [];
                    }else{
                        if(criterion == "Mayoria"){
                            var count = 0;
                            for(var cont = 0; cont < memory[i][j].length; ++cont){
                                if(memory[i][j][cont] == 1)
                                    count++;
                                }
                            if(count > parseInt(gensToRemember/2)){
                                next[i][j] = 1;
                            }
                            else{
                                next[i][j] = 0;
                            }
                            memory[i][j] = [];
                        }else{
                            if(criterion == "Minoria"){
                                var count = 0;
                                for(var cont = 0; cont < memory[i][j].length; ++cont){
                                    if(memory[i][j][cont] == 1)
                                        count++;
                                    }
                                if(count < parseInt(gensToRemember/2)){
                                    next[i][j] = 1;
                                }
                                else{
                                    next[i][j] = 0;
                                }
                                memory[i][j] = [];
                            }
                        }
                    } 
                }
            }
        }
        localStorage.setItem("livingCells", livingCells);
        localStorage.setItem("generation", generation);
        localStorage.setItem("patterns", patternsCounter);

        grid = next;
        generation+=1;
        livingCells = 0;
        deadCells = 0;
        patternsCounter = [0, 0, 0];
        contador+=1;

        if(createAtractor == true){
            let nextNode = gridToNumber(grid);
            nodes = seachingNodes.get(currentNode);
            if(!nodes.has(nextNode)){
                nodes.add(nextNode);
                seachingNodes.set(currentNode, nodes);
            }else if(currentNode == nextNode){
                if(currentConfig < configNumber - 1){
                    currentConfig += 1;
                    grid = configGrid(currentConfig, rows);
                }else{
                    gameOn = false;
                    createJSON(seachingNodes);
                }
            } else {
                if(currentConfig < configNumber - 1){
                    currentConfig += 1;
                    grid = configGrid(currentConfig, rows);
                }else{
                    gameOn = false;
                    createJSON(seachingNodes);
                }
            }
        }
    }
}

function countNeighbours(grid, x, y){
    let binary_string = "";
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (y + j + cols) % cols;
            let row = (x + i + rows) % rows; 
            binary_string += (grid[row][col]).toString();
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return [sum, parseInt(binary_string, 2)]
}

function generatePatternsDict() {
    let patterns = new Map();
    let stillLife1 = 432; 
    let stillLife2 = 216; 
    let stillLife3 = 54; 
    let stillLife4 = 27; 

    let stillLife5 = 426; 
    let stillLife6 = 170; 

    let oscillator1 = 56;
    let oscillator2 = 146;

    let glider1 = 346;
    let glider2 = 107;
    let glider3 = 79
    let glider4 = 286;

    patterns.set(stillLife1, "stillLifeQuarter");
    patterns.set(stillLife2, "stillLifeQuarter");
    patterns.set(stillLife3, "stillLifeQuarter");
    patterns.set(stillLife4, "stillLifeQuarter");

    patterns.set(stillLife5, "stillLife");
    patterns.set(stillLife6, "stillLife");

    patterns.set(oscillator1, "oscillator");
    patterns.set(oscillator2, "oscillator");

    patterns.set(glider1, "glider");
    patterns.set(glider2, "glider");
    patterns.set(glider3, "glider");
    patterns.set(glider4, "glider");

    return patterns;
}

function countPatterns(key) {
    let configuration = patternsDict.get(key);

    if (configuration === undefined) {
        return;
    } else if (configuration == 'stillLifeQuarter') {
        patternsCounter[0] += 0.25;
    } else if (configuration == 'stillLife') {
        patternsCounter[0] += 1;
    } else if (configuration == 'oscillator') {
        patternsCounter[1] += 1;
    } else {
        patternsCounter[2] += 1;
    }
}