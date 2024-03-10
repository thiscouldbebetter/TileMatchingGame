"use strict";
class VisualRectangle {
    constructor(color, size) {
        this.color = color;
        this.size = size;
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        display.drawRectangleWithColorFillBorderSizeAtPos(this.color, null, // colorBorder
        this.size, posToDrawAt);
    }
}
