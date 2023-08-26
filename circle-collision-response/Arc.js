import Vector from "./Vector.js";

export default class Arc {
    constructor(
        _ = {
            x: undefined,
            y: undefined,
            r: 10,
            fill: "black",
        }
    ) {
        this.pos = new Vector(_.x, _.y);
        this.r = _.r;
        this.fill = _.fill;
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
}
