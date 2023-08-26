import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });
let birds = [],
    missed = 0;

c.setSize(true);

function Circle() {
    this.x = 0;
    this.y = 0;
    this.inc = 0;
    this.p = 0.025;
    this.place = function () {
        c.ctx.shadowBlur = 10;
        c.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        c.ctx.fillStyle = "white";
        c.ctx.strokeStyle = "#1aa";
        c.ctx.lineWidth = 2;
        c.ctx.beginPath();
        c.ctx.arc(this.x, this.y, 20, 0, Math.PI * 2, true);
        c.ctx.closePath();
        c.ctx.fill();
        c.ctx.stroke();

        c.ctx.shadowBlur = 0;
        c.ctx.fillStyle = "#144";
        c.ctx.beginPath();
        c.ctx.arc(this.x - 10, this.y, 10, 0, Math.PI * 2, true);
        c.ctx.closePath();
        c.ctx.fill();
        c.ctx.stroke();

        let dx = Math.atan2(c.Mouse.y - this.y, c.Mouse.x - this.x);

        c.ctx.fillStyle = "white";
        c.ctx.beginPath();
        c.ctx.arc(
            this.x - 10 + Math.cos(dx) * 4,
            this.y + Math.sin(dx) * 4,
            2.5,
            0,
            Math.PI * 2,
            true
        );
        c.ctx.closePath();
        c.ctx.fill();
        c.ctx.stroke();
    };
    this.update = function () {
        this.place();
        this.inc += this.p;
        this.y = this.savedY + Math.sin(this.inc) * 50;
        this.x -= this.speed;
        if (this.x < -20) missed++, (this.x = c.width + 20);
    };
}

for (let i = 0; i < 30; i++) {
    const bird = new Circle();
    bird.x = getRandom(window.innerWidth, window.innerWidth * 3);
    bird.y = getRandom(window.innerHeight);
    bird.savedY = getRandom(window.innerHeight);
    bird.p = Math.random() * 0.05;
    bird.speed = getRandom(1, 3);
    birds.push(bird);
}

c.animate(() => {
    c.ctx.font = "15px normal, Verdana";
    c.ctx.textAlign = "left";
    c.ctx.fillText("Missed: " + missed, 20, 30);

    if (birds.length == 0) {
        c.ctx.font = "50px normal, Verdana";
        c.ctx.textAlign = "center";
        c.ctx.fillText("YOU WIN", c.centerX, c.centerY);
        c.ctx.font = "20px normal, Verdana";
        c.ctx.fillText("wanna play again? refresh the page", c.centerX, c.centerY + 50);
    }
    
    birds.forEach(_ => _.update());
    
    birds = birds.filter(_ => {
        if (c.Mouse.active && getDistance(c.Mouse, _) < 20) {
            return false;
        }

        return true;
    });
});

function getDistance(_1, _2) {
    return Math.sqrt((_1.fx - _2.x) ** 2 + (_1.fy - _2.y) ** 2);
}

function getRandom(_min, _max) {
    return _max
        ? Math.floor(Math.random() * (_max - _min) + _min)
        : Math.floor(Math.random() * _min);
}
