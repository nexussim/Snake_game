/* CREATE CANVAS */

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

/* SNAKE COORDINATES */

let coordinates = { x: -20, y: 0 };
let direction = {axis: 'x'};
let path = {direction: 'right'};



/* BOARD GRID CREATION */

const drawBoard = () => {

    /* BOX WIDTH & HEIGHT & PADDING */
    var bw = 600;
    var bh = 600;
    var p = 0;

    for (var x = 0; x <= bw; x += 20) {
        ctx.moveTo(0.5 + x + p, p);
        ctx.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += 20) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(bw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "#ffff";
    ctx.stroke();
}

/* ANIMATION UPDATES */

setInterval(function draw(coordinates, direction, path) {

    /* ENDGAME CHECK */

    let gameover = gameOver();
    if (gameover === true) {
        gameOverMsg();
        return;
    }

    /* MOVEMENT CONDITIONS */

    if (direction.axis === 'x' && path.direction === 'right') {
        coordinates.x += 20;
    } else if (direction.axis === 'y' && path.direction === 'down') {
        coordinates.y += 20;
    } else if (direction.axis === 'y' && path.direction === 'up') {
        coordinates.y += -20;
    } else if (direction.axis === 'x' && path.direction === 'left') {
      coordinates.x += -20;
    }
    /* CANVAS */

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* SNAKE */

    ctx.fillStyle = 'white';
    ctx.fillRect(coordinates.x, coordinates.y, 20, 20);

    /* REDRAW BOARD */

    drawBoard();

}, 500, coordinates, direction, path)

/* EVENT LISTENERS */

document.addEventListener('keydown', (event) => {

    if (event.key === 'ArrowDown' && direction.axis !== 'y') {
        direction.axis = 'y';
        path.direction = 'down';
    } else if (event.key === 'ArrowUp' && direction.axis !== 'y') {
        direction.axis = 'y';
        path.direction = 'up';
    } else if (event.key === 'ArrowRight' && direction.axis !== 'x') {
        direction.axis = 'x';
        path.direction = 'right';
    } else if (event.key === 'ArrowLeft' && direction.axis !== 'x') {
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

    ctx.fillRect(100, 80, 20, 20);
    ctx.fillRect(140, 80, 20, 20);
    ctx.fillRect(100, 100, 20, 20);
    ctx.fillRect(100, 120, 20, 20);
    ctx.fillRect(120, 120, 20, 20);
    ctx.fillRect(140, 120, 20, 20);
    ctx.fillRect(140, 100, 20, 20);
    ctx.fillRect(120, 140, 20, 20);
    ctx.fillRect(120, 160, 20, 20);
    ctx.fillRect(180, 160, 20, 20);
    ctx.fillRect(220, 160, 20, 20);

    /* O */

    ctx.fillRect(180, 80, 20, 20);
    ctx.fillRect(220, 140, 20, 20);
    ctx.fillRect(220, 80, 20, 20);
    ctx.fillRect(180, 140, 20, 20);
    ctx.fillRect(180, 120, 20, 20);
    ctx.fillRect(180, 100, 20, 20);
    ctx.fillRect(200, 80, 20, 20);
    ctx.fillRect(200, 160, 20, 20);
    ctx.fillRect(220, 140, 20, 20);
    ctx.fillRect(220, 100, 20, 20);
    ctx.fillRect(220, 120, 20, 20);

    /* U */

    ctx.fillRect(260, 80, 20, 20);
    ctx.fillRect(300, 80, 20, 20);
    ctx.fillRect(260, 100, 20, 20);
    ctx.fillRect(260, 120, 20, 20);
    ctx.fillRect(260, 160, 20, 20);
    ctx.fillRect(280, 160, 20, 20);
    ctx.fillRect(300, 160, 20, 20);
    ctx.fillRect(300, 100, 20, 20);
    ctx.fillRect(300, 120, 20, 20);
    ctx.fillRect(300, 140, 20, 20);
    ctx.fillRect(260, 140, 20, 20);
    

    /* L */

    ctx.fillRect(60, 200, 20, 20);
    ctx.fillRect(60, 220, 20, 20);
    ctx.fillRect(60, 240, 20, 20);
    ctx.fillRect(60, 260, 20, 20);
    ctx.fillRect(60, 280, 20, 20);
    ctx.fillRect(80, 280, 20, 20);
    ctx.fillRect(100, 280, 20, 20);

    /* 0 #2 */

    ctx.fillRect(140, 200, 20, 20);
    ctx.fillRect(140, 220, 20, 20);
    ctx.fillRect(140, 240, 20, 20);
    ctx.fillRect(140, 260, 20, 20);
    ctx.fillRect(140, 280, 20, 20);
    ctx.fillRect(180, 200, 20, 20);
    ctx.fillRect(160, 200, 20, 20);
    ctx.fillRect(180, 220, 20, 20);
    ctx.fillRect(180, 240, 20, 20);
    ctx.fillRect(180, 260, 20, 20);
    ctx.fillRect(180, 280, 20, 20);
    ctx.fillRect(160, 280, 20, 20);

    /* S */

    ctx.fillRect(220, 200, 20, 20);
    ctx.fillRect(240, 200, 20, 20);
    ctx.fillRect(260, 200, 20, 20);
    ctx.fillRect(220, 220, 20, 20);
    ctx.fillRect(220, 240, 20, 20);
    ctx.fillRect(240, 240, 20, 20);
    ctx.fillRect(260, 240, 20, 20);
    ctx.fillRect(260, 260, 20, 20);
    ctx.fillRect(260, 280, 20, 20);
    ctx.fillRect(240, 280, 20, 20);
    ctx.fillRect(220, 280, 20, 20);

    /* E */

    ctx.fillRect(300, 200, 20, 20);
    ctx.fillRect(320, 200, 20, 20);
    ctx.fillRect(340, 200, 20, 20);
    ctx.fillRect(300, 220, 20, 20);
    ctx.fillRect(300, 240, 20, 20);
    ctx.fillRect(320, 240, 20, 20);
    ctx.fillRect(340, 240, 20, 20);
    ctx.fillRect(300, 260, 20, 20);
    ctx.fillRect(300, 280, 20, 20);
    ctx.fillRect(320, 280, 20, 20);
    ctx.fillRect(340, 280, 20, 20);

}

