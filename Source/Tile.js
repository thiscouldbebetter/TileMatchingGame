"use strict";
class Tile {
    constructor(defnName, cell) {
        this.defnName = defnName;
        this.cell = cell;
        this.isAtRest = false;
        this.ticksToLive = null;
    }
    defn() {
        return Globals.Instance.level.tileDefnByName(this.defnName);
    }
}
