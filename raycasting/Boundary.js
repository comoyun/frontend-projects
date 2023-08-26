export default class Boundary {
    constructor(_x1, _y1, _x2, _y2) {
        this.a = this.createVector(_x1, _y1);
        this.b = this.createVector(_x2, _y2);
        this.strokeStyle = "#1aa";
    }

    createVector(_x, _y) {
        return { x: _x, y: _y };
    }

    show(_ctx) {
        _ctx.strokeStyle = this.strokeStyle;
        _ctx.beginPath();
        _ctx.moveTo(this.a.x, this.a.y);
        _ctx.lineTo(this.b.x, this.b.y);
        _ctx.closePath();
        _ctx.stroke();
    }
}
