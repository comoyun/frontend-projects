
class Shape {
    constructor({
        x = 0,
        y = 0,
        radius = 100,
        width = 100,
        height = 100,
        fillColor = "black",
    }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.width = width;
        this.height = height;
        this.frictionY = 0.2;
        this.vy = 3;
        this.vx = 2;
        this.fillColor = fillColor;
    }

    getRight() {
        return this.x + this.width;
    }

    getBottom() {
        return this.y + this.height;
    }

    getCentreX() {
        return this.x + this.width * 0.5;
    }

    getCentreY() {
        return this.y + this.height * 0.5;
    }
}

class Circle extends Shape {
    constructor(_) {
        super(_);
    }

    draw(_ctx) {
        _ctx.fillStyle = this.fillColor;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        _ctx.closePath();
        _ctx.fill();
    }

    circumference() {
        return Math.PI * 2 * this.radius;
    }
}

const stage = document.getElementById("stage"),
    ctx = stage.getContext("2d");

stage.width = innerWidth;
stage.height = innerHeight;

const { width, height } = stage;

const Rect = function (_x, _y) {
    this.x = _x;
    this.y = _y;
    this.width = width;
    this.height = 50;
    this.fill = "#ccc";
    this.draw = function () {
        ctx.fillStyle = this.fill;
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    };
};

const ground = new Rect(0, height - 50);

const obstacleLeft = new Rect(0, ground.y - height * 0.6);
obstacleLeft.width = 60;
obstacleLeft.height = height * 0.6;
obstacleLeft.fill = "#eee";

const obstacleRight = new Rect(width - 60, ground.y - height * 0.6);
obstacleRight.width = 60;
obstacleRight.height = height * 0.6;
obstacleRight.fill = "#eee";

const ball = new Circle({
    x: width * 0.5,
    y: height * 0.5,
    radius: 25,
    fillColor: "#488",
});

loop();
function loop() {
    ctx.clearRect(0, 0, width, height);

    ball.draw(ctx);

    ball.vy += ball.frictionY;
    ball.y += ball.vy;

    if (ball.y + ball.radius + 2 >= ground.y)
        ball.y = ground.y - ball.radius - 2;

    if (ball.y + ball.radius + 2 >= ground.y) {
        ball.vy = ball.vy * -0.5;
    }

    ground.draw();
    obstacleLeft.draw();
    obstacleRight.draw();

    requestAnimationFrame(loop);
}

