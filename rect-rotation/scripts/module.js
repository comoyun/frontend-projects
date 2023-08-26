import Game from "../Game/Game.js";
import FillRect from "../Game/FillRect.js";
import FillText from "../Game/FillText.js";
import Arc from "../Game/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

game.WORLD.node.style.backgroundColor = "#efefef";
game.WORLD.node.style.border = "1px solid #677";
game.WORLD.node.style.borderRadius = "8px";

game.setColor("white");

const ctx = game.WORLD.ctx,
    node = game.WORLD.node;

const rect = new FillRect({
        x: node.width / 2 - 25,
        y: node.height / 2 - 25,
        fill: "#155",
        w: 50,
        h: 50,
    }),
    text = new FillText({ x: 10, y: 20, fontSize: 17, color: "#144" }),
    point = new Arc({
        x: rect.transform.x,
        y: rect.transform.y,
        r: 3,
        fill: "#144",
    });

animate();
function animate() {
    game.clear();
    text.draw(ctx);
    rect.draw(ctx);
    point.draw(ctx);
    rect.rotation += rect.speed;

    if (Game.Keyboard.arrows.left) {
        if (rect.speed < rect.rSpeed) {
            rect.speed += 0.002;
        } else {
            rect.rSpeed += 0.001;
            rect.speed = rect.rSpeed;
        }
    } else if (rect.speed > 0) {
        rect.speed -= rect.velocity.xfriction;
        rect.rSpeed -= 0.001;

        if (rect.speed < rect.velocity.xfriction) {
            rect.speed = 0;
            rect.rSpeed = rect.bSpeed;
        }
    }
    if (Game.Keyboard.arrows.right) {
        if (rect.speed > rect.mSpeed) {
            rect.speed -= 0.002;
        } else {
            rect.mSpeed -= 0.001;
            rect.speed = rect.mSpeed;
        }
    } else if (rect.speed < 0) {
        rect.speed += rect.velocity.xfriction;
        rect.mSpeed += 0.001;

        if (rect.speed > rect.velocity.xfriction) {
            rect.speed = 0;
            rect.mSpeed = -rect.bSpeed;
        }
    }

    if (Game.Collide(Game.Mouse, rect) && Game.Mouse.active) {
        rect.transform.x = Game.Mouse.x - rect.dim.w * 0.5;
        rect.transform.y = Game.Mouse.y - rect.dim.h * 0.5;
        point.pos = rect.transform;
    }

    text.text = Math.abs((((rect.rotation / (Math.PI * 2))) * 360).toFixed(2)) + "deg";

    requestAnimationFrame(animate);
}

function rgb(_r, _g, _b) {
    return `rgb(${_r}, ${_g}, ${_b})`;
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e, node));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e, node));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e, node));
window.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e, node));
window.addEventListener("resize", Game.onResize);
