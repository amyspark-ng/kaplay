kaplay();

setBackground(0, 0, 0);

add([
    text("Drag corners of the polygon"),
    pos(20, 20),
]);

// Make a weird shape
const poly = add([
    polygon([
        vec2(0, -160),
        vec2(160, 0),
        vec2(80, 80),
        vec2(-60, 120),
        vec2(-120, 0),
        vec2(-200, 20),
        vec2(-270, 60),
    ], {
        colors: [
            rgb(128, 255, 128),
            rgb(255, 128, 128),
            rgb(128, 128, 255),
            rgb(255, 128, 128),
            rgb(128, 128, 128),
            rgb(128, 255, 128),
            rgb(255, 128, 128),
        ],
    }),
    pos(300, 300),
    area(),
    color(),
]);

let dragging = null;
let hovering = null;

poly.onDraw(() => {
    const triangles = triangulate(poly.pts);
    for (const triangle of triangles) {
        drawTriangle({
            p1: triangle[0],
            p2: triangle[1],
            p3: triangle[2],
            fill: false,
            outline: { color: BLACK },
        });
    }
    if (hovering !== null) {
        drawCircle({
            pos: poly.pts[hovering],
            radius: 16,
        });
    }
});

onUpdate(() => {
    if (isConvex(poly.pts)) {
        poly.color = WHITE;
    } else {
        poly.color = rgb(192, 192, 192);
    }
});

onMousePress(() => {
    dragging = hovering;
});

onMouseRelease(() => {
    dragging = null;
});

onMouseMove(() => {
    hovering = null;
    const mp = mousePos().sub(poly.pos);
    for (let i = 0; i < poly.pts.length; i++) {
        if (mp.dist(poly.pts[i]) < 16) {
            hovering = i;
            break;
        }
    }
    if (dragging !== null) {
        poly.pts[dragging] = mousePos().sub(poly.pos);
    }
});

poly.onHover(() => {
    poly.color = rgb(200, 200, 255);
});

poly.onHoverEnd(() => {
    poly.color = rgb(255, 255, 255);
});
