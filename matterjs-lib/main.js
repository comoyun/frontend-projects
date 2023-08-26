let matterEngine,
    matterRender,
    mouse,
    stack,
    ground,
    mouseConstrains;

matterEngine = Matter.Engine.create();
matterRender = Matter.Render.create({
    element: document.body,
    engine: matterEngine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false
    }
});

mouse = Matter.Mouse.create(matterRender.canvas);
mouseConstrains = Matter.MouseConstraint.create(matterEngine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

matterRender.mouse = mouse;

stack = Matter.Composites.stack(100, 450, 10, 10, 0, 0, (x, y) => {
    return Matter.Bodies.circle(x, y, 10);
});

ground = Matter.Bodies.rectangle(0, window.innerHeight - 10, window.innerWidth * 2, 10, { isStatic: true });
let box1 = Matter.Bodies.rectangle(55 * 2, 10, 55, 55);

Matter.World.add(matterEngine.world, [stack, ground, box1, mouseConstrains]);
Matter.Render.run(matterRender);
Matter.Engine.run(matterEngine);