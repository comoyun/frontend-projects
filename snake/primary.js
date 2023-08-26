const c = new Canvas2D({ resetFrame: true });
let grid = [],
    food = [],
    snake = [
        {
            x: 2,
            y: 0,
        },
        {
            x: 1,
            y: 0,
        },
        {
            x: 0,
            y: 0,
        },
    ],
    movingDown = false,
    movingLeft = false,
    movingRight = false,
    movingUp = false,
    score = document.getElementById("score"),
    gridEl = document.getElementById("grid"),
    sre = 3,
    end = false,
    frame = 0;

c.setSize(300, 300);

const block_size = 300 / 20;

function rect(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.place = function () {
        c.ctx.strokeStyle = "#1aa";
        c.ctx.beginPath();
        c.ctx.rect(this.x, this.y, block_size, block_size);
        c.ctx.closePath();
        c.ctx.stroke();
    };
}

function reset() {
    movingDown = false;
    movingLeft = false;
    movingRight = false;
    movingUp = false;
}

function createGrid() {
    grid = [];
    for (let i = 0; i < 300; i += block_size) {
        grid[i] = [];
        for (let j = 0; j < 300; j += block_size) {
            grid[i][j] = new rect(i, j);
        }
    }
}

function showGrid() {
    grid.forEach(_ => _.forEach(__ => __.place()));
}

function FillRect(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.fill = "#ff1";
    this.place = function () {
        c.ctx.fillStyle = this.fill;
        c.ctx.fillRect(this.x, this.y, block_size, block_size);
    };
}

function placeFood(_ = 0) {
    let rX =
        Math.round((Math.random() * c.canvas.width) / block_size) *
        block_size,
        rY =
            Math.round((Math.random() * c.canvas.height) / block_size) *
            block_size;

    if (rX === c.canvas.width) rX -= block_size;
    if (rY === c.canvas.height) rY -= block_size;

    food.push((new FillRect(rX, rY)));
}

function drawSnake() {
    snake.forEach((_, _i) => {
        c.ctx.shadowBlur = 20;
        c.ctx.shadowColor = "#1aa";
        c.ctx.fillStyle = "#188";
        c.ctx.fillRect(
            _.x * block_size,
            _.y * block_size,
            block_size,
            block_size
        );
        c.ctx.strokeRect(
            _.x * block_size,
            _.y * block_size,
            block_size,
            block_size
        );
        if (_i == 0) {
            c.ctx.fillStyle = "white";

            if (movingRight) {
                c.ctx.fillRect(
                    _.x * block_size + block_size * 0.6,
                    _.y * block_size + 1,
                    block_size * 0.4,
                    block_size * 0.4
                );
                c.ctx.fillRect(
                    _.x * block_size + block_size * 0.6,
                    _.y * block_size + 8,
                    block_size * 0.4,
                    block_size * 0.4
                );
            }
            if (movingLeft) {
                c.ctx.fillRect(
                    _.x * block_size,
                    _.y * block_size + 1,
                    block_size * 0.4,
                    block_size * 0.4
                );
                c.ctx.fillRect(
                    _.x * block_size,
                    _.y * block_size + 8,
                    block_size * 0.4,
                    block_size * 0.4
                );
            }
            if (movingDown) {
                c.ctx.fillRect(
                    _.x * block_size,
                    _.y * block_size + block_size * 0.5,
                    block_size * 0.4,
                    block_size * 0.4
                );
                c.ctx.fillRect(
                    _.x * block_size + block_size * 0.6,
                    _.y * block_size + block_size * 0.5,
                    block_size * 0.4,
                    block_size * 0.4
                );
            }
            if (movingUp) {
                c.ctx.fillRect(
                    _.x * block_size,
                    _.y * block_size,
                    block_size * 0.4,
                    block_size * 0.4
                );
                c.ctx.fillRect(
                    _.x * block_size + block_size * 0.5,
                    _.y * block_size,
                    block_size * 0.4,
                    block_size * 0.4
                );
            }
        }
    });

    if (movingRight) {
        snake.unshift({
            x: snake[0].x + 1,
            y: snake[0].y,
        });
        snake.pop();
    }
    if (movingDown) {
        snake.unshift({
            x: snake[0].x,
            y: snake[0].y + 1,
        });
        snake.pop();
    }
    if (movingUp) {
        snake.unshift({
            x: snake[0].x,
            y: snake[0].y - 1,
        });
        snake.pop();
    }
    if (movingLeft) {
        snake.unshift({
            x: snake[0].x - 1,
            y: snake[0].y,
        });
        snake.pop();
    }

    if (
        snake[0].x < 0 ||
        snake[0].x > c.canvas.width / block_size - 1 ||
        snake[0].y < 0 ||
        snake[0].y > c.canvas.height / block_size - 1
    ) {
        end = true;
    }

    collideSnake();
}

function collideSnake() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) end = true;
    }
}

createGrid();

placeFood();

c.animate(() => {
    if (frame++ % 5 !== 0) return;

    c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

    if (end) {
        c.ctx.font = "30px normal monospace";
        c.ctx.textAlign = "center";

        c.ctx.fillText(
            "GAME OVER",
            c.canvas.width * 0.5,
            c.canvas.height * 0.5
        );

        c.ctx.font = "15px normal monospace";
        c.ctx.textAlign = "center";
        c.ctx.fillText(
            "Double click on canvas to restart",
            c.canvas.width * 0.5,
            c.canvas.height * 0.6
        );
        return;
    }

    if (gridEl.checked) showGrid();

    score.innerText = sre;

    food.forEach((_, _index) => {
        c.ctx.shadowBlur = 20;
        c.ctx.shadowColor = "#ff0";
        _.place();
        if (
            snake[0].x * block_size === _.x &&
            snake[0].y * block_size === _.y
        ) {
            food.splice(_index, 1);
            placeFood();
            snake.push({
                x: snake[0].x,
                y: snake[0].y,
            });
            sre += 1;
        }
    });

    drawSnake();

    if (c.Keyboard.arrows.right && !movingLeft) {
        reset();
        movingRight = true;
    }
    if (c.Keyboard.arrows.left && !movingRight) {
        reset();
        movingLeft = true;
    }
    if (c.Keyboard.arrows.down && !movingUp) {
        reset();
        movingDown = true;
    }
    if (c.Keyboard.arrows.up && !movingDown) {
        reset();
        movingUp = true;
    }

});

c.canvas.oncontextmenu = _ => _.preventDefault();
c.canvas.ondblclick = () => document.location.reload();
