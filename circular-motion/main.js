const canvas = document.querySelector("canvas"),
    ctx = canvas.getContext("2d"),
    colors = [
        "#155",
        "#166",
        "#177",
        "#17F",
        "#2d2",
        "#2ff",
        "#188",
        "#199",
        "#1F9",
    ];

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = { x: canvas.width * 0.5, y: canvas.height * 0.5 };

let particles = [];

function randomInt(_min, _max) {
    return Math.floor(Math.random() * (_max - _min + 1) + _min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

class Particle {
    constructor(x, y, radius, color = "#199") {
        this.position = {
            x,
            y
        };
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.05;
        this.offset = randomInt(50, 150);
        this.lastPoint = {
            x: undefined,
            y: undefined
        };
        this.lastMouse = { x, y };
    }

    draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.closePath();
        ctx.stroke();
    }

    update() {
        this.lastPoint = {
            x: this.position.x,
            y: this.position.y
        };
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.radians += this.velocity;
        this.position.x = this.lastMouse.x + Math.cos(this.radians) * this.offset;
        this.position.y = this.lastMouse.y + Math.sin(this.radians) * this.offset;
        this.draw();
    };
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        const radius = (Math.random() * 4) + 1;
        particles.push(new Particle(canvas.width * 0.5, canvas.height * 0.5, radius, getRandomColor()));
    }
    animate();
}

function mouseMove(_event) {
    mouse.x = _event.clientX;
    mouse.y = _event.clientY;
}

function touchMove(_event) {
    mouse.x = _event.touches[0].clientX;
    mouse.y = _event.touches[0].clientY;
}

function animate() {
    ctx.fillStyle = "rgba(10, 60, 60, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(_particle => {
        _particle.update();
    });

    requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("touchmove", touchMove);

// Check out ChrisCourses YouTube channel!