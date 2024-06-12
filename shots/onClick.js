const onClick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.button === 2) { }

    const pitchCoords = canvasToPitch(x, y);
    if (pitchCoords.x < 0 || pitchCoords.x > 1 || pitchCoords.y < 0 || pitchCoords.y > 1) return;
    if (!firstPointIn()) p0 = pitchToCanvas(pitchCoords.x, pitchCoords.y);
    else {
        p1 = pitchToCanvas(pitchCoords.x, pitchCoords.y);
        setPopupPositionFromLastPoint(p1.x, p1.y);
    }
};
