function keyTyped() {
    if (key === 'n') {
        draw();
    }
}

function graph() {
    localStorage.setItem("gameOn", true);
    localStorage.setItem("rows", rows);
    localStorage.setItem("cols", cols);
}

function manualGeneration() {
    gameOn = true;
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    rules = rulesInput.value().split(",");
    let a = makeGrid(rows, cols);
    grid = makeGrid(rows, cols);
    resizeCanvas(cols * resolution, rows * resolution);
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
    } else {
        state = 1;
        document.getElementById(id).style.backgroundColor = "#212121";

    }
    grid[row][col] = state;
    document.getElementById(id).value = state;
}

function fileSelected() {
    loadStrings("board.txt", fileLoaded);
}

function randomGeneration() {
    generation = 0;
    cols = parseInt(colsInput.value());
    rows = parseInt(rowsInput.value());
    probability = parseInt(distributionInput.value());
    grid = makeGrid(rows, cols);
    rules = rulesInput.value().split(",");

    var probArray = getRandomDistribution(probability);
    resizeCanvas(cols * resolution, rows * resolution);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            randomNumber = floor(random(100));
            grid[i][j] = probArray[randomNumber];
        }
    }
    gameOn = true;
    draw();
}

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

function convertToArray(data) {
    let arr = new Array(data.length);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = data[i].split(",");
    }
    return arr;
}

function fileLoaded(data) {
    let temp = convertToArray(data);
    rows = parseInt(rowsInput.value());
    cols = parseInt(colsInput.value());
    grid = makeGrid(rows, cols);
    rules = rulesInput.value().split(",");
    resizeCanvas(cols * resolution, rows * resolution);
    temprows = temp.length;
    tempcols = temp[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i < temprows) {
                if (j < tempcols) {
                    grid[i][j] = int(temp[i][j]);
                } else {
                    grid[i][j] = 0;
                }
            } else {
                grid[i].fill(0);
            }
        }
    }
    gameOn = true;
    draw();
}

function convertToArray(data) {
    let arr = new Array(data.length);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = data[i].split(",");
    }
    return arr;
}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (y + j + cols) % cols;
            let row = (x + i + rows) % rows;
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum
}