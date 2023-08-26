import Game from "../JS/Game.js";
import Arc from "../JS/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

const ctx = game.WORLD.ctx,
    node = game.WORLD.node,
    { width, height } = node,
    video = document.getElementById("video"),
    animation = document.getElementById("animation");

let data = {},
    pixels = [],
    r = 0,
    g = 0,
    b = 0,
    index = 0,
    pixelSize = 5;

node.style.backgroundColor = "#efefef";
node.style.border = "3px solid #144";
node.style.borderRadius = "8px";

function accessCamera() {
    if ("mediaDevices" in navigator) {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    width: video.clientWidth,
                    height: video.clientHeight,
                },
            })
            .then(_ => {
                video.srcObject = _;
                init();
            })
            .catch(_ => {
                document.write("<h1>Please, allow me to use your camera!</h1>");
            });
    }
}

function takePhoto() {
    ctx.drawImage(video, 0, 0);
    data = ctx.getImageData(0, 0, video.clientWidth, video.clientHeight);
    game.clear();
}

function generate() {
    pixels = [];
    for (let j = 0; j < data.height; j++) {
        for (let i = 0; i < data.width; i++) {
            index = (i + j * data.width) * 4;
            r = data.data[index];
            g = data.data[index + 1];
            b = data.data[index + 2];

            const pixel = new Arc({
                x: i * pixelSize + width * 0.5 - data.width * pixelSize * 0.5,
                y: j * pixelSize + height * 0.5 - data.height * pixelSize * 0.5,
                r: pixelSize /1.3,
                fill: rgb(r, g, b),
            });

            pixel.savedX = pixel.pos.x;
            pixel.savedY = pixel.pos.y;
            pixel.savedR = pixel.r;
            pixels.push(pixel);
        }
    }
}

function adjust() {
    for (let j = 0; j < data.height; j++) {
        for (let i = 0; i < data.width; i++) {
            index = (i + j * data.width) * 4;
            r = data.data[index];
            g = data.data[index + 1];
            b = data.data[index + 2];

            let pixel = pixels[i + j * data.width];
            pixel.fill = rgb(r, g, b);
        }
    }
}

let animated = false;
accessCamera();

function init() {
    window.onclick = function () {
        takePhoto();
        generate();
        if (!animated) animate();
    };
}

function animate() {
    game.clear();
    animated = true;

    if (animation.checked) {
        takePhoto();
        adjust();
    }

    pixels.forEach(_pixel => {
        _pixel.update(ctx);
    });

    requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
    return `rgba(${_r}, ${_g}, ${_b}, 1)`;
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("keydown", _e => Game.Keyboard.event(_e, node));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e, node));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e, node));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e, node));
window.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e, node));
window.addEventListener("resize", Game.onResize);
window.addEventListener("contextmenu", _e => _e.preventDefault());
