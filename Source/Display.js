"use strict";
class Display {
    constructor() {
        this.colorBackground = "White";
        this.colorBorderAndText = "Gray";
        this.colorHighlight = "Black";
    }
    clear() {
        var g = this.graphics;
        var size = this.viewSizeInPixels;
        g.fillStyle = this.colorBackground;
        g.fillRect(0, 0, size.x, size.y);
        g.strokeStyle = this.colorBorderAndText;
        g.strokeRect(0, 0, size.x, size.y);
    }
    drawRectangleWithColorFillBorderSizeAtPos(colorFill, colorBorder, size, pos) {
        var g = this.graphics;
        if (colorFill != null) {
            g.fillStyle = colorFill;
            g.fillRect(pos.x, pos.y, size.x, size.y);
        }
        if (colorBorder != null) {
            g.strokeStyle = colorBorder;
            g.strokeRect(pos.x, pos.y, size.x, size.y);
        }
    }
    drawTextWithColorAndHeightAtPos(text, color, heightInPixels, pos) {
        var g = this.graphics;
        g.fillStyle = color;
        g.font = "" + heightInPixels + "px sans-serif";
        g.fillText(text, pos.x, pos.y);
    }
    initialize(viewSizeInPixels) {
        this.viewSizeInPixels = viewSizeInPixels;
        var canvas = document.createElement("canvas");
        canvas.width = this.viewSizeInPixels.x;
        canvas.height = this.viewSizeInPixels.y;
        this.graphics = canvas.getContext("2d");
        var divMain = document.getElementById("divMain");
        divMain.appendChild(canvas);
        this.drawPos = new Coords(0, 0);
        this.drawSize = new Coords(0, 0);
    }
}
