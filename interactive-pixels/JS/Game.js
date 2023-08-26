export default class Game {
  static Mouse = {
    x: undefined,
    y: undefined,
    active: false,

    /* for ontouchstart event */
    setMobile(_, _node) {
      this.active = true;
      this.x = _.touches[0].clientX - _node.getBoundingClientRect().left;
      this.y = _.touches[0].clientY - _node.getBoundingClientRect().top;
    },

    /* for onmousedown event */
    setDesktop(_, _node) {
      this.active = true;
      this.x = _.clientX - _node.getBoundingClientRect().left;
      this.y = _.clientY - _node.getBoundingClientRect().top;
    },

    setMobileMove(_, _node) {
      this.x = _.touches[0].clientX - _node.getBoundingClientRect().left;
      this.y = _.touches[0].clientY - _node.getBoundingClientRect().top;
    },

    /* for onmousedown event */
    setDesktopMove(_, _node) {
      this.x = _.clientX - _node.getBoundingClientRect().left;
      this.y = _.clientY - _node.getBoundingClientRect().top;
    },

    disable() {
      this.active = false;
    },

    /*
    initial:
      {
        sx: 0,
        sy: 0,
        w: 100,
        h: 100,
        active: false
      }
    */
    setButtons(_eq) {
      _eq.map(_ => {
        if (
          !(
            this.x <= _.sx ||
            this.x >= _.sx + _.w ||
            this.y <= _.sy ||
            this.y >= _.sy + _.h
          )
        ) {
          return (_.active = true && _);
        }
        return (_.active = false && _);
      });
    },
  };

  static Keyboard = {
    active: false,
    shift: false,
    space: false,
    key: "",
    arrows: {
      left: false,
      right: false,
      up: false,
      down: false,
    },

    /* onkeydown event */
    event(_) {
      if (_.key == "ArrowLeft") this.arrows.left = true;
      if (_.key == "ArrowRight") this.arrows.right = true;
      if (_.key == "ArrowDown") this.arrows.down = true;
      if (_.key == "ArrowUp") this.arrows.up = true;
      if (_.key == "Shift") this.shift = true;
      if (_.keyCode == 32) this.space = true;

      this.active = true;
      this.arrows.key = _.key;
    },

    keyUpEvent(_) {
      if (_.key == "ArrowLeft") this.arrows.left = false;
      if (_.key == "ArrowRight") this.arrows.right = false;
      if (_.key == "ArrowDown") this.arrows.down = false;
      if (_.key == "ArrowUp") this.arrows.up = false;
      if (_.key == "Shift") this.shift = false;
      if (_.keyCode == 32) this.space = false;
    },

    reset() {
      this.arrows.left = false;
      this.arrows.right = false;
      this.arrows.down = false;
      this.arrows.up = false;
    },
  };

  static CreateCanvas = () => {
    let c = document.createElement("canvas"),
      ctx = c.getContext("2d");

    return { c, ctx };
  };

  static GetDistance = (_o1, _o2) => {
    return Math.sqrt(
      Math.pow(_o1.pos.x - _o2.x, 2) + Math.pow(_o1.pos.y - _o2.y, 2)
    );
  };

  static Collide = (_o1, _o2) => {
    if (
      !(
        _o1.x <= _o2.x ||
        _o1.x >= _o2.x + _o2.w ||
        _o1.y <= _o2.y ||
        _o1.y >= _o2.y + _o2.h
      )
    ) {
      return true;
    }
    return false;
  };

  static getRandomInt(_min, _max) {
    return Math.floor(Math.random() * (_max - _min) + _min);
  }

  static getRandom(_min, _max) {
    return Math.random() * (_max - _min) + _min;
  }

  static rgba(_r, _g, _b, _a = 1) {
    return `rgb(${_r}, ${_g}, ${_b}, ${_a})`;
  }

  constructor() {
    this.AIs = [];
    this.bestAI = null;
    this.jumpDistance = -10;
    this.playAgain = [];
    this.fire = [];

    this.WORLD = {
      ctx: null,
      node: null,
      dimensions: {
        w: 250,
        h: 250,
      },
      incrementors: {
        score: 0,
        coin: 0,
        bullet: 0,
        attempts: 0,
        max_health: 100,
        min_health: 0,
        fps: 1000 / 60,
        animationCtx:
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame,
      },
      startPoint: Date.now(),
      endPoint: null,
      end: false,
    };
  }

  initialize(_) {
    let a = Game.CreateCanvas();
    a.c.width = this.WORLD.dimensions.w;
    a.c.height = this.WORLD.dimensions.h;
    this.WORLD.ctx = a.ctx;
    this.WORLD.node = a.c;
    _.appendChild(a.c);
  }

  setDimensions(_w, _h) {
    this.WORLD.dimensions.w = _w;
    this.WORLD.dimensions.h = _h;
    this.update();
  }

  clear() {
    this.WORLD.ctx.clearRect(
      0,
      0,
      this.WORLD.dimensions.w,
      this.WORLD.dimensions.h
    );
  }

  setColor(_) {
    this.WORLD.ctx.fillStyle = _;
    this.WORLD.ctx.fillRect(
      0,
      0,
      this.WORLD.dimensions.w,
      this.WORLD.dimensions.h
    );
  }

  update() {
    (this.WORLD.node.width = this.WORLD.dimensions.w),
      (this.WORLD.node.height = this.WORLD.dimensions.h);
  }

  rgbaClear(_r, _g, _b, _a) {
    this.WORLD.ctx.fillStyle = `rgba(${_r}, ${_g}, ${_b}, ${_a})`;
    this.WORLD.ctx.fillRect(
      0,
      0,
      this.WORLD.dimensions.w,
      this.WORLD.dimensions.h
    );
  }

  /* resizing refreshes the page */
  onResize() {
    window.location.reload();
  }
}

// Humoyun 2022
