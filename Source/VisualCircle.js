"use strict";
class VisualCircle {
    constructor(color, radius) {
        this.color = color;
        this.radius = radius;
    }
    clone() {
        return new VisualCircle(this.color, this.radius);
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        display.drawCircleWithColorsFillAndBorderOfRadiusAtPos(this.color, null, // colorBorder
        this.radius, posToDrawAt);
    }
    transformScaleByFactor(scaleFactor) {
        this.radius *= scaleFactor;
        return this;
    }
}
