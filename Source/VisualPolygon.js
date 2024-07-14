"use strict";
class VisualPolygon {
    constructor(color, vertices) {
        this.color = color;
        this.vertices = vertices;
    }
    clone() {
        return new VisualPolygon(this.color, this.vertices.map(x => x.clone()));
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        display.drawPolygonWithColorsFillAndBorderAndVerticesAtPos(this.color, null, // colorBorder
        this.vertices, posToDrawAt);
    }
    transformScaleByFactor(scaleFactor) {
        this.vertices.forEach(x => x.multiplyScalar(scaleFactor));
        return this;
    }
}
