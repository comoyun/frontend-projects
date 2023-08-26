import Canvas2D from "./Canvas2D.js";

const c = new Canvas2D({ resetFrame: true });

const scale = (_value, _inMin, _inMax, _outMin, _outMax) => {
    return (
        ((_value - _inMin) * (_outMax - _outMin)) / (_inMax - _inMin) + _outMin
    );
};

let gradient = undefined;

c.setSize(true);

c.animate(() => {
    c.ctx.save();
    c.ctx.translate(c.centerX, c.centerY);
    c.ctx.rotate(scale(c.Mouse.x, 0, c.width, 0, Math.PI * 2));
    gradient = c.ctx.createLinearGradient(
        -c.width * 0.8,
        -c.height * 0.8,
        innerWidth + -c.width * 0.3,
        innerHeight + -c.height * 0.3
    );

    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "blue");

    c.ctx.fillStyle = gradient;

    c.ctx.fillRect(
        -c.width * 0.8,
        -c.height * 0.8,
        c.width + c.width * 0.8,
        c.height + c.height * 0.8
    );
    c.ctx.restore();
});
