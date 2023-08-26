import Game from "./Game.js";

export default class Arc {
  constructor(_ = {
    x: undefined,
    y: undefined,
    r: 10,
    fill: "black",
    red: 0,
    green: 0,
    blue: 0
  }) {
    this.pos = {
      x: _.x,
      y: _.y
    };
    this.red = _.red;
    this.green = _.green;
    this.blue = _.blue;
    this.r = _.r;
    this.rotation = 0;
    this.fill = _.fill;
    this.velocity = {
      x: 2,
      y: 2,
      gravity: 0.2,
      friction: 0.8
    };
    this.opacity = 1;
    this.isAI = false;
    this.ai = {
      datas: {
        /* Data learned */
      }
    }
  }

  draw(_) {
    _.fillStyle = this.fill || Game.rgba(this.red, this.green, this.blue, this.opacity);
    _.beginPath();
    _.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    _.closePath();
    _.fill();
  }

  updatePlayAgain(_) {
    this.draw(_);
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    this.opacity -= 0.01;
  }

  setPos(_x, _y) {
    this.pos.x = _x;
    this.pos.y = _y;
  }

}
