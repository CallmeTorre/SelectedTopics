class Ant{
    constructor(row, col, orientation, cellValue, maxRow, maxCol){
        this.row = int(row);
        this.col = int(col);
        this.orientation = orientation;
        this.color = this.generateColor();
        this.moved = false;
        this.cellValue = cellValue;
        this.maxRows = maxRow;
        this.maxCols = maxCol;
        this.type = this.getType();
        this.originalRow = this.row;
        this.originalCol = this.col;
        this.originalOrientation = this.orientation;
        if (this.type == 0) {
            this.life = 1500;
            this.typeColor = color(255, 0, 0);
        }
        else if (this.type == 1) {
            this.life = 1000;
            this.typeColor = color(0, 255, 0);
        }
        else {
            this.life = 600;
            this.typeColor = color(0, 0, 255);
        }
    }

    getType(){
        let items = [0, 1, 2];
        let weights = [2, 8, 90];
        let total = 0;
        let ranges = weights.slice(0);
        for (var i = 0, len = weights.length; i < len; i++) {
            ranges[i] = [total, total += ranges[i]];
        }
        var randomNumber = parseInt(Math.random() * total);
        for (; randomNumber < ranges[--i][0];);
        return items[i];
    }

    generateColor(){
        return color(random(255), random(255), random(255));
    }

    turnLeft() {
        this.orientation--;
        if (this.orientation < 0) {
            this.orientation = 3;
        }
    }

    turnRight() {
        this.orientation++;
        if (this.orientation > 3) {
            this.orientation = 0;
        }
    }

    moveRight() {
        this.col += 1;
        if (this.col >= this.maxCols)
            this.col = 0;
    }

    moveLeft() {
        this.col -= 1;
        if (this.col < 0)
            this.col = this.maxCols - 1;
    }

    moveUp() {
        this.row -= 1;
        if (this.row < 0)
            this.row = this.maxRows - 1;
    }

    moveDown() {
        this.row += 1;
        if (this.row >= this.maxRows)
            this.row = 0;
    }

    moveForward() {
        this.life -= 1;
        if (this.cellValue == 0) {
            if (this.orientation == 0) {
                this.moveRight();
            } else if (this.orientation == 1) {
                this.moveDown();
            } else if (this.orientation == 2) {
                this.moveLeft();
            } else {
                this.moveUp();
            }
            this.turnRight();
        } else {
            if (this.orientation == 0) {
                this.moveLeft();
            } else if (this.orientation == 1) {
                this.moveUp();
            } else if (this.orientation == 2) {
                this.moveRight();
            } else {
                this.moveDown();
            }
            this.turnLeft();
        }
    }
}