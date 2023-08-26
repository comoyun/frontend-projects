class Shape {
  constructor({
    x = 0,
    y = 0,
    radius = 100,
    width = 100,
    height = 100,
    fillColor = "black",
  }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
  }

  getRight() {
    return this.x + this.width;
  }

  getBottom() {
    return this.y + this.height;
  }

  getCentreX() {
    return this.x + this.width * 0.5;
  }

  getCentreY() {
    return this.y + this.height * 0.5;
  }
}

class Circle extends Shape {
  constructor(_) {
    super(_);
  }

  draw(_ctx) {
    _ctx.fillStyle = this.fillColor;
    _ctx.beginPath();
    _ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    _ctx.closePath();
    _ctx.fill();
  }

  circumference() {
      return Math.PI * 2 * this.radius;
  }
}

class Line {
    constructor(_points) {
        this.points = _points;
        this.startX = _points[0].x;
        this.startY = _points[0].y;
        this.points.shift();
        this.color = "#1aa";
    }

    draw(_ctx) {
        _ctx.strokeStyle = this.color;
        _ctx.lineWidth = 2;
        _ctx.beginPath();
        _ctx.moveTo(this.startX, this.startY);
        this.points.forEach(_ => {
            _ctx.lineTo(_.x, _.y);
        });
        _ctx.closePath();
        _ctx.stroke();
    }
}

export { Circle, Line };
