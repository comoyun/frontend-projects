const scene = document.querySelector("#scene"),
    c = scene.getContext("2d"),
    mouse = { x: undefined, y: undefined };

scene.width = scene.height = 450;

const Rectangle = function () {
    this.x = 0;
    this.y = 0;
    this.width = 100;
    this.height = 100;
    this.vector_x = 0;
    this.vector_y = 0;
    this.bgColor = "#1aa";
    this.draw = function () {
        c.fillStyle = this.bgColor;
        c.fillRect(this.x, this.y, this.width, this.height);
    };

    this.isColliding = function (_otherRect) {
        return !(
            this.x + this.width <= _otherRect.x ||
            this.x >= _otherRect.x + _otherRect.width ||
            this.y + this.height <= _otherRect.y ||
            this.y >= _otherRect.y + _otherRect.height
        );
    };

    this.resolveCollision = function (_otherRect) {
        this.vector_x = (this.x + this.width * 0.5) - (_otherRect.x + _otherRect.width * 0.5);
        this.vector_y = (this.y + this.height * 0.5) - (_otherRect.y + _otherRect.height * 0.5);
        if (this.vector_y * this.vector_y > this.vector_x * this.vector_x) {
            if (this.vector_y > 0) {
                _otherRect.y = this.y - this.height;
            } else {
                _otherRect.y = this.y + this.height;
            }
        } else {
            if (this.vector_x > 0) {
                _otherRect.x = this.x - this.width;
            } else {
                _otherRect.x = this.x + this.width;
            }
        }
    };
}

const rect1 = new Rectangle();
const rect2 = new Rectangle();

const clear = function () {
    c.clearRect(0, 0, scene.width, scene.height);
}

const update = function () {

    rect2.x = mouse.x - 50;
    rect2.y = mouse.y - 50;

    if (rect1.isColliding(rect2)) {
        rect1.resolveCollision(rect2);
    }

    rect1.x = scene.width * 0.5 - 25;
    rect1.y = scene.height * 0.5 - 25;

    rect1.draw();
    rect2.draw();
};

const animate = function () {
    clear();
    update();
    requestAnimationFrame(animate);
};

const mouseMove = function (_event) {
    mouse.x = _event.clientX - scene.getBoundingClientRect().left;
    mouse.y = _event.clientY - scene.getBoundingClientRect().top;
};

const touchMove = function (_event) {
    mouse.x = _event.touches[0].clientX - scene.getBoundingClientRect().left;
    mouse.y = _event.touches[0].clientY - scene.getBoundingClientRect().top;
};

const init = function () {
    animate();
};

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("mousemove", mouseMove);
window.addEventListener("touchmove", touchMove);