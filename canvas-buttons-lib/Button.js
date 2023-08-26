class Button {
    static Mouse = {
        x: undefined,
        y: undefined,
        active: false,

        /* for ontouchstart event */
        setMobile(_, _p) {
            this.active = true;
            this.x = _.touches[0].clientX - _p.getBoundingClientRect().left;
            this.y = _.touches[0].clientY - _p.getBoundingClientRect().top;
        },

        /* for onmousedown event */
        setDesktop(_, _p) {
            this.active = true;
            this.x = _.clientX - _p.getBoundingClientRect().left;
            this.y = _.clientY - _p.getBoundingClientRect().top;
        },

        setMobileMove(_, _p) {
            this.x = _.touches[0].clientX - _p.getBoundingClientRect().left;
            this.y = _.touches[0].clientY - _p.getBoundingClientRect().top;
        },

        /* for onmousedown event */
        setDesktopMove(_, _p) {
            this.x = _.clientX - _p.getBoundingClientRect().left;
            this.y = _.clientY - _p.getBoundingClientRect().top;
        },

        disable() {
            this.active = false;
        },
    };

    static Buttons = [];

    static Structure(_) {
        Button.Buttons.push(_);
    }

    constructor({
        /* Initial props */
        x = 10,
        y = 10,
        width = 60,
        height = 40,
        text = "Button",
        fontWeight = "normal",
        color = "#000",
        backgroundColor = "transparent",
        borderWidth = 0,
        borderColor = "black",
        fontFamily = "monospace",
        fontSize = "16px",
        canvas = null,
        ctx = null,
    }) {
        this.pos = { x: x, y: y };
        this.dim = { width: width, height: height };
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.borderWidth = borderWidth;
        this.borderColor = borderColor;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.fontSize = fontSize;
        this.canvas = canvas;
        this.ctx = ctx;
        this.onclick = function () {};
        this.ondblclick = function () {};
        this.oncontextmenu = function () {};
        this.clickTimes = 0;
        this.clicked = false;
        this.text = {
            matrix: null,
            text,
        };
        this.zIndex = Button.Buttons.length - 1;

        Button.Structure(this);
    }

    init() {
        let _this = this;
        _this.canvas.addEventListener("dblclick", _e => {
            Button.Mouse.active = true;
            if (_this.collide() && Button.Mouse.active) this.ondblclick();
        });
        _this.canvas.addEventListener("touchstart", _e => {
            Button.Mouse.setMobile(_e);
            ++this.clickTimes;
            if (_this.collide() && Button.Mouse.active) this.onclick();
        });
        _this.canvas.addEventListener("mousedown", _e => {
            ++this.clickTimes;
            Button.Mouse.setDesktop(_e, _this.canvas);
            if (_this.collide() && Button.Mouse.active) this.onclick();
        });
        _this.canvas.addEventListener("touchend", _e => Button.Mouse.disable());
        _this.canvas.addEventListener("mouseup", _e => Button.Mouse.disable());
    }

    setText(_) {
        this.text.text = _;
    }

    setPos(_x, _y) {
        this.pos.x = _x;
        this.pos.y = _y;
    }

    setDim(_w, _h) {
        this.dim.width = _w;
        this.dim.height = _h;
    }

    setFontSize(_) {
        this.fontSize = _;
    }

    getCenterX() {
        return this.pos.x + this.dim.width * 0.5;
    }

    getCenterY() {
        return this.pos.y + this.dim.height * 0.5;
    }

    getRight() {
        return this.pos.x + this.dim.width;
    }

    getBottom() {
        return this.pos.y + this.dim.height;
    }

    place(_ctx) {
        if (!_ctx) _ctx = this.ctx;

        _ctx.fillStyle = this.backgroundColor;
        
        if (this.borderWidth > 0) {
            _ctx.strokeStyle = this.borderColor;
            _ctx.lineWidth = this.borderWidth;
            _ctx.strokeRect(
                this.pos.x,
                this.pos.y,
                this.dim.width,
                this.dim.height
            );
            _ctx.stroke();
        }
        
        _ctx.fillRect(this.pos.x, this.pos.y, this.dim.width, this.dim.height);
        _ctx.fillStyle = this.color;
        _ctx.textBaseline = "center";
        _ctx.font = `normal ${this.fontSize}px xyz, ${this.fontFamily}`;
        
        this.text.matrix = _ctx.measureText(this.text.text);
        
        _ctx.fillText(
            this.text.text,
            this.getCenterX() - this.text.matrix.width * 0.5,
            this.getCenterY() + this.fontSize / 3.5	
        );
    }

    collide() {
        return !(
            Button.Mouse.x >= this.pos.x + this.dim.width ||
            Button.Mouse.y >= this.pos.y + this.dim.height ||
            Button.Mouse.x <= this.pos.x ||
            Button.Mouse.y <= this.pos.y
        );
    }

    onClick(_func) {
        this.onclick = _func;
    }

    onDblClick(_func) {
        this.ondblclick = _func;
    }

    onContextMenu(_func) {
        this.oncontextmenu = _func;
    }
}

// @HumoyunDeveloper 2021
