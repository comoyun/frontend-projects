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

        let canvas = (this.canvas = document.createElement("canvas"));
        this.ctx = this.canvas.getContext("2d");
        this.resetFrame = resetFrame;
        this.setSize(width || true, height);

        this.Mouse = {
            active: false,
            x: undefined,
            y: undefined,
            event(_e) {
                switch (_e.type) {
                    case "touchstart":
                        this.x = _e.touches[0].clientX;
                        this.y = _e.touches[0].clientY;

                        this.active = true;
                        break;
                    case "touchmove":
                        this.x = _e.touches[0].clientX;
                        this.y = _e.touches[0].clientY;
                        break;
                    case "touchend":
                        this.active = false;
                        break;
                    case "mousedown":
                        this.x = _e.clientX;
                        this.y = _e.clientY;

                        this.active = true;
                        break;
                    case "mousemove":
                        this.x = _e.clientX;
                        this.y = _e.clientY;
                        break;
                    case "mouseup":
                        this.active = false;
                        break;
                }
                this.x -= canvas.getBoundingClientRect().left;
                this.y -= canvas.getBoundingClientRect().top;
            },
        };

        const Keyboard = {
            active: false,
            key: "",
            arrows: {
                left: false,
                right: false,
                down: false,
                up: false,
            },
            event(_e) {
                if (document.querySelector(".extras")) {
                    gsap.to(".extras", {
                        opacity: 0,
                        onComplete() {
                            document.querySelector(".extras").style.display = "none";
                        }
                    });
                }
                switch (_e.type) {
                    case "keydown":
                        // special keys
                        if (_e.key == "ArrowLeft") Keyboard.arrows.left = true;
                        if (_e.key == "ArrowRight")
                            Keyboard.arrows.right = true;
                        if (_e.key == "ArrowDown") Keyboard.arrows.down = true;
                        if (_e.key == "ArrowUp") Keyboard.arrows.up = true;

                        Keyboard.active = true;
                        Keyboard.key = _e.key;

                        break;

                    case "keyup":
                        if (_e.key == "ArrowLeft") Keyboard.arrows.left = false;
                        if (_e.key == "ArrowRight")
                            Keyboard.arrows.right = false;
                        if (_e.key == "ArrowDown") Keyboard.arrows.down = false;
                        if (_e.key == "ArrowUp") Keyboard.arrows.up = false;

                        Keyboard.active = false;
                        Keyboard.key = "";

                        break;
                }
            },

            resetArrowKeys() {
                Keyboard.arrows.left = false;
                Keyboard.arrows.right = false;
                Keyboard.arrows.down = false;
                Keyboard.arrows.up = false;
            },
        };

        this.Keyboard = Keyboard;

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
            _();
            requestAnimationFrame(loop, 100);
        };

        loop();
    }
}

/* Khumoyun, 2021 */