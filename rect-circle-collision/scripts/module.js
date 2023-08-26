import Game from "../Game/Game.js";
import FillRect from "../Game/FillRect.js";
import Arc from "../Game/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

const ctx = game.WORLD.ctx,
    node = game.WORLD.node;

node.style.backgroundColor = "#efefef";
node.style.border = "3px solid #144";
node.style.borderRadius = "8px";

const rect = new FillRect({
        x: node.width * 0.5 - 30,
        y: node.height * 0.5 - 30,
        w: 60,
        h: 60,
        fill: "#144",
    }),
    circle = new Arc({
        x: 30,
        y: 30,
        r: 20,
        fill: "#151",
    }),
    line = new Line(circle.pos.x, circle.pos.y, rect.pos.x, rect.pos.y),
    logger = new FillText("They aren't colliding");

logger.color = "#144";
logger.x = 15;
logger.y = 25;

animate();
function animate() {
    game.clear();

    rect.draw(ctx);
    circle.draw(ctx);
    line.draw();
    logger.draw();

    line.x = circle.pos.x;
    line.y = circle.pos.y;

    line.x2 = clamp(rect.pos.x, rect.pos.x + rect.dim.w, circle.pos.x);
    line.y2 = clamp(rect.pos.y, rect.pos.y + rect.dim.h, circle.pos.y);

    if (line.getLength() < circle.r) (circle.fill = "#1a1", logger.text = "They are colliding")
    else (circle.fill = "#151", logger.text = "They aren't colliding");

    if (Game.Mouse.active) {
        circle.pos.x = Game.Mouse.x - node.getBoundingClientRect().left;
        circle.pos.y = Game.Mouse.y - node.getBoundingClientRect().top;
    }
    requestAnimationFrame(animate);
}

function clamp(_min, _max, _value) {
    return Math.max(_min, Math.min(_max, _value));
}

function Line(_x, _y, _x2, _y2) {
    this.x = _x;
    this.y = _y;
    this.x2 = _x2;
    this.y2 = _y2;
    this.draw = function () {
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.closePath();
        ctx.stroke();
    };
    this.getLength = function () {
        return Math.sqrt(
            Math.pow(this.x - this.x2, 2) + Math.pow(this.y - this.y2, 2)
        );
    };
}

function FillText(_t) {
    this.x = 0;
    this.y = 0;
    this.text = _t;
    this.color = "#eff";
    this.draw = function () {
        ctx.font = "20px bold monospace";
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    };
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
node.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e));
node.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e));
node.addEventListener("touchend", _e => Game.Mouse.disable());
node.addEventListener("mouseup", _e => Game.Mouse.disable());
node.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e));
node.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e));
window.addEventListener("resize", Game.onResize);
window.addEventListener("contextmenu", _e => _e.preventDefault());
/*
game.rgbaClear(230, 230, 230, 0.1);

    ground.draw(ctx);
    player.draw(ctx);
    player.pos.x += player.velocity.x;
    player.pos.y -= player.velocity.y;

    if (Game.Keyboard.arrows.right) {
        player.velocity.x = 2;
    } else {
        player.velocity.x -= player.velocity.xfriction;
        if (player.velocity.x < player.velocity.xfriction) {
            player.velocity.x = 0;
        }
    }

    if (
        (Game.Keyboard.arrows.up || Game.Keyboard.space) &&
        player.pos.y == ground.pos.y - player.dim.h
    ) {
        player.fill = rgb(
            Game.getRandomInt(0, 155),
            Game.getRandomInt(0, 155),
            Game.getRandomInt(0, 155)
        );

        player.velocity.y += 6;
    } else {
        if (player.pos.y + player.dim.h < ground.pos.y) {
            player.velocity.y -= player.velocity.gravity;
        } else {
            player.velocity.y = 0;
            player.pos.y = ground.pos.y - player.dim.h;
        }
    }

    if (player.pos.x + player.dim.w < 0) {
        player.pos.x = game.WORLD.dimensions.w;
    }

    if (player.pos.x > game.WORLD.dimensions.w) {
        player.pos.x = -player.dim.w;
    }

    if (Game.Keyboard.arrows.left) {
        player.velocity.x = -2;
    }

    if (Game.Keyboard.shift && player.velocity.x != 0) {
        player.velocity.x = player.velocity.x < 0 ? -8 : 8;
    }

*/
