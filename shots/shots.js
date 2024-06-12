const canvasWidth = 800, canvasHeight = 800;

var canvas, ctx;

const bg = new Image();
bg.src = 'hbpitch.png'; // Specify the path to your image file

const start = () => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    document.getElementById('canvas-container').appendChild(canvas);

    window.requestAnimationFrame(loop);
}

const loop = () => {
    ctx.drawImage(bg, 0, 0, bg.width*2, bg.height*2);

    window.requestAnimationFrame(loop);
}

window.onload = start;