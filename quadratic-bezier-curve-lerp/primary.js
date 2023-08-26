/* 
    Task: draw Quadratic Bezier Curve with Linear Interpolation Function (lerp)
*/

import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

c.setSize(true);

function lerp(_min, _max, _val) {
    return _val * (_max - _min) + _min;
}

function drawPoint(_x, _y) {
    c.ctx.fillStyle = "#fff";
    c.ctx.beginPath();
    c.ctx.arc(_x, _y, 3, 0, Math.PI * 2, false);
    c.ctx.closePath();
    c.ctx.fill();
}

let speed = 0.01,
    t = 0;

c.animate(() => {
    t += speed;

    if (t >= 1) speed *= -1;
    if (t <= 0) speed = 0.01;

    let x1 = lerp(c.centerX - 100, c.Mouse.x, t),
        y1 = lerp(c.centerY, c.Mouse.y, t),
        x2 = lerp(c.Mouse.x, c.centerX + 100, t),
        y2 = lerp(c.Mouse.y, c.centerY, t),
        x3 = lerp(x1, x2, t),
        y3 = lerp(y1, y2, t);

    c.ctx.lineCap = "join";
    c.ctx.lineJoin = "join";
    c.ctx.strokeStyle = "#188";
    c.ctx.fillStyle = "#188";

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX - 100, c.centerY);
    c.ctx.lineTo(c.Mouse.x, c.Mouse.y);
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.Mouse.x, c.Mouse.y);
    c.ctx.lineTo(c.centerX + 100, c.centerY);
    c.ctx.stroke();

    c.ctx.beginPath();
    for (let i = 0; i < 1; i += 0.01) {
        let x1 = lerp(c.centerX - 100, c.Mouse.x, i),
            y1 = lerp(c.centerY, c.Mouse.y, i),
            x2 = lerp(c.Mouse.x, c.centerX + 100, i),
            y2 = lerp(c.Mouse.y, c.centerY, i),
            x3 = lerp(x1, x2, i),
            y3 = lerp(y1, y2, i);

        i == 0.01 ? c.ctx.moveTo(x1, y1) : c.ctx.lineTo(x3, y3);
    }
    c.ctx.fill();

    drawPoint(x3, y3);

    c.ctx.fillText(t.toFixed(3), 10, 20);
});
