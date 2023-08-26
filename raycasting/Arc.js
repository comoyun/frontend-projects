export default class Arc {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.radius = 10;
        this.fillStyle = "#1ff";
    }

    show(_ctx) {
        _ctx.fillStyle = this.fillStyle;
        _ctx.beginPath();
        _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        _ctx.closePath();
        _ctx.fill();
    }
}
