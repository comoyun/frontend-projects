export default class Arc {
  constructor(_ = {
    x: undefined,
    y: undefined,
    r: 10,
    fill: "black",
  }) {
    this.pos = {
      x: _.x,
      y: _.y
    };
    this.r = _.r;
    this.rotation = 0;
    this.fill = _.fill;
    this.velocity = {
      x: 2,
      y: 2,
      gravity: 0.2,
      friction: 0.8
    };
    
    this.isAI = false;
    this.ai = {
      datas: {
        /* Data learned */
      }
    }
  }

  draw(_) {
    _.fillStyle = this.fill;
    _.beginPath();
    _.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    _.closePath();
    _.fill();
  }

  setPos(_x, _y) {
    this.pos.x = _x;
    this.pos.y = _y;
  }

}
