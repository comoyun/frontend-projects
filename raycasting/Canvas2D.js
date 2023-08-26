export default class Canvas2D {
    constructor({
        parent = document.body,
        size = {
            width: innerWidth,
            height: innerHeight,
        },
        clearCanvas = false,
        fps = false,
        controls = true,
        bgcolor = "#133",
        opacity = 1,
        rgbaClear = false,
        colors = [
            "#133",
            "#144",
            "#155",
            "#166",
            "#177",
            "#188",
            "#199",
            "#1aa",
        ],
        resizeReload = false,
    }) {
        /* THE PARENT ELEMENT */
        this.parent = parent;

        /* DIMENSIONS OF THE CANVAS */
        this.size = size;

        /* VISIBILITY */
        this.opacity = opacity;
        this.colors = colors;

        /* GET CENTRE POINTS */
        this.centerX = this.size.width * 0.5;
        this.centerY = this.size.height * 0.5;

        /* CLEAR CANVAS IN EVERY FRAME OF ANIMATION */
        this.clearCanvas = clearCanvas;

        /* FRAMES PER SECOND */
        this.fps = fps;

        this.fpsCalculated = 0;

        this.tickCount = 0;

        /* REQUEST ANIMATION FRAME */
        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame;

        this.animationFrame = null;

        /* CONTROLS */
        this.Keyboard = {
            active: false,
            key: "",
            arrows: {
                left: false,
                right: false,
                down: false,
                up: false,
            },
            resetArrowKeys() {
                this.arrows.left = false;
                this.arrows.right = false;
                this.arrows.down = false;
                this.arrows.up = false;
            },
        };
        this.Mouse = {
            active: false,
            x: 0,
            y: 0,
            radius: 2,
        };

        this.controls = controls;

        if (resizeReload) this.resizeReload();

        /* CANVAS ELEMENT */
        this.node = this.createCanvas(this.size.width, this.size.height);

        /* CanvasRenderingContext2D */
        this.ctx = this.node.getContext("2d");

        this.node.style.cssText = `
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            position: absolute;
            z-index: 2;
            background-color: ${bgcolor};`;

        /* CHECK IF CONTROLS ENABLED */
        if (this.controls) this.enableControls();

        this.parent.appendChild(this.node);
    }

    /* UPDATE KEYBOARD */
    KeyboardEvent(_e) {
        switch (_e.type) {
            case "keydown":
                // special keys
                if (_e.key == "ArrowLeft") this.Keyboard.arrows.left = true;
                if (_e.key == "ArrowRight") this.Keyboard.arrows.right = true;
                if (_e.key == "ArrowDown") this.Keyboard.arrows.down = true;
                if (_e.key == "ArrowUp") this.Keyboard.arrows.up = true;

                this.Keyboard.active = true;
                this.Keyboard.key = _e.key;

                break;

            case "keyup":
                if (_e.key == "ArrowLeft") this.Keyboard.arrows.left = false;
                if (_e.key == "ArrowRight") this.Keyboard.arrows.right = false;
                if (_e.key == "ArrowDown") this.Keyboard.arrows.down = false;
                if (_e.key == "ArrowUp") this.Keyboard.arrows.up = false;

                this.Keyboard.active = false;
                this.Keyboard.key = "";

                break;
        }
    }

    MouseEvent(_e) {
        switch (_e.type) {
            case "touchstart":
                this.Mouse.x = _e.touches[0].clientX;
                this.Mouse.y = _e.touches[0].clientY;

                _this.active = true;
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
        this.Mouse.x -= this.node.getBoundingClientRect().left;
        this.Mouse.y -= this.node.getBoundingClientRect().top;
    }

    /* ADD EVENTS */
    enableControls() {
        let _this = this;
        window.addEventListener("keydown", _ => {
            _this.KeyboardEvent(_);
        });
        window.addEventListener("keyup", _ => {
            _this.KeyboardEvent(_);
        });
        this.node.addEventListener("touchstart", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("mousedown", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("touchend", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("touchend", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("mouseup", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("mousemove", _ => {
            _this.MouseEvent(_);
        });
        this.node.addEventListener("touchmove", _ => {
            _this.MouseEvent(_);
        });
    }

    setSize(_width, _height) {
        this.centerX = (this.node.width = this.size.width = _width) * 0.5;
        this.centerY = (this.node.height = this.size.height = _height) * 0.5;
        this.node.style.width = this.size.width + "px";
        this.node.style.height = this.size.height + "px";
    }

    animate(_function) {
        this.now = Date.now();
        this.past = 0;
        this.fpsCalculated = 0;

        const loop = () => {
            this.now = Date.now();
            this.fpsCalculated = 1000 / (this.now - this.past);
            this.past = Date.now();

            if (this.clearCanvas)
                this.ctx.clearRect(0, 0, this.size.width, this.size.height);

            if (!(this.opacity === 1)) this.ctx.globalAlpha = this.opacity;

            _function();

            if (!this.fps) this.tickCount = window.requestAnimationFrame(loop);
            else setTimeout(loop, 1000 / this.fps);
        };

        loop();
    }

    stopAnimaton() {
        window.cancelAnimationFrame(this.tickCount);
    }

    rgb(_r, _g, _b, _a) {
        return `rgb(${_r}, ${_g}, ${_b}, ${_a})`;
    }

    rgbaClear(_r, _g, _b, _a) {
        this.ctx.fillStyle = `rgba(${_r}, ${_g}, ${_b}, ${_a})`;
        this.ctx.fillRect(0, 0, this.size.width, this.size.height);
    }

    createCanvas(_width, _height) {
        let canvas = document.createElement("canvas");
        canvas.width = _width;
        canvas.height = _height;
        return canvas;
    }

    /* TOOLS */
    getDistance(_obj1, _obj2) {
        return Math.sqrt(
            Math.pow(_obj1.x - _obj2.x, 2) + Math.pow(_obj1.y - _obj2.y, 2)
        );
    }

    getRandomColor() {
        return this.colors[this.getRandomInteger(0, this.colors.length)];
    }

    lerp(_value, _min, _max) {
        return _value * (_max - _min) + _min;
    }

    clamp(_value, _min, _max) {
        return Math.max(_min, Math.min(_max, _value));
    }

    convertToRadian(_degree) {
        return (_degree * Math.PI) / 180;
    }

    convertToDegree(_radian) {
        return (_radian * 180) / Math.PI;
    }

    collideRect(_obj1, _obj2) {
        return !(
            _obj1.x + _obj1.width <= _obj2.x ||
            _obj1.x >= _obj2.x + _obj2.width ||
            _obj1.y + _obj1.height <= _obj2.y ||
            _obj1.y >= _obj2.y + _obj2.height
        );
    }

    collideRad(_obj1, _obj2) {
        return this.getDistance(_obj1, _obj2) < _obj1.radius + _obj2.radius;
    }

    collideRC(_obj1, _obj2) {
        let x = this.clamp(_obj2.x, _obj1.x, _obj1.x + _obj1.width),
            y = this.clamp(_obj2.y, _obj1.y, _obj1.y + _obj1.height);

        if (this.getDistance(_obj2, { x, y }) < _obj2.radius) {
            return true;
        }
        return false;
    }

    getRandomInteger(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }

    getRandom(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }

    toDataURL(_type, _quality = 1) {
        return this.node.toDataURL(_type, _quality);
    }

    /* RESIZING RELOADS THE PAGE */
    resizeReload() {
        window.addEventListener("resize", () => {
            window.location.reload();
        });
    }
}

/* 
    new Canvas2D({
        parent: document.body D,
        size: {
            width: window.innerWidth D,
            height: window.innerHeight D,
        },
        clearCanvas: false D,
        fps: 1000 / 60 D,
    })
*/
