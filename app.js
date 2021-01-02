/* CREATE CANVAS */

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

/* SNAKE COORDINATES */

let coordinates = { x: -20, y: 0 };
let direction = {axis: 'x'};
let path = {direction: 'right'};
let previousCoor;
let previousTail;
let scoreCounter = 0;
let foodEaten = 0;
const numTwenty = 20;
const numNinteen = 19;

let foodArray = [];
let previousMoves = [];

const scoreCard = () => {
    const card = document.getElementById('card')
    card.innerHTML = `Score: ${scoreCounter}`;
}

scoreCard();

/* BOARD GRID CREATION */

const drawBoard = () => {

    /* BOX WIDTH & HEIGHT & PADDING */
    const bw = 420;
    const bh = 420;
    const p = 0;

    for (let x = 0; x <= bw; x += numTwenty) {
        ctx.moveTo(x + p, p);
        ctx.lineTo(x + p, bh + p);
    }

    for (let x = 0; x <= bh; x += numTwenty) {
        ctx.moveTo(p, x + p);
        ctx.lineTo(bw + p, x + p);
    }
    ctx.strokeStyle = "#ffff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.stroke();
}

/* ANIMATION UPDATES */

setInterval(function() {
    draw(coordinates, direction, path, foodArray)
}, 200, coordinates, direction, path, foodArray) 
    


const draw = (coordinates, direction, path, foodArray) => {
    
    /* CANVAS */

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* ENDGAME CHECK */

    if (gameOver()) {
        gameOverMsg();
        return;
    }

    /* MOVEMENT CONDITIONS */

    if (direction.axis === 'x' && path.direction === 'right') {
        coordinates.x += numTwenty;
        previousCoor = '+>';
        previousMoves.push({x: coordinates.x, y: coordinates.y})
    } else if (direction.axis === 'y' && path.direction === 'down') {
        coordinates.y += numTwenty;
        previousCoor = '+v';
        previousMoves.push({x: coordinates.x, y: coordinates.y})
    } else if (direction.axis === 'y' && path.direction === 'up') {
        coordinates.y += -numTwenty;
        previousCoor = '-^';
        previousMoves.push({x: coordinates.x, y: coordinates.y})
    } else if (direction.axis === 'x' && path.direction === 'left') {
        coordinates.x += -numTwenty;
        previousCoor = '-<';
        previousMoves.push({x: coordinates.x, y: coordinates.y})
    }

    /* FOOD */
    for (let i = 0; i < foodArray.length; i++) {
        ctx.fillStyle = foodArray[i].color;
        ctx.fillRect(foodArray[i].xCoor, foodArray[i].yCoor, foodArray[i].width, foodArray[i].height);
    }

    /* SNAKE */

    ctx.fillStyle = 'white';
    ctx.fillRect(coordinates.x, coordinates.y, numTwenty, numTwenty);

    eatFood();

    /* SNAKE TAIL */

    if (foodEaten > 0) {
        for (let i = previousMoves.length - 2; i > 1; i--) {
            ctx.fillStyle = 'white';
            ctx.fillRect(previousMoves[i].x, previousMoves[i].y, numTwenty, numTwenty);
        }
    }

    /* REDRAW BOARD */

    drawBoard();
    
    arrayShrinker();
}

/* EVENT LISTENERS */

document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowDown' && direction.axis !== 'y' && previousCoor !== '-^') {
        direction.axis = 'y';
        path.direction = 'down';
    } else if (event.key === 'ArrowUp' && direction.axis !== 'y' && previousCoor !== '+v') {
        direction.axis = 'y';
        path.direction = 'up';
    } else if (event.key === 'ArrowRight' && direction.axis !== 'x' && previousCoor !== '-<') {
        direction.axis = 'x';
        path.direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction.axis !== 'x'  && previousCoor !== '+>') {
        direction.axis = 'x';
        path.direction = 'left';
    } 

})

const gameOver = () => {
    let overlap = snakeOverlap()
    if (coordinates.x === 420 || coordinates.x === -40 || coordinates.y === 420 || coordinates.y === -20 || overlap === true) {
        return true;
    } 
    return false;
}

const gameOverMsg = () => {

    ctx.fillStyle = 'white';

    /* Y */

    ctx.fillRect(100, 80, 20, 60);
    ctx.fillRect(140, 80, 20, 60);
    ctx.fillRect(120, 120, 20, 60);
    ctx.fillRect(180, 160, 20, 20);
    ctx.fillRect(220, 160, 20, 20);

    /* O */

    ctx.fillRect(180, 80, 20, 100);
    ctx.fillRect(220, 140, 20, 20);
    ctx.fillRect(220, 80, 20, 100);
    ctx.fillRect(200, 80, 20, 20);
    ctx.fillRect(200, 160, 20, 20);

    /* U */

    ctx.fillRect(300, 80, 20, 100);
    ctx.fillRect(260, 80, 20, 100);
    ctx.fillRect(280, 160, 20, 20);

    /* L */

    ctx.fillRect(60, 200, 20, 100);
    ctx.fillRect(80, 280, 40, 20);

    /* 0 #2 */

    ctx.fillRect(140, 200, 20, 100);
    ctx.fillRect(180, 200, 20, 100);
    ctx.fillRect(160, 200, 20, 20);
    ctx.fillRect(160, 280, 20, 20);

    /* S */

    ctx.fillRect(220, 200, 60, 20);
    ctx.fillRect(220, 240, 60, 20);
    ctx.fillRect(220, 280, 60, 20);
    ctx.fillRect(220, 220, 20, 20);
    ctx.fillRect(260, 260, 20, 20);

    /* E */

    ctx.fillRect(300, 200, 60, 20);
    ctx.fillRect(300, 220, 20, 20);
    ctx.fillRect(300, 240, 60, 20);
    ctx.fillRect(300, 260, 20, 20);
    ctx.fillRect(300, 280, 60, 20);


}

setInterval(function() {
    food();
}, 5000) 

const food = () => {

    if (gameOver()) {
        foodArray = [];
        draw();
        return;
    }

    let x = randomCoordinate(400);
    let y = randomCoordinate(400);
    foodArray.push({xCoor: x, yCoor: y, width: numNinteen, height: numNinteen, color: 'red'})
    
}

const eatFood = () => {
    for (let i = 0; i < foodArray.length; i++) {
        if (foodArray[i].xCoor === coordinates.x && foodArray[i].yCoor === coordinates.y) {
            foodArray.splice(i, 1);
            scoreCounter += 10;
            foodEaten++;
            scoreCard();   
        }
    }
}

const randomCoordinate = (max) => {
    let num = Math.floor(Math.random() * Math.floor(max));
    let decimal = num / numTwenty;
    return Math.round(decimal) * numTwenty;
}

const arrayShrinker = () => {
    if (previousMoves.length > foodEaten + 2) {
        previousMoves.splice(0, 1);
    }
}

const snakeOverlap = () => {
    if (foodEaten > 2) {
        for (let i = 0; i < previousMoves.length - 1; i++) {
            if (previousMoves[i].x === coordinates.x && previousMoves[i].y === coordinates.y) {
                return true;
            }
        }
        return false
    }
    
}