const canvasWidth = 800, canvasHeight = 800;

var canvas, ctx;

const bg = new Image();
bg.src = 'hbpitch.png'; // Specify the path to your image file

var p0 = {x: -1, y: -1};
var p1 = {x: -1, y: -1};

let pitchBounds = {
    x: 40,
    y: 55,
    w: 730,
    h: 730
}

const popup = {
    padding: 5,
    x: 0,
    y: 0,
    btnSize: 40,
    get w() {
        return this.btnSize * 2 + this.padding * 4;
    },
    get h() {
        return this.btnSize + this.padding * 2;
    }
};

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

    if (firstPointIn())
        renderCircle(p0.x, p0.y);
    if (secondPointIn()) {
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
        renderCircle(p1.x, p1.y);
    }

    if (popupActive()) renderPopup();

    window.requestAnimationFrame(loop);
}

const onClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pitchCoords = canvasToPitch(x, y);
    if(pitchCoords.x < 0 || pitchCoords.x > 1 || pitchCoords.y < 0 || pitchCoords.y > 1) return;
    if (!firstPointIn()) p0 = pitchToCanvas(pitchCoords.x, pitchCoords.y);
    else {
        p1 = pitchToCanvas(pitchCoords.x, pitchCoords.y);
        setPopupPositionFromLastPoint(p1.x, p1.y);
    }
}

const renderCircle = (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

const renderPopup = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(popup.x, popup.y, popup.w, popup.h);
    ctx.fillStyle = 'green';
    ctx.fillRect(popup.x + popup.padding, popup.y + popup.padding, popup.btnSize, popup.btnSize);

    ctx.fillStyle = 'red';
    ctx.fillRect(popup.x + popup.padding*3 + popup.btnSize, popup.y + popup.padding, popup.btnSize, popup.btnSize);
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

const setPopupPositionFromLastPoint = (x, y) => {
    popup.x = x - popup.w/2;
    popup.y = y - popup.h - 10;
    console.log(popup.w, popup.h);
}

const firstPointIn = () => {
    return p0.x != -1;
}

const secondPointIn = () => {
    return p1.x != -1;
}

const popupActive = () => {
    return firstPointIn() && secondPointIn();
}

const distance = (p0, p1) => {
    return Math.sqrt((p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2);
}

window.onload = start;