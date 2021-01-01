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

let snakeArray = [];
let foodArray = [];

const scoreCard = () => {
    const card = document.getElementById('card')
    card.innerHTML = `Score: ${scoreCounter}`;
}

scoreCard();

/* BOARD GRID CREATION */

const drawBoard = () => {

    /* BOX WIDTH & HEIGHT & PADDING */
    const bw = 600;
    const bh = 600;
    const p = 0;

    for (let x = 0; x <= bw; x += 20) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (let x = 0; x <= bh; x += 20) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
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

    /* REDRAW BOARD */

    drawBoard();

    /* ENDGAME CHECK */

    let gameover = gameOver();
    if (gameover === true) {
        gameOverMsg();
        return;
    }

    /* MOVEMENT CONDITIONS */

    if (direction.axis === 'x' && path.direction === 'right') {
        coordinates.x += 20;
        previousCoor = '+>';
    } else if (direction.axis === 'y' && path.direction === 'down') {
        coordinates.y += 20;
        previousCoor = '+v';
    } else if (direction.axis === 'y' && path.direction === 'up') {
        coordinates.y += -20;
        previousCoor = '-^';
    } else if (direction.axis === 'x' && path.direction === 'left') {
      coordinates.x += -20;
      previousCoor = '-<';
    }
    

    /* SNAKE */

    ctx.fillStyle = 'white';
    ctx.fillRect(coordinates.x, coordinates.y, 20, 20);

    /* FOOD */
    for (let i = 0; i < foodArray.length; i++) {
        ctx.fillStyle = foodArray[i].color;
        ctx.fillRect(foodArray[i].xCoor, foodArray[i].yCoor, foodArray[i].width, foodArray[i].height);
    }

    eatFood();

    for (let i = 0; i < snakeArray.length; i++) {

        if (previousCoor === '+>') {
            snakeArray[i].xCoor = coordinates.x - 20;
            snakeArray[i].yCoor = coordinates.y
        } else if (previousCoor === '+v') {
            snakeArray[i].xCoor = coordinates.x;
            snakeArray[i].yCoor = coordinates.y - 20;

        } else if (previousCoor === '-^') {
            snakeArray[i].xCoor = coordinates.x;
            snakeArray[i].yCoor = coordinates.y + 20;

        } else if (previousCoor === '-<') {
            snakeArray[i].xCoor = coordinates.x + 20;
            snakeArray[i].yCoor = coordinates.y;

        }

        ctx.fillStyle = 'white';
        ctx.fillRect(snakeArray[i].xCoor, snakeArray[i].yCoor, 20, 20);

    }

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
    if (coordinates.x === 420 || coordinates.x === -40 || coordinates.y === 420 || coordinates.y === -20) {
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

    let gameOverCheck = gameOver();
    if (gameOverCheck) {
        foodArray = [];
        draw();
        return;
    }

    let x = randomCoordinate(400) + 1;
    let y = randomCoordinate(400) + 1;
    foodArray.push({xCoor: x, yCoor: y, width: 19, height: 19, color: 'red'})
    
}

const eatFood = () => {
    for (let i = 0; i < foodArray.length; i++) {
        if (foodArray[i].xCoor === coordinates.x + 1 && foodArray[i].yCoor === coordinates.y + 1) {
            foodArray.splice(i, 1);
            scoreCounter += 10;
            scoreCard();
            snakeTail();            
        }
    }
}

const snakeTail = () => {
    if (previousCoor === '+>') {
        snakeArray.push({xCoor: coordinates.x - 20, yCoor: coordinates.y, width: 19, height: 19, color: 'white'})
    } else if (previousCoor === '+v') {
        snakeArray.push({xCoor: coordinates.x, yCoor: coordinates.y - 20, width: 19, height: 19, color: 'white'})
    } else if (previousCoor === '-^') {
        snakeArray.push({xCoor: coordinates.x, yCoor: coordinates.y + 20, width: 19, height: 19, color: 'white'})
    } else if (previousCoor === '-<') {
        snakeArray.push({xCoor: coordinates.x + 20, yCoor: coordinates.y, width: 19, height: 19, color: 'white'})
    }
}

const randomCoordinate = (max) => {
    let num = Math.floor(Math.random() * Math.floor(max));
    let decimal = num / 20;
    return Math.round(decimal) * 20;
}