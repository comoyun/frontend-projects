export default class Vector {
    constructor(_x = 0, _y = 0) {
        this.x = _x;
        this.y = _y;
    }

    distance(_v1, _v2) {
        return Math.sqrt((_v1.x - _v2.x) ** 2 + (_v1.y - _v2.y) ** 2);
    }

    normalize() {
        this.__computeMagnitude();
        this.x /= this.magnitude;
        this.y /= this.magnitude;
        return this;
    }

    normalizeDC() {
        let dist = Math.sqrt(this.x * this.x + this.y * this.y);
        return { x: this.x / dist, y: this.y / dist };
    }

    scale(_scalar) {
        this.x *= _scalar;
        this.y *= _scalar;
        return this;
    }

    subtract(_val) {
        this.x -= _val;
        this.y -= _val;
        return this;
    }

    add(_val) {
        this.x += _val;
        this.y += _val;
        return this;
    }

    show(_ctx) {
        _ctx.save();
        _ctx.translate(this.x, this.y);
        _ctx.strokeStyle = "white";
        _ctx.lineWidth = 2;
        _ctx.beginPath();
        _ctx.moveTo(0, 0);
        _ctx.lineTo(this.x, this.y);
        _ctx.closePath();
        _ctx.stroke();
        _ctx.restore();
    }

    subtr(_) {
        this.x = this.x - _.x;
        this.y = this.y - _.y;
        return this;
    }

    add_o(_) {
        this.x = this.x + _.x;
        this.y = this.y + _.y;
        return this;
    }

    __computeMagnitude() {
        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
