/* CREATE CANVAS */
let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d"); 
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

/* SNAKE COORDINATES */

let coordinates = { x: -20, y: 0 };
let direction = {axis: 'x'};
let path = {direction: 'right'};





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

