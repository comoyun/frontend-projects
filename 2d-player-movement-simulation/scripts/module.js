import Game from "../Game/Game.js";
import FillRect from "../Game/FillRect.js";
import Arc from "../../common_scripts/Arc.js";

const game = new Game();

game.initialize(document.body);

game.setDimensions(400, 350);

const ctx = game.WORLD.ctx,
    node = game.WORLD.node;

node.style.backgroundColor = "#efefef";
node.style.border = "3px solid #144";
node.style.borderRadius = "8px";

let player = new FillRect({
        w: 35,
        h: 50,
        fill: "#144",
    }),
    ground = new FillRect({
        x: 0,
        y: node.height - 40,
        h: 40,
        w: node.width,
        fill: "#122",
    });

player.setGround(ground, 30);

if(navigator.userAgent.match(/Android/i)) {
    alert("Looks like you are using a cell phone. Unfortunately, this game doesn't support mobile devices :(")
}

function playAgain(_o, _n) {
    game.playAgain = [];

    for (let i = 0; i < _n; i++) {
        const firework = new Arc({
            x: _o.getCenter() + Game.getRandomInt(-15, 15),
            y: _o.pos.y + Game.getRandomInt(-15, 15),
            r: 2,
            red: 150,
            green: 150,
            blue: 0,
            opacity: 1,
        });
        firework.velocity.x = Game.getRandom(-1.5, 1.5);
        firework.velocity.y = Game.getRandom(-1.5, 1.5);

        game.playAgain.push(firework);
    }
}

function fire(_o, _n) {

    for (let i = 0; i < _n; i++) {
        const firework = new Arc({
            x: _o.getCenter() + Game.getRandomInt(-5, 5),
            y: _o.pos.y + Game.getRandomInt(-5, 5),
            r: 2,
            fill: "#166",
            opacity: 1,
        });
        firework.velocity.x = Game.getRandom(-0.5, 0.5);
        firework.velocity.y = Game.getRandom(-0.5, 0.5);

        game.fire.push(firework);
    }
}

function playerLogic() {
    player.pos.x += player.velocity.x;
    player.pos.y += player.velocity.y;

    // MOVEMENT
    if (Game.Keyboard.arrows.right) {
        player.velocity.x = 2;
    } else if (player.velocity.x > 0) {
        player.velocity.x -= player.velocity.xfriction;

        if (player.velocity.x < player.velocity.xfriction) {
            player.velocity.x = 0;
        }
    }


    if (Game.Keyboard.arrows.left) {
        player.velocity.x = -2;
    } else if (player.velocity.x < 0) {
        player.velocity.x += player.velocity.xfriction;

        if (player.velocity.x > player.velocity.xfriction) {
            player.velocity.x = 0;
        }
    }

    if ((Game.Keyboard.arrows.up || Game.Keyboard.space) && player.onGround()) {
        player.velocity.y = game.jumpDistance;
    } else if (!player.onGround()) {
        player.velocity.y += player.velocity.yfriction;

        if (player.pos.y + player.dim.h >= ground.pos.y) {
            player.pos.y = player.groundY;
            player.velocity.y = 0;
        }
    }

    if(Game.Keyboard.arrows.down && !player.onGround()) {
        player.velocity.y = 15;
        fire(player, 20);
    }

    if (Game.Keyboard.shift && !player.isStillX()) {
        player.speeding = true;
        player.velocity.x > 0
            ? (player.velocity.x = 4)
            : (player.velocity.x = -4);
    } else {
        player.speeding = false;
    }

    if(player.pos.x - player.velocity.x > node.width) {
        player.pos.x = -player.dim.w;
    }

    if (player.pos.x + player.dim.w + player.velocity.x < 0) {
        player.pos.x = node.width;
    }
}

animate();

function animate() {
    let frame = requestAnimationFrame(animate);
    game.rgbaClear(190, 220, 220, 0.2);

    ground.draw(ctx);
    player.draw(ctx);
    game.fire.forEach(_e => _e.updatePlayAgain(ctx));
    game.fire.forEach(
        (_e, _i) => _e.opacity > 0 || game.fire.splice(_i, 1)
    );

    playerLogic();

    ctx.font = "10px Arial bold";
    ctx.fillText(`
        "Space" - Jump, "ArrowRight" - Move Right, "ArrowLeft" - Move Left,
    `, -20, 10);
    ctx.fillText(`
    "ArrowDown" - Move Down, "ArrowUp" - Jump, "Shift" - Boost Speed`, -10, 22);
    ctx.fillText(`SMash Proto, Humoyun 2022.`, 2, 34);
    ctx.fillText(JSON.stringify(player.velocity), 0, 46);

    if (game.WORLD.end) cancelAnimationFrame(frame);
}

window.addEventListener("keydown", _e => Game.Keyboard.event(_e));
window.addEventListener("keyup", _e => Game.Keyboard.keyUpEvent(_e));
window.addEventListener("touchstart", _e => Game.Mouse.setMobile(_e));
window.addEventListener("mousedown", _e => Game.Mouse.setDesktop(_e));
window.addEventListener("touchend", _e => Game.Mouse.disable());
window.addEventListener("mouseup", _e => Game.Mouse.disable());
window.addEventListener("touchmove", _e => Game.Mouse.setMobileMove(_e));
window.addEventListener("mousemove", _e => Game.Mouse.setDesktopMove(_e));
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
