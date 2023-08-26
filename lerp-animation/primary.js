import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

c.setSize(true);

function lerp(_min, _max, _val) {
    return _val * (_max - _min) + _min;
}

// Task: draw X
// centerX + 100, centerY + 100

let t = 0,
    speed = 0.01;

c.animate(() => {
    t += speed;

    if (t >= 1) speed *= -1;
    if (t <= 0) speed = 0.01;

    c.ctx.lineCap = "join";
    c.ctx.lineJoin = "join";
    c.ctx.strokeStyle = "#188";
    
    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX - 100, c.centerY - 100);
    c.ctx.lineTo(
        lerp(c.centerX - 100, c.centerX, t),
        lerp(c.centerY - 100, c.centerY, t)
    );
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX + 100, c.centerY - 100);
    c.ctx.lineTo(
        lerp(c.centerX + 100, c.centerX, t),
        lerp(c.centerY - 100, c.centerY, t)
    );
    c.ctx.closePath();
    c.ctx.stroke();
    
    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX + 100, c.centerY + 100);
    c.ctx.lineTo(
        lerp(c.centerX + 100, c.centerX, t),
        lerp(c.centerY + 100, c.centerY, t)
    );
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX - 100, c.centerY + 100);
    c.ctx.lineTo(
        lerp(c.centerX - 100, c.centerX, t),
        lerp(c.centerY + 100, c.centerY, t)
    );
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(10, 10);
    c.ctx.lineTo(10, lerp(10, innerHeight - 10, t));
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(10, 10);
    c.ctx.lineTo(lerp(10, innerWidth - 10, t), 10);
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(innerWidth - 10, innerHeight - 10);
    c.ctx.lineTo(innerWidth - 10, lerp(innerHeight - 10, 10, t));
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(innerWidth - 10, innerHeight - 10);
    c.ctx.lineTo(lerp(innerWidth - 10, 10, t), innerHeight - 10);
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX, c.centerY);
    c.ctx.lineTo(c.centerX, lerp(c.centerY, c.centerY - 100, t));
    c.ctx.closePath();
    c.ctx.stroke();
    
    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX, c.centerY);
    c.ctx.lineTo(c.centerX, lerp(c.centerY, c.centerY + 100, t));
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX, c.centerY);
    c.ctx.lineTo(lerp(c.centerX, c.centerX + 100, t), c.centerY);
    c.ctx.closePath();
    c.ctx.stroke();

    c.ctx.beginPath();
    c.ctx.moveTo(c.centerX, c.centerY);
    c.ctx.lineTo(lerp(c.centerX, c.centerX - 100, t), c.centerY);
    c.ctx.closePath();
    c.ctx.stroke();
});
