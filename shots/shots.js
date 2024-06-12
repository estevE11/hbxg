const canvasWidth = 800, canvasHeight = 800;

var canvas, ctx;

const bg = new Image();
bg.src = 'hbpitch.png'; // Specify the path to your image file

var p0 = {x: -1, y: -1};

const pitchBounds = {
    x: 40,
    y: 55,
    w: 730,
    h: 730
}

const start = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    document.getElementById('canvas-container').appendChild(canvas);

    canvas.addEventListener('click', onClick);

    window.requestAnimationFrame(loop);
}

const loop = () => {
    ctx.drawImage(bg, 0, 0, bg.width*2, bg.height*2);

    if (p0.x != -1) {
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    }

    window.requestAnimationFrame(loop);
}

const onClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pitchCoords = canvasToPitch(x, y);
    p0 = pitchToCanvas(pitchCoords.x, pitchCoords.y);
}


const canvasToPitch = (x, y) => {
    return {
        x: (x - pitchBounds.x) / pitchBounds.w,
        y: (y - pitchBounds.y) / pitchBounds.h
    }
}

const pitchToCanvas = (x, y) => {
    return {
        x: x * pitchBounds.w + pitchBounds.x,
        y: y * pitchBounds.h + pitchBounds.y
    }
}

window.onload = start;