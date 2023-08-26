export default class FillRect {
    constructor(
        _ = {
            x: undefined,
            y: undefined,
            w: 10,
            h: 10,
            fill: "black",
        }
    ) {
        this.pos = {
            x: _.x,
            y: _.y,
        };
        this.dim = {
            w: _.w,
            h: _.h,
        };
        this.velocity = {
            x: 1,
            y: 2,
            gravity: 0.2,
            xfriction: 0.001,
            yfriction: 0.1,
        };
        this.transform = { x: this.pos.x, y: this.pos.y };
        // rotation
        this.rotation = 0;
        this.speed = 0;
        this.bSpeed = 0.02;
        this.rSpeed = 0.02;
        this.mSpeed = -0.02;
        this.maxSpeed = 0.5;
        this.fill = _.fill;

        this.isAI = false;
        this.ai = {
            datas: {
                /* Data learned */
            },
        };
    }

    draw(_) {
        if (this.rotation > Math.PI * 2 || this.rotation < -(Math.PI * 2))
            this.rotation = 0;
        this.pos = this.transform;
        _.fillStyle = this.fill;
        _.save();
        _.translate(this.transform.x, this.transform.y);
        _.rotate(this.rotation);
        _.fillRect(0, 0, this.dim.w, this.dim.h);
        if (Math.abs(this.speed) > 0.1) {
            _.font = "22px bold monospace";
            _.fillText("🤢", this.dim.w * 0.5 - 14, this.dim.h * 0.5 + 7);
        }
        _.restore();
        _.lineWidth = 0.5;
        _.strokeRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
    }

    setDim(_w, _h) {
        this.dim.w = _w;
        this.dim.h = _h;
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }

    rotateRight() {
        this.rotation += 0.1;
    }
}
