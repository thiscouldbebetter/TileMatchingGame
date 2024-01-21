"use strict";
class MapOfCells {
    constructor(sizeInCells, sizeInPixels) {
        this.sizeInCells = sizeInCells;
        this.sizeInPixels = sizeInPixels;
        this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract(new Coords(1, 1));
        this.cellSizeInPixels = this.sizeInPixels.clone().divide(this.sizeInCells);
        this.cells = [];
        var numberOfCells = this.sizeInCells.x * this.sizeInCells.y;
        for (var i = 0; i < numberOfCells; i++) {
            var cell = new MapOfCellsCell(null);
            this.cells.push(cell);
        }
    }
    cellAtPos(cellPos) {
        var cellIndex = this.indexOfCellAtPos(cellPos);
        var returnValue = this.cells[cellIndex];
        return returnValue;
    }
    indexOfCellAtPos(cellPos) {
        return cellPos.y * this.sizeInCells.x + cellPos.x;
    }
    posOfCell(cell) {
        return this.posOfCellAtIndex(this.cells.indexOf(cell));
    }
    posOfCellAtIndex(cellIndex) {
        var cellPosX = cellIndex % this.sizeInCells.x;
        var cellPosY = (cellIndex - cellPosX) / this.sizeInCells.x;
        var returnValue = new Coords(cellPosX, cellPosY);
        return returnValue;
    }
}
