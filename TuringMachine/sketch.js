var head;
var currentState;
var tape = [];
var resolution = 50;

function setup() {
    createCanvas(1000,1000);
    onesLabel = createP("Inserte Cadena de Unos");
    onesLabel.position(900,10);
    onesInput = createInput("111");
    onesInput.position(1100,20);
    onesInput.size(90,20); 
    onesButton = createButton("Duplicar");
    onesButton.position(900,220);
    onesButton.mousePressed(duplicateString);
    noLoop();
}

function draw(){
    rectMode(CENTER);
    for(let i = 0; i< tape.length; i++){
        let x = i * resolution;
        if(head == i){
            fill(70);
        }
        rect(x+25,45, resolution - 1, resolution -1);
        text(str(tape[i]), x+20, 50);
    }
}

function setUpTape(stringToDuplicate){
    let lengthTape = (stringToDuplicate.length * 2)+2;
    let tempTape = new Array(lengthTape);
    tempTape[0] = null;
    for(let i = 1; i < stringToDuplicate.length+1; i++){
        tempTape[i] = int(stringToDuplicate[i-1]);
    }
    for(let j = stringToDuplicate.length+1; j < lengthTape; j++){
        tempTape[j] = null;
    }
    return tempTape;
}

function checkState(){
    while(currentState != 5){
        redraw();
        if(currentState == 0 && tape[head] == 1){
            tape[head] = 'x';
            head += 1;
            currentState = 1;
        }else if(currentState == 0 && tape[head] == 'y'){
            tape[head] = 'y';
            head += 1;
            currentState = 3;
        }else if(currentState == 1 && tape[head] == 1){
            head += 1;
            currentState = 1;
        }else if(currentState == 1 && tape[head] == 'y'){
            tape[head] = 'y';
            head += 1;
            currentState = 1;
        }else if(currentState == 1 && tape[head] == null){
            tape[head] = 'y';
            head = head - 1;
            currentState = 2;
        }else if(currentState == 2 && tape[head] == 'y'){
            tape[head] = 'y';
            head = head - 1;
            currentState = 2;
        }else if(currentState == 2 && tape[head] == 1){
            tape[head] = 1;
            head = head - 1;
            currentState = 2;
        }else if(currentState == 2 && tape[head] == 'x'){
            tape[head] = 'x';
            head += 1;
            currentState = 0;
        }else if(currentState == 3 && tape[head] == 'y'){
            tape[head] = 'y';
            head += 1;
            currentState = 3;
        }else if(currentState == 3 && tape[head] == null){
            tape[head] = null;
            head = head - 1;
            currentState = 4;
        }else if(currentState == 4 && tape[head] == 'y'){
            tape[head] = 1;
            head = head - 1;
            currentState = 4;
        }else if(currentState == 4 && tape[head] == 'x'){
            tape[head] = 1;
            head = head - 1;
            currentState = 4;
        }else if(currentState == 4 && tape[head] == null){
            tape[head] = null;
            head += 1;
            currentState = 5;
        }
    }
}

function duplicateString(){
    head = 1;
    currentState = 0;
    stringInput = onesInput.value();
    tape = setUpTape(stringInput);
    checkState();
}