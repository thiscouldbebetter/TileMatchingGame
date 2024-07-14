"use strict";
class VisualRectangle {
    constructor(color, size) {
        this.color = color;
        this.size = size;
    }
    clone() {
        return new VisualRectangle(this.color, this.size.clone());
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        display.drawRectangleWithColorsFillAndBorderOfSizeCenteredAtPos(this.color, null, // colorBorder
        this.size, posToDrawAt);
    }
    transformScaleByFactor(scaleFactor) {
        this.size.multiplyScalar(scaleFactor);
        return this;
    }
}
