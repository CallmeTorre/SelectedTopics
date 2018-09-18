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
    console.table(temp);
    tempcols = temp.length;
    temprows = temp[0].length;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(i < tempcols){
                if(j < temprows){
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
    noLoop();
    redraw();
}