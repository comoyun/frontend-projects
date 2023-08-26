class Canvas2D {
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

        var _this;

        this.Mouse = {
            active: false,
            x: 0,
            y: 0,
            event(_e) {
                switch (_e.type) {
                    case "touchstart":
                        _this.x = _e.touches[0].clientX;
                        _this.y = _e.touches[0].clientY;

                        _this.active = true;
                        break;
                    case "touchmove":
                        _this.x = _e.touches[0].clientX;
                        _this.y = _e.touches[0].clientY;
                        break;
                    case "touchend":
                        _this.active = false;
                        break;
                    case "mousedown":
                        _this.x = _e.clientX;
                        _this.y = _e.clientY;

                        _this.active = true;
                        break;
                    case "mousemove":
                        _this.x = _e.clientX;
                        _this.y = _e.clientY;
                        break;
                    case "mouseup":
                        _this.active = false;
                        break;
                }
                _this.x -= canvas.getBoundingClientRect().left;
                _this.y -= canvas.getBoundingClientRect().top;
            },
        };

        _this = this.Mouse;

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
        if (!_w === true) {
            this.centerX = (this.width = this.canvas.width = width) * 0.5;
            this.centerY = (this.height = this.canvas.height = height) * 0.5;
            return;
        }
        this.centerX =
            (this.width = this.canvas.width = window.innerWidth) * 0.5;
        this.centerY =
            (this.height = this.canvas.height = window.innerHeight) * 0.5;
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
