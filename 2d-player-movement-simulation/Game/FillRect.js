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
        this.groundY = 0;
        this.pos = {
            x: _.x,
            y: _.y,
        };
        this.dim = {
            w: _.w,
            h: _.h,
        };
        this.velocity = {
            x: 0,
            y: 0,
            gravity: 0.2,
            xfriction: 0.05,
            yfriction: 0.25,
        };
        this.speeding = false;
        this.rotation = 0;
        this.fill = _.fill;

        this.isAI = false;
        this.ai = {
            datas: {
                /* Data learned */
            },
        };
    }

    draw(_) {
        if (this.speeding) {
            _.strokeStyle = "gold";
            _.lineWidth = 3;
            _.strokeRect(
                this.pos.x - 3,
                this.pos.y - 3,
                this.dim.w + 3,
                this.dim.h + 3
            );
            if (!this.onGround()) {
                _.strokeStyle = "gold";
                _.lineWidth = 7;
                _.beginPath();

                if (
                    this.velocity.x > 0 &&
                    this.velocity.y < this.velocity.yfriction
                ) {
                    _.moveTo(this.pos.x, this.pos.y + this.dim.h);
                    _.lineTo(this.pos.x - 10, this.pos.y + this.dim.h + 20);
                    _.closePath();
                    _.stroke();
                    _.moveTo(this.pos.x + this.dim.w, this.pos.y + this.dim.h);
                    _.lineTo(
                        this.pos.x + this.dim.w - 10,
                        this.pos.y + this.dim.h + 20
                    );
                } else {
                    if (this.velocity.x > 0) {
                        _.moveTo(this.pos.x, this.pos.y);
                        _.lineTo(this.pos.x - 10, this.pos.y - 20);
                        _.closePath();
                        _.stroke();
                        _.moveTo(this.pos.x + this.dim.w, this.pos.y);
                        _.lineTo(this.pos.x + this.dim.w - 10, this.pos.y - 20);
                    } else {
                        if (this.velocity.y < this.velocity.yfriction) {
                            _.moveTo(this.pos.x, this.pos.y + this.dim.h);
                            _.lineTo(
                                this.pos.x + 10,
                                this.pos.y + this.dim.h + 20
                            );
                            _.closePath();
                            _.stroke();
                            _.moveTo(
                                this.pos.x + this.dim.w,
                                this.pos.y + this.dim.h
                            );
                            _.lineTo(
                                this.pos.x + this.dim.w + 10,
                                this.pos.y + this.dim.h + 20
                            );
                        } else {
                            _.moveTo(this.pos.x, this.pos.y);
                            _.lineTo(this.pos.x + 10, this.pos.y - 20);
                            _.closePath();
                            _.stroke();
                            _.moveTo(this.pos.x + this.dim.w, this.pos.y);
                            _.lineTo(
                                this.pos.x + this.dim.w + 10,
                                this.pos.y - 20
                            );
                        }
                    }
                }

                _.closePath();
                _.stroke();
            }
        }
        _.fillStyle = this.fill;
        _.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
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

    setGround(_obj, _offsetX) {
        this.pos.y = _obj.pos.y - this.dim.h - 150;
        this.pos.x = _offsetX || 20;
        this.groundY = _obj.pos.y - this.dim.h;
    }

    collideGround() {
        return this.pos.y + this.dim.h >= this.groundY;
    }

    onGround() {
        return this.pos.y == this.groundY;
    }

    isStill() {
        return this.velocity.x + this.velocity.y == 0;
    }

    getCenter() {
        return this.pos.x + this.dim.w * 0.5;
    }

    isStillX() {
        return this.velocity.x == 0;
    }
}
