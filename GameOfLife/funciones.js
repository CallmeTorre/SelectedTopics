
function changeProb(prob) {
    var numbers = [0, 1];
    var numbers_weight = [prob, 10 - prob]; //weight of each element above
    var weighed_numbers = new Array(); //new array to hold "weighted" elements
    var current_number = 0;

    while (current_number < numbers.length) {
        for (i = 0; i < numbers_weight[current_number]; i++)
            weighed_numbers[weighed_numbers.length] = numbers[current_number];
        current_number++;
    }


    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            random_number = Math.floor(Math.random() * 10);
            grid[i][j] = weighed_numbers[random_number];
        }
    }

    return grid
}

function createManualGrid(n_rows, n_cols, grid) {
    var body = document.getElementsByTagName("body")[0];
    var tbl = document.createElement("table");
    var tbdy = document.createElement("tbody");

    tbl.style.width = "100%";
    tbl.id = "manual_grid";

    for (var i_row = 0; i_row < n_rows; i_row++) {
        var tr = document.createElement("tr");
        for (var i_col = 0; i_col < n_cols; i_col++) {
            var btn = document.createElement("input");
            btn.type = "button";
            btn.className = "btn";
            btn.value = "0";
            btn.setAttribute("onclick", "changeValue(this.id);");
            btn.id = i_row + "," + i_col;
            btn.style.className = "btn_grid";
            btn.style.width = "100%";
            btn.style.height = "100%";
            btn.style.backgroundColor = "#BDBDBD";

            var td = document.createElement("td");

            td.appendChild(btn);
            tr.appendChild(td);

            grid[i_row][i_col] = 0;
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}

function changeValue(id) {
    splitted_id = id.split(",");
    current_val = document.getElementById(id).value;

    if (current_val == 0) {
        current_val = 1;
        document.getElementById(id).style.backgroundColor = "#212121";
    } else {
        current_val = 0;
        document.getElementById(id).style.backgroundColor = "#BDBDBD";
    }
    grid[splitted_id[0]][splitted_id[1]] = current_val;
    document.getElementById(id).value = current_val;
}
