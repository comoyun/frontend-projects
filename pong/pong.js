const scene = document.getElementById("game-scene"),
    ctx = scene.getContext("2d"),
    paddles = [],
    mouse = {
        position: {
            x: 20,
            y: innerWidth * 0.5,
        },
        active: false
    },
    overlay = {
        opacity: 0
    },
    mouse2 = {
        position: {
            x: 20,
            y: innerHeight * 0.5
        }
    };

let userPaddle,
    computerPaddle,
    ball,
    centerX,
    centerY,
    gameEnd = false,
    winner,
    animationId = 0,
    speed = 0.5;

const scale = (_value, _inMin, _inMax, _outMin, _outMax) => {
    return (_value - _inMin) * (_outMax - _outMin) / (_inMax - _inMin) + _outMin;
}

const Paddle = function ({ position, color }) {
    this.width = 25;
    this.height = 90;
    this.position = position;
    this.color = color;
    this.diffY = 0;
    this.draw = () => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    this.followMouse = _mouse => {
        this.diffY = this.position.y - _mouse.position.y + this.height * 0.5;
        this.position.y -= this.diffY / 10;
    };
    this.placeInCorrectYAxis = (_currentY) => {
        this.position.y = clamp(0, scene.height - this.height, _currentY);
    };
    this.handleMovement = () => {
        this.diffY = this.position.y - ball.position.y + this.height * 0.5;
        this.position.y -= this.diffY / 20;
        this.placeInCorrectYAxis(this.position.y);
    };
};

const clamp = function (_min, _max, _value) {
    return Math.max(Math.min(_max, _value), _min);
};

const Ball = function ({ position, color, radius }) {
    this.radius = radius;
    this.position = position;
    this.color = color;
    this.velocity = {
        x: -2,
        y: 2
    };
    this.draw = () => {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    };

    this.update = () => {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.resolveWallCollision();
        this.resolveCollision();
        this.checkIfOut();
    };

    this.resolveWallCollision = () => {
        if (this.position.y + this.radius >= scene.height ||
            this.position.y - this.radius <= 0) {
            this.velocity.y = -this.velocity.y;
        }
    };

    this.checkIfOut = () => {
        if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= scene.width && !gameEnd) {
            gameEnd = true;
            winner = this.velocity.x > 0 ? "Player" : "Computer";
            gsap.to(overlay, {
                opacity: 1
            });
        }
    };

    this.getDistance = (_object) => {
        const diffX = this.position.x - _object.position.x;
        const diffY = this.position.y - _object.position.y;
        return Math.sqrt(diffX ** 2 + diffY ** 2);
    };

    this.resolveCollision = () => {
        paddles.forEach(_paddle => {
            const x = clamp(_paddle.position.x, _paddle.position.x + _paddle.width, this.position.x);
            const y = clamp(_paddle.position.y, _paddle.position.y + _paddle.height, this.position.y);

            if (this.getDistance({
                position: { x, y }
            }) <= this.radius) {
                if (this.velocity.x > 0 && !(x > _paddle.position.x)) {
                    this.position.x = _paddle.position.x - this.radius;
                    this.velocity.x = -this.velocity.x;
                } else if (this.velocity.x < 0 && !(x < _paddle.position.x + _paddle.width)) {
                    this.position.x = _paddle.position.x + _paddle.width + this.radius;
                    this.velocity.x = -this.velocity.x;
                } else if (this.velocity.y < 0 && y - this.velocity.y - this.radius <= _paddle.position.y + _paddle.height) {
                    this.position.y = _paddle.position.y + _paddle.height + this.radius + 1;
                    this.velocity.y = -this.velocity.y;
                } else if (this.velocity.y > 0 && y + this.velocity.y + this.radius >= _paddle.position.y) {
                    this.position.y = _paddle.position.y - this.radius - this.velocity.y - 1;
                    this.velocity.y = -this.velocity.y;
                }
                if (ball.velocity.x < 0) ball.velocity.x -= speed;
                else ball.velocity.x += speed;
            }
        });
    };
};

const coverWindow = () => {
    centerX = (scene.width = innerWidth) * 0.5;
    centerY = (scene.height = innerHeight) * 0.5;
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, scene.width, scene.height);
};

const displayGameOver = () => {
    ctx.save();
    ctx.globalAlpha = overlay.opacity;
    ctx.fillStyle = "#144";
    ctx.fillRect(0, 0, scene.width, scene.height);
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.font = "bold 30px xyz, Verdana";
    ctx.fillText("Game Over!", centerX, centerY);
    ctx.fillStyle = "#e9e9e9";
    ctx.font = "normal 22px xyz, Verdana";
    ctx.fillText(`"${winner}" is the winner!`, centerX, centerY + 34);
    ctx.restore();
};

const animate = () => {
    animationId = requestAnimationFrame(animate);

    clearCanvas();

    mouse2.position.y = scale(clamp(scene.height * 0.3, scene.height * 0.7, mouse.position.y), scene.height * 0.3, scene.height * 0.7, userPaddle.height * 0.5, scene.height - userPaddle.height * 0.5);

    userPaddle.draw();

    userPaddle.followMouse(mouse2);

    computerPaddle.draw();

    computerPaddle.handleMovement();

    ball.update();

    displayGameOver();

    if (overlay.opacity > 0.95 && gameEnd) cancelAnimationFrame(animationId);

};

const init = () => {
    coverWindow();

    userPaddle = new Paddle({
        position: {
            x: 20,
            y: centerY
        },
        color: "#555"
    });

    computerPaddle = new Paddle({
        position: {
            x: scene.width - 40,
            y: centerY
        },
        color: "rgb(222, 77, 77)"
    });

    computerPaddle.position.y -= computerPaddle.height * 0.5;
    userPaddle.position.y -= userPaddle.height * 0.5;

    paddles.push(computerPaddle);
    paddles.push(userPaddle);

    ball = new Ball({
        position: {
            x: centerX,
            y: centerY
        },
        radius: 13,
        color: "#155"
    });

    animate();
};

const touchStart = _event => {
    mouse.position.x = _event.touches[0].clientX;
    mouse.position.y = _event.touches[0].clientY;
    mouse.active = true;
};

const touchMove = _event => {
    mouse.position.x = _event.touches[0].clientX;
    mouse.position.y = _event.touches[0].clientY;
};

const mouseDown = _event => {
    mouse.position.x = _event.clientX;
    mouse.position.y = _event.clientY;
    mouse.active = true;
};

const mouseMove = _event => {
    mouse.position.x = _event.clientX;
    mouse.position.y = _event.clientY;
};

const mouseUp = () => {
    mouse.active = false;
};

const touchEnd = () => {
    mouse.active = false;
};

/* Event Listeners */
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("touchstart", touchStart);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("touchmove", touchMove);
window.addEventListener("mousedown", mouseDown);
window.addEventListener("touchend", touchEnd);
window.addEventListener("mouseup", mouseUp);
