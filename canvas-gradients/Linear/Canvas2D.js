export default class Canvas2D {
    constructor({
        width = 200,
        height = 250,
        parent = document.body,
        resetFrame = false,
    }) {
        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame;

        this.Keyboard = {
            active: false,
            key: "",
            arrows: {
                left: false,
                right: false,
                down: false,
                up: false,
            },
            event(_e) {
                switch (_e.type) {
                    case "keydown":
                        // special keys
                        if (_e.key == "ArrowLeft") this.arrows.left = true;
                        if (_e.key == "ArrowRight") this.arrows.right = true;
                        if (_e.key == "ArrowDown") this.arrows.down = true;
                        if (_e.key == "ArrowUp") this.arrows.up = true;

                        this.active = true;
                        this.key = _e.key;

                        break;

                    case "keyup":
                        if (_e.key == "ArrowLeft") this.arrows.left = false;
                        if (_e.key == "ArrowRight") this.arrows.right = false;
                        if (_e.key == "ArrowDown") this.arrows.down = false;
                        if (_e.key == "ArrowUp") this.arrows.up = false;

                        this.active = false;
                        this.key = "";

                        break;
                }
            },

            resetArrowKeys() {
                this.arrows.left = false;
                this.arrows.right = false;
                this.arrows.down = false;
                this.arrows.up = false;
            },
        };

        let canvas = (this.canvas = document.createElement("canvas"));
        this.ctx = this.canvas.getContext("2d");
        this.resetFrame = resetFrame;
        this.setSize(width || true, height);

        this.Mouse = {
            active: false,
            x: undefined,
            y: undefined,
            event: _e => {
                switch (_e.type) {
                    case "touchstart":
                        this.Mouse.x = _e.touches[0].clientX;
                        this.Mouse.y = _e.touches[0].clientY;

                        this.active = true;
                        break;
                    case "touchmove":
                        this.Mouse.x = _e.touches[0].clientX;
                        this.Mouse.y = _e.touches[0].clientY;
                        break;
                    case "touchend":
                        this.Mouse.active = false;
                        break;
                    case "mousedown":
                        this.Mouse.x = _e.clientX;
                        this.Mouse.y = _e.clientY;

                        this.Mouse.active = true;
                        break;
                    case "mousemove":
                        this.Mouse.x = _e.clientX;
                        this.Mouse.y = _e.clientY;
                        break;
                    case "mouseup":
                        this.Mouse.active = false;
                        break;
                }
                this.Mouse.x -= canvas.getBoundingClientRect().left;
                this.Mouse.y -= canvas.getBoundingClientRect().top;
            },
        };

        parent.appendChild(this.canvas);

        window.addEventListener("keydown", this.Keyboard.event);
        window.addEventListener("keyup", this.Keyboard.event);
        this.canvas.addEventListener("touchstart", this.Mouse.event);
        this.canvas.addEventListener("mousedown", this.Mouse.event);
        this.canvas.addEventListener("touchend", this.Mouse.event);
        this.canvas.addEventListener("mouseup", this.Mouse.event);
        this.canvas.addEventListener("mousemove", this.Mouse.event);
        this.canvas.addEventListener("touchmove", this.Mouse.event);
    }

    setSize(_w, _h) {
        if (_w === true) {
            this.centerX = (this.width = this.canvas.width = innerWidth) * 0.5;
            this.centerY =
                (this.height = this.canvas.height = innerHeight) * 0.5;
            return;
        }
        this.centerX = (this.width = this.canvas.width = _w) * 0.5;
        this.centerY = (this.height = this.canvas.height = _h) * 0.5;
    }

    animate(_) {
        const loop = () => {
            this.resetFrame
                ? this.ctx.clearRect(0, 0, this.width, this.height)
                : undefined;
            _();
            window.requestAnimationFrame(loop);
        };

        loop();
    }
}
