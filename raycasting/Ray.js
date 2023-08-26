export default class Ray {
    constructor(_pos, _angle) {
        this.pos = _pos;
        this.dir = { x: Math.cos(_angle), y: Math.sin(_angle) };
        this.strokeStyle = "#1aa";
    }

    createVector(_x, _y) {
        return { x: _x, y: _y };
    }

    lookAt(_x, _y) {
        this.dir.x = _x - this.pos.x;
        this.dir.y = _y - this.pos.y;
    }

    show(_ctx) {
        _ctx.save();
        _ctx.translate(this.pos.x, this.pos.y);
        _ctx.strokeStyle = this.strokeStyle;
        _ctx.beginPath();
        _ctx.moveTo(0, 0);
        _ctx.lineTo(this.dir.x * 20, this.dir.y * 20);
        _ctx.closePath();
        _ctx.stroke();
        _ctx.restore();
    }

    cast(_wall) {
        const x1 = _wall.a.x;
        const y1 = _wall.a.y;
        const x2 = _wall.b.x;
        const y2 = _wall.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den === 0) return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            const pt = this.createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else return;
    }
}
