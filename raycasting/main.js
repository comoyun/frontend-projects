import Arc from "./Arc.js";
import Boundary from "./Boundary.js";
import Canvas2D from "./Canvas2D.js";
import Particle from "./Particle.js";
import Ray from "./Ray.js";

const stage = new Canvas2D({ clearCanvas: true });

let walls = [],
    particle;

for (let i = 0; i < 5; i++) {
    const x1 = stage.getRandom(0, stage.size.width),
        x2 = stage.getRandom(0, stage.size.width),
        y1 = stage.getRandom(0, stage.size.height),
        y2 = stage.getRandom(0, stage.size.height);

    walls.push(new Boundary(x1, x2, y1, y2));
}

particle = new Particle();

stage.animate(() => {
    particle.show(stage.ctx);
    
    particle.update(stage.Mouse);

    particle.look(walls, stage.ctx);

    for (const wall of walls) {
        wall.show(stage.ctx);
    }
});
