class SnowFlake {
    constructor(_) {
        (this.x = this.y = 0),
            (this.r = _),
            (this.color = "rgba(255, 255, 255, 0.1)");
        this.velocity = {
            x: undefined,
            y: undefined,
        };
    }

    draw(_) {
        _.fillStyle = this.color;
        _.beginPath();
        _.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        _.closePath();
        _.fill();
    }
}

// Controller
const Controller = {
    _: undefined,
    snowfkes: [],
    mouse: {
        x: undefined,
        y: undefined,
        active: false,
    },
    handleMouseEnd(_e) {
        Controller.mouse.active = false;
    },
    handleTouchEnd(_e) {
        Controller.mouse.active = false;
    },
    handleMouseDown(_e) {
        Controller.mouse.active = true;
    },
    handleTouchDown(_e) {
        Controller.mouse.active = true;
    },
    handleMouseMove(_e) {
        Controller.mouse.x = _e.clientX;
        Controller.mouse.y = _e.clientY;
    },
    handleTouchMove(_e) {
        Controller.mouse.x = _e.touches[0].clientX;
        Controller.mouse.y = _e.touches[0].clientY;
    },
    ctx: undefined,
    init(_parent) {
        this._ = document.createElement("canvas");
        this.ctx = this._.getContext("2d");
        this._.width = window.innerWidth;
        this._.height = window.innerHeight;
        _parent.appendChild(this._);
    },
    getRandom(_n) {
        return Math.floor(Math.random() * _n);
    },
    getBetweenInteger(_n1, _n2) {
        return Math.floor(Math.random() * (_n2 - _n1 + 1) + _n1);
    },
    getBetween(_n1, _n2) {
        return Math.random() * (_n2 - _n1) + _n1;
    },
    clear() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    },
    createFks(_n = 1) {
        this.snowfkes = [];
        let i = 0;
        for (; i < _n; i++) {
            let newObj = new SnowFlake(this.getBetweenInteger(1, 3));
            newObj.color = "rgba(255, 255, 255, 0." + newObj.r;
            newObj.velocity.x = this.getBetween(-0.059, 0.05);
            newObj.velocity.y = this.getBetween(0.5, 1);
            newObj.x = this.getRandom(innerWidth);
            newObj.y = -this.getBetweenInteger(0, innerHeight);
            this.snowfkes.push(newObj);
        }
    },
};

const NAME = "Snowy Day!";

Controller.init(document.body);

Controller.createFks(1000);

drawAnimation();

function additional() {
    Controller.ctx.font = "10px bold Arial";
    Controller.ctx.fillStyle = "#fff";
    Controller.ctx.fillText(NAME, 10, innerHeight - 33);
    Controller.ctx.fillStyle = "#233";
    Controller.ctx.fillRect(0, innerHeight - 30, innerWidth, 30);
}

function drawAnimation() {
    Controller.clear();
    Controller.snowfkes.forEach(sn => {
        sn.draw(Controller.ctx);
        sn.x += sn.velocity.x;
        sn.y += sn.velocity.y;
        if (sn.y >= innerHeight - 33) {
            sn.velocity.x = 0;
            sn.velocity.y = 0;
        }
    });
    if (Controller.mouse.active) {
        let newObj = new SnowFlake(Controller.getBetweenInteger(1, 3));
        newObj.color = "rgba(255, 255, 255, 0." + newObj.r;
        newObj.velocity.x = Controller.getBetween(-0.059, 0.05);
        newObj.velocity.y = Controller.getBetween(0.2, 0.8);
        newObj.x = Controller.mouse.x;
        newObj.y = Controller.mouse.y;
        Controller.snowfkes.push(newObj);
    }
    additional();
    window.requestAnimationFrame(drawAnimation); // 60FPS....
}

Controller._.addEventListener("mousedown", Controller.handleMouseDown);
Controller._.addEventListener("mouseup", Controller.handleMouseEnd);
Controller._.addEventListener("mousemove", Controller.handleMouseMove);
Controller._.addEventListener("touchstart", Controller.handleTouchDown);
Controller._.addEventListener("touchmove", Controller.handleTouchMove);
Controller._.addEventListener("touchend", Controller.handleTouchEnd);
