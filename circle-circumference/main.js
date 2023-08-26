import { Circle } from "./Circle.js";
import Canvas2D from "./Canvas2D.js";

const node = document.querySelector("canvas"),
    { width, height } = node,
    ctx = node.getContext("2d"),
    circ = document.querySelector("#circ"),
    rad = document.querySelector("#rad"),
    area = document.querySelector("#area"),
    angle = document.querySelector("#angle");

let rotation = 0.01,
    radius = 70,
    circumference = 0,
    angle_ = 0,
    circleX = width * 0.5,
    circleY = height * 0.5,
    area_ = 0,
    circleColor = "white";

function drawCircle(_x, _y, _r, _radian, _color = "black") {
    ctx.strokeStyle = _color;
    ctx.fillStyle = "#155";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(_x, _y);
    for (let i = 0; i < Math.min(_radian, Math.PI * 2); i += 0.01) {
        ctx.lineTo(_x + _r * Math.cos(i), _y + _r * Math.sin(i));
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

update();
function update() {
    ctx.clearRect(0, 0, width, height);

    if (Canvas2D.Mouse.active) {
        rotation = Math.atan2(Canvas2D.Mouse.y - circleY, Canvas2D.Mouse.x - circleX);
        if (rotation < 0) {
            rotation =
                Math.PI +
                Math.atan2(circleY - Canvas2D.Mouse.y, circleX - Canvas2D.Mouse.x);
        }
    }

    drawCircle(circleX, circleY, radius, rotation, circleColor);

    angle_ = (360 / (Math.PI * 2)) * rotation;

    if (Canvas2D.Mouse.active) adjust();

    log();
    requestAnimationFrame(update);
}

function log() {
    circ.innerHTML =
        "<b>Circumference</b>: " +
        getCircumference(radius, rotation).toFixed(2);
    rad.innerHTML = "<b>Radius:</b> " + radius.toFixed(2);
    area.innerHTML = "<b>Area:</b> " + getArea(radius).toFixed(2);
    angle.innerHTML = "<b>Angle:</b> " + angle_.toFixed(2);
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.save();
    ctx.translate(circleX - radius - 8, circleY + 25);
    ctx.rotate(-(Math.PI / 2));
    ctx.fillText(circumference.toFixed(2), 0, 0);
    ctx.restore();
    ctx.fillText(angle_.toFixed(2), circleX - 25, circleY + radius + 20);
    ctx.save();
    ctx.translate(circleX, circleY);
    ctx.rotate(rotation);
    ctx.fillText(radius.toFixed(2), 0, -5);
    ctx.restore();
    ctx.fillText(area_.toFixed(2), circleX - 30, circleY + radius / 2 - 5);
}

function adjust() {
    ctx.strokeRect(
        circleX,
        circleY,
        Canvas2D.Mouse.x - circleX,
        Canvas2D.Mouse.y - circleY
    );
    ctx.beginPath();
    ctx.moveTo(circleX, circleY);
    ctx.lineTo(Canvas2D.Mouse.x, Canvas2D.Mouse.y);
    ctx.closePath();
    ctx.stroke();
    radius = Canvas2D.GetDistance({ x: circleX, y: circleY }, Canvas2D.Mouse);
}

function getCircumference(_r, _radian) {
    circumference =
        ((360 / (Math.PI * 2)) * _radian * (Math.PI * 2 * _r)) / 360;
    return circumference;
}

function getArea(_r) {
    area_ = _r ** 2 * Math.PI;
    return area_;
}

node.addEventListener("keydown", _e => Canvas2D.Keyboard.event(_e));
node.addEventListener("keyup", _e => Canvas2D.Keyboard.keyUpEvent(_e));
node.addEventListener("touchstart", _e => Canvas2D.Mouse.setMobile(_e, node));
node.addEventListener("mousedown", _e => Canvas2D.Mouse.setDesktop(_e, node));
node.addEventListener("touchend", _e => Canvas2D.Mouse.disable());
node.addEventListener("mouseup", _e => Canvas2D.Mouse.disable());
node.addEventListener("touchmove", _e => Canvas2D.Mouse.setMobileMove(_e, node));
node.addEventListener("mousemove", _e => Canvas2D.Mouse.setDesktopMove(_e, node));
node.addEventListener("resize", Canvas2D.onResize);
window.oncontextmenu = _ => _.preventDefault();