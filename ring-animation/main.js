

(() => {
    const cn = document.getElementById("scene"),
        ctx = cn.getContext("2d"),
        colors = ["#144", "#166", "#188", "#1aa"];

    let width = (cn.width = innerWidth),
        height = (cn.height = innerHeight),
        centerX = width * 0.5,
        centerY = height * 0.5,
        radius = 100,
        angle = 0,
        i = 0,
        j = 0;

    function resize() {
        width = cn.width = innerWidth;
        height = cn.height = innerHeight;
        centerX = width * 0.5;
        centerY = height * 0.5;
    }

    loop();
    function loop() {
        clearScene();

        updateRings();

        requestAnimationFrame(loop);
    }

    function updateRings() {
        for (i = 0; i < colors.length; i++) {
            drawRing(colors[i], i);
        }
        angle >= 360 ? (angle = 0) : angle++;
    }

    function drawRing(_color, _offset) {
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = _color;
        ctx.beginPath();
        for (j = -180; j < 180; j++) {
            let radian = ((angle + j) * Math.PI) / 180,
                x, y,
                now = Math.abs(j),
                displacement = 0,
                waveAmplitude;

            if (now > 70) displacement = (now - 70) / 70;

            if (displacement >= 1) displacement = 1;

            waveAmplitude =
                _offset * 10 +
                radius +
                displacement * Math.sin(radian * 8) * 17;

            x = centerX + Math.cos(radian) * waveAmplitude;
            y = centerY + Math.sin(radian) * waveAmplitude;

            j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function clearScene() {
        ctx.clearRect(0, 0, width, height);
    }

    window.onresize = resize;
    window.oncontextmenu = _ => _.preventDefault();
})();
