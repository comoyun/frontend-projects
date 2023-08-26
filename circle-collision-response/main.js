import Arc from "./Arc.js";
import Canvas2D from "./Canvas2D.js";
import Vector from "./Vector.js";

const stage = new Canvas2D({ clearCanvas: true });
const vector = new Vector(0, 0);

const circ1 = new Arc({
    x: stage.centerX,
    y: stage.centerY,
    r: 30,
    fill: "white",
});

const circ2 = new Arc({
    x: stage.Mouse.x,
    y: stage.Mouse.y,
    r: 40,
    fill: "#188",
});

let d = 0;

stage.animate(() => {
    circ2.pos = stage.Mouse;

    circ1.draw(stage.ctx);
    circ2.draw(stage.ctx);

    if (vector.distance(circ1.pos, circ2.pos) < circ1.r + circ2.r) {
        let dist = circ1.pos.subtr(circ2.pos);
        dist.__computeMagnitude();
        let pen_depth = circ1.r + circ2.r - dist.magnitude;
        let pen_res = dist.normalize().scale(pen_depth / 2);
        circ1.pos = circ1.pos.add_o(pen_res.scale(-1));
    }
});
