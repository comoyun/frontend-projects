import Game from "./Game.js";

export default class Arc {
    constructor(
        _ = {
            x: undefined,
            y: undefined,
            r: 10,
            fill: "black",
        }
    ) {
        this.pos = {
            x: _.x,
            y: _.y,
        };
        this.r = _.r;
        this.rotation = 0;
        this.savedX = 0;
        this.savedY = 0;
        this.savedR = 0;
        this.vx = Game.getRandom(-0.5, 0.5);
        this.vy = Game.getRandom(-0.5, 0.5);
        this.fill = _.fill;
        this.velocity = {
            x: 2,
            y: 2,
            gravity: 0.2,
            friction: 0.8,
        };
    }

    draw(_) {
        _.fillStyle = this.fill;
        _.beginPath();
        _.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
        _.closePath();
        _.fill();
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }

    update(_) {
        this.draw(_);
        if (Game.GetDistance(this, Game.Mouse) < 25) {
            this.pos.x -= this.vx;
            this.pos.y -= this.vy;
            if(this.r < 20) this.r += 0.5;
            return;
        }
        if (this.r != this.savedR)
            this.r -= (this.r - this.savedR) / 30;
        if (this.pos.x != this.savedX)
            this.pos.x += (this.savedX - this.pos.x) / 30;
        if (this.pos.y != this.savedy)
            this.pos.y += (this.savedY - this.pos.y) / 30;
    }
}
