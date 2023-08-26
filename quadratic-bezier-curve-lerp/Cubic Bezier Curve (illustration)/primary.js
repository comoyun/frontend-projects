/* 
    Task: draw Quadratic Bezier Curve with Linear Interpolation Function (lerp)
*/

import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

c.setSize(true);

function lerp(_min, _max, _val) {
    return _val * (_max - _min) + _min;
}

let speed = 0.01,
    t = 0;

c.animate(() => {
    t += speed;

    if (t >= 1) speed *= -1;
    if (t <= 0) speed = 0.01;

    c.ctx.lineCap = "join";
    c.ctx.lineJoin = "join";
    c.ctx.strokeStyle = "#188";
    c.ctx.fillStyle = "#188";

    let x1 = lerp(c.centerX - 100, c.centerX - 100, t),
        y1 = lerp(c.centerY, c.Mouse.y, t),
        x2 = lerp(c.centerX + 100, c.centerX + 100, t),
        y2 = lerp(c.Mouse.y, c.centerY, t),
        x3 = lerp(c.centerX - 100, c.centerX + 100, t),
        y3 = lerp(c.Mouse.y, c.Mouse.y, t),
        x4 = lerp(x1, x3, t),
        y4 = lerp(y1, y3, t),
        x5 = lerp(x4, x2, t),
        y5 = lerp(y4, y2, t),
        x6 = lerp(x4, x5, t),
        y6 = lerp(y4, y5, t);

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX - 100, c.centerY);
    c.ctx.lineTo(x1, y1);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX + 100, c.Mouse.y);
    c.ctx.lineTo(x2, y2);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX - 100, c.Mouse.y);
    c.ctx.lineTo(x3, y3);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(x1, y1);
    c.ctx.lineTo(x4, y4);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(x4, y4);
    c.ctx.lineTo(x5, y5);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(x1, y1);
    c.ctx.lineTo(x6, y6);
    c.ctx.stroke();

    // c.ctx.beginPath();
    // for (let i = 0; i < 1; i += 0.01) {

    //     i == 0.01 ? c.ctx.moveTo(x1, y1) : c.ctx.lineTo(x3, y3);
    // }
    // c.ctx.fill();
});
