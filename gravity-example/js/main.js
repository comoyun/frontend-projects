//gmObj
import * as Objects from "./game_objects.js";

var GAME_SCENE, GAME_WIDTH, GAME_HEIGHT, GCENTER_X, GCENTER_Y, ctx;

var ball,
    ballArray,
    ballsNumber,
    text,
    GlobalText,
    BALL_NUMBERS,
    font_size,
    colors,
    rect, rectArray = [], textArray = [];

//SETUP
const checked = document.querySelector("#checkbox");
ballsNumber = prompt("input length of balls (only number):", " length here");
GAME_SCENE = document.querySelector("#canvas");
GAME_SCENE.width = window.innerWidth;
GAME_SCENE.height = window.innerHeight;
GAME_WIDTH = GAME_SCENE.width;
GAME_HEIGHT = GAME_SCENE.height;
GCENTER_X = GAME_WIDTH / 2;
GCENTER_Y = GAME_HEIGHT / 2;
ctx = GAME_SCENE.getContext("2d");

font_size = 15;
ball = new Objects.Ball(GCENTER_X, GCENTER_Y, 15, "white");
GlobalText =
    "FPS:" +
    Math.floor(1000 / 60) +
    " XFRICTION: " +
    ball.yfriction +
    " YFRICTION: " +
    ball.xfriction +
    " XSPEED: " +
    ball.vx +
    " YSPEED: " +
    ball.vy;

ballArray = [];

colors = [
    "#4AB8A1",
    " #78C123",
    "#1C8A73",
    " #2BD4D9",
    " #536FD5",
    "#EA91E5",
    "#76BCF8",
];

BALL_NUMBERS = 3;
rect = new Objects.Rect(GCENTER_X, GCENTER_Y, 100, 100, "cyan");
rectArray = [];
text = new Objects.Text(
    "DEFAULT",
    font_size + "px bolder header",
    GCENTER_X,
    GCENTER_Y,
    "white"
);
textArray = [];

createBalls();

function createBalls(x, y) {
    if (ballsNumber != 0 || ballsNumber != undefined || ballsNumber != null) {
        for (var num = 0; num <= BALL_NUMBERS; num++) {
            var randomCol = randomColors(colors);
            var randomRadius = random(5, 15);
            var xrandom = x;
            var yrandom = y;

            var balls = new Objects.Ball(
                xrandom,
                yrandom,
                randomRadius,
                randomCol
            );

            balls.vx = random(-3, 3);
            balls.vy = random(2, 5);
            ball.xfriction = random(0.2, 0.5);
            ball.yfriction = random(0.2, 0.5);
            if (ballArray.length <= ballsNumber) {
                ballArray.push(balls);
            } else {
                GlobalText = "cannot create balls.";
                setTimeout(function () {
                    GlobalText = "Refresh the page to start again.";
                }, 3000);
            }
        }
    } else {
        GlobalText =
            "undefined number please resfresh the page and try it again";
    }
}

draw();

function draw() {
    if (checked.checked) {
        ctx.fillStyle = "rgba(0, 0, 50, 0.3)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    } else {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }
    update();
    requestAnimationFrame(draw);
}

function update() {
    updateAllObjects();
    updateUI();
}

function updateUI() {
    text.x = 10;
    text.y = 20;
    text.font = "11px bolder monospace";
    text.text = GlobalText;
    text.update();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomColors(colorss) {
    return colors[Math.floor(Math.random() * colorss.length)];
}

function updateAllObjects() {
    updateBalls();
}

function getDistance(obj1, obj2) {
    var xdist = obj1.x - obj2.x;
    var ydist = obj1.y - obj2.y;
    return Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
}

function updateBalls() {
    if (ballArray.length != 0) {
        GlobalText = "Balls:" + ballsNumber + "/" + ballArray.length;
        ballArray.forEach((col, colIndex) => {
            col.xfriction = 0.4;
            col.yfriction = 0.8;
            col.vy += col.gr;
            col.x += col.vx;
            col.y += col.vy;

            if (col.x + col.r >= GAME_WIDTH || col.x <= 0 + col.r) {
                col.vx = -col.vx * col.xfriction;
            } else if (col.y + col.r >= GAME_HEIGHT || col.y <= 0 + col.r) {
                col.vy = -col.vy * col.yfriction;
            } else {
                //DO NOTHING
            }

            if (col.y + col.r >= GAME_HEIGHT) {
                col.y = GAME_HEIGHT - col.r;
            }
            if (col.x + col.r >= GAME_WIDTH) {
                col.x = GAME_WIDTH - col.r;
            }
            if (col.x <= 0 + col.r) {
                col.x = 0 + col.r;
            }

            col.update();
        });
    } else {
        console.log("cannot create balls!! length 0");
    }
}

GAME_SCENE.onmousemove = function (event) {
    var x = event.clientX - GAME_SCENE.getBoundingClientRect().left;
    var y = event.clientY - GAME_SCENE.getBoundingClientRect().top;
    createBalls(x, y);
};

GAME_SCENE.onmousedown = function (event) {
    var x = event.clientX - GAME_SCENE.getBoundingClientRect().left;
    var y = event.clientY - GAME_SCENE.getBoundingClientRect().top;
    createBalls(x, y);
};

GAME_SCENE.ontouchmove = function (event) {
    var x = event.touches[0].clientX - GAME_SCENE.getBoundingClientRect().left;
    var y = event.touches[0].clientY - GAME_SCENE.getBoundingClientRect().top;
    createBalls(x, y);
};

GAME_SCENE.ontouchstart = function (event) {
    var x = event.touches[0].clientX - GAME_SCENE.getBoundingClientRect().left;
    var y = event.touches[0].clientY - GAME_SCENE.getBoundingClientRect().top;
    createBalls(x, y);
};

window.onresize = function () {
    GAME_SCENE.width = window.innerWidth;
    GAME_SCENE.height = window.innerHeight;
    createBalls();
};

export { ctx };
