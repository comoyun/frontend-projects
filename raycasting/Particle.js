import Ray from "./Ray.js";

export default class Particle {
    constructor() {
        this.rays = [];
        this.pos = this.createVector(innerWidth * 0.5, innerHeight * 0.5);
        for (let i = 0; i < 360; i += 3) {
            this.rays.push(new Ray(this.pos, (i * Math.PI) / 180));
        }
    }

    createVector(_x, _y) {
        return { x: _x, y: _y };
    }

    show(_ctx) {
        _ctx.fillStyle = "#1aa";
        _ctx.beginPath();
        _ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2, false);
        _ctx.closePath();
        _ctx.fill();
        for (let i of this.rays) {
            i.show(_ctx);
        }
    }

    update(_mouse) {
        this.pos.x = _mouse.x;
        this.pos.y = _mouse.y;
    }

    look(_walls, _ctx) {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (const _wall of _walls) {
                const pt = ray.cast(_wall);
                if (pt) {
                    const d = Math.sqrt(
                        (this.pos.x - pt.x) ** 2 + (this.pos.y - pt.y) ** 2
                    );
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                _ctx.strokeStyle = "#1aa";
                _ctx.beginPath();
                _ctx.moveTo(this.pos.x, this.pos.y);
                _ctx.lineTo(closest.x, closest.y);
                _ctx.closePath();
                _ctx.stroke();
            }
        }
    }
}
