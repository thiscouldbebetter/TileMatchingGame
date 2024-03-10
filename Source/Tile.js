"use strict";
class Tile {
    constructor(defnName, cell) {
        this.defnName = defnName;
        this.cell = cell;
        this.isAtRest = false;
        this.ticksToLive = null;
        this._drawPos = new Coords(0, 0);
        this._drawSize = new Coords(0, 0);
    }
    defn() {
        return Globals.Instance.level.tileDefnByName(this.defnName);
    }
    drawToDisplayForLevel(display, level) {
        var tile = this;
        var map = level.map;
        var tileDefn = tile.defn();
        var mapCellSizeInPixels = map.cellSizeInPixels;
        var tilePos = map.posOfCell(tile.cell);
        var drawPos = this._drawPos.overwriteWith(tilePos).multiply(mapCellSizeInPixels);
        var drawSize = this._drawSize.overwriteWith(mapCellSizeInPixels);
        var tileFractionOfLifeRemaining = (tile.ticksToLive == null ? null : (tile.ticksToLive / Level.TicksToEliminateTile));
        if (tileFractionOfLifeRemaining != null) {
            drawSize = drawSize.multiplyScalar(tileFractionOfLifeRemaining);
        }
        drawPos.add(mapCellSizeInPixels.clone().subtract(drawSize).divideScalar(2));
        display.drawRectangleWithColorFillBorderSizeAtPos(tileDefn.color, null, drawSize, drawPos);
    }
}
