const c = document.createElement("canvas"),
    ctx = c.getContext("2d"),
    nextBtn = document.getElementById("nextBtn");

c.width = innerWidth;
c.height = innerHeight;

c.style.cssText = `
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #122;
`;

const { width, height } = c;

let cy = height * 0.5,
    cx = width * 0.5;

document.body.appendChild(c);

function drawBranch(
    _startX,
    _startY,
    _len,
    _angle,
    _branchWidth,
    _color1,
    _color2
) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = _color1;
    ctx.fillStyle = _color2;
    ctx.lineWidth = _branchWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.translate(_startX, _startY);
    ctx.rotate((_angle * Math.PI) / 180);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -_len);
    ctx.stroke();

    if (_len < 10) {
        ctx.restore();
        return;
    }

    drawBranch(0, -_len, _len * 0.75, _angle + 5, _branchWidth);
    drawBranch(0, -_len, _len * 0.75, _angle - 5, _branchWidth);

    ctx.restore();
}

drawBranch(cx, height - 90, 120, 0, 3, "#177", "#1bb");

nextBtn.onclick = function () {
    ctx.clearRect(0, 0, width, height);
    drawBranch(cx, height - 90, Math.random() * (100) + 30, Math.random() * Math.PI * 2, 4, "#177", "#1bb");
};


// Code inspired by Franks Labaratory!