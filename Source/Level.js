"use strict";
class Level {
    constructor(name, numberOfMovesAllowed, numberOfMatchesToWin, tileDefns, map) {
        this.name = name;
        this.numberOfMovesAllowed = numberOfMovesAllowed;
        this.numberOfMatchesToWin = numberOfMatchesToWin;
        this.tileDefns = tileDefns;
        this.map = map;
        this.tiles = [];
        this.cursor = new Cursor(new Coords(0, 0), // pos
        false // isTileSelected
        );
        this.numberOfMovesSoFar = 0;
        this.numberOfMatchesSoFar = 0;
        this.haveMatchesBeenCheckedSinceLastChange = false;
        this.isFinished = false;
        this.colorHighlight = "White";
        this.colorBorderAndText = "LightGray";
        this._cellPos = new Coords(0, 0);
        this._drawPos = new Coords(0, 0);
    }
    // instance methods
    eliminateCellAtPos(cellPosToEliminate) {
        var cellToEliminate = this.map.cellAtPos(cellPosToEliminate);
        var tileToEliminate = cellToEliminate.tilePresent;
        if (tileToEliminate != null) {
            tileToEliminate.ticksToLive = Level.TicksToEliminateTile;
        }
    }
    matchesAddToList(listToAddMatchesTo) {
        var mapSizeInCells = this.map.sizeInCells;
        var cellPos = new Coords(0, 0);
        var tileDefnNameCurrent;
        var tileDefnNamePrev;
        var tilesOfSameTypeInARow;
        var dimensionIndex = 0;
        // horizontal matches
        for (var y = 0; y < mapSizeInCells.y; y++) {
            cellPos.y = y;
            tileDefnNamePrev = null;
            tilesOfSameTypeInARow = 0;
            for (var x = 0; x < mapSizeInCells.x; x++) {
                cellPos.x = x;
                var cellAtPos = this.map.cellAtPos(cellPos);
                var tileInCell = cellAtPos.tilePresent;
                if (tileInCell != null) {
                    tileDefnNameCurrent = tileInCell.defnName;
                    tilesOfSameTypeInARow = this.matchesAddToList_2(cellPos, tileDefnNameCurrent, tileDefnNamePrev, tilesOfSameTypeInARow, dimensionIndex, listToAddMatchesTo);
                    tileDefnNamePrev = tileDefnNameCurrent;
                }
            }
            cellPos.x++;
            this.matchesAddToList_3(tilesOfSameTypeInARow, cellPos, dimensionIndex, listToAddMatchesTo);
        }
        var dimensionIndex = 1;
        for (var x = 0; x < mapSizeInCells.x; x++) {
            cellPos.x = x;
            tileDefnNamePrev = null;
            tilesOfSameTypeInARow = 0;
            for (var y = 0; y < mapSizeInCells.y; y++) {
                cellPos.y = y;
                var cellAtPos = this.map.cellAtPos(cellPos);
                var tileInCell = cellAtPos.tilePresent;
                if (tileInCell != null) {
                    tileDefnNameCurrent = tileInCell.defnName;
                    tilesOfSameTypeInARow = this.matchesAddToList_2(cellPos, tileDefnNameCurrent, tileDefnNamePrev, tilesOfSameTypeInARow, dimensionIndex, listToAddMatchesTo);
                    tileDefnNamePrev = tileDefnNameCurrent;
                }
            }
            cellPos.y++;
            this.matchesAddToList_3(tilesOfSameTypeInARow, cellPos, dimensionIndex, listToAddMatchesTo);
        }
        return listToAddMatchesTo;
    }
    matchesAddToList_2(cellPos, tileDefnNameCurrent, tileDefnNamePrev, tilesOfSameTypeInARow, dimensionIndex, listToAddMatchesTo) {
        if (tileDefnNameCurrent == tileDefnNamePrev) {
            tilesOfSameTypeInARow++;
        }
        else {
            this.matchesAddToList_3(tilesOfSameTypeInARow, cellPos, dimensionIndex, listToAddMatchesTo);
            tilesOfSameTypeInARow = 1;
        }
        return tilesOfSameTypeInARow;
    }
    matchesAddToList_3(tilesOfSameTypeInARow, cellPos, dimensionIndex, listToAddMatchesTo) {
        var numberOfTilesPerMatch = 3;
        if (tilesOfSameTypeInARow >= numberOfTilesPerMatch) {
            var cellPositionsForMatch = [];
            for (var i = 1; i <= tilesOfSameTypeInARow; i++) {
                var cellPosToAddToMatch = new Coords(cellPos.x - (dimensionIndex == 0 ? i : 0), cellPos.y - (dimensionIndex == 1 ? i : 0));
                cellPositionsForMatch.push(cellPosToAddToMatch);
            }
            var match = new TileMatch(cellPositionsForMatch);
            listToAddMatchesTo.push(match);
        }
    }
    matchesEliminate() {
        var matchesToEliminate = this.matchesAddToList([]);
        for (var m = 0; m < matchesToEliminate.length; m++) {
            var match = matchesToEliminate[m];
            for (var i = 0; i < match.cellPositions.length; i++) {
                var cellPos = match.cellPositions[i];
                this.eliminateCellAtPos(cellPos);
            }
            this.numberOfMatchesSoFar++;
        }
    }
    tileDefnByName(name) {
        return this.tileDefns.find(x => x.symbol == name);
    }
    tilesDestabilizeAbovePos(cellPosToEliminate) {
        for (var j = cellPosToEliminate.y - 1; j >= 0; j--) {
            var cellPosToDestabilize = new Coords(cellPosToEliminate.x, j);
            var cellToDestabilize = this.map.cellAtPos(cellPosToDestabilize);
            var tileToDestabilize = cellToDestabilize.tilePresent;
            if (tileToDestabilize != null) {
                tileToDestabilize.isAtRest = false;
            }
        }
    }
    tilesShuffle() {
        var mapCells = this.map.cells;
        var numberOfMapCells = mapCells.length;
        for (var i = 0; i < numberOfMapCells; i++) {
            var mapCell = mapCells[i];
            mapCell.tilePresent = null;
        }
        for (var t = 0; t < this.tiles.length; t++) {
            var tile = this.tiles[t];
            var mapCellIndex = Math.floor(numberOfMapCells
                * Math.random());
            while (mapCells[mapCellIndex].tilePresent != null) {
                mapCellIndex++;
                if (mapCellIndex >= numberOfMapCells) {
                    mapCellIndex = 0;
                }
            }
            var mapCell = mapCells[mapCellIndex];
            mapCell.tilePresent = tile;
            tile.cell = mapCell;
            tile.isAtRest = false;
        }
    }
    tilesSwapAtPositions(cursorPos, cursorPosNext) {
        var cellAtPos = this.map.cellAtPos(cursorPos);
        var cellAtPosNext = this.map.cellAtPos(cursorPosNext);
        var tileAtPosCurrent = cellAtPos.tilePresent;
        var tileAtPosNext = cellAtPosNext.tilePresent;
        tileAtPosCurrent.cell = cellAtPosNext;
        tileAtPosNext.cell = cellAtPos;
        cellAtPos.tilePresent = tileAtPosNext;
        cellAtPosNext.tilePresent = tileAtPosCurrent;
    }
    updateForTimerTick() {
        this.updateForTimerTick_FillTopRow();
        var display = Globals.Instance.display;
        this.drawToDisplay(display);
        this.updateForTimerTick_Tiles();
        this.updateForTimerTick_WinOrLose();
    }
    updateForTimerTick_FillTopRow() {
        var cellPos = new Coords(0, 0);
        for (var x = 0; x < this.map.sizeInCells.x; x++) {
            cellPos.x = x;
            var cellAtPos = this.map.cellAtPos(cellPos);
            if (cellAtPos.tilePresent == null) {
                var tileDefnIndex = Math.floor(this.tileDefns.length *
                    Math.random());
                var tileDefnName = this.tileDefns[tileDefnIndex].symbol;
                var tile = new Tile(tileDefnName, cellAtPos);
                cellAtPos.tilePresent = tile;
                this.tiles.push(tile);
                this.haveMatchesBeenCheckedSinceLastChange = false;
            }
        }
    }
    updateForTimerTick_Input() {
        var inputHelper = Globals.Instance.inputHelper;
        var keyPressed = inputHelper.keyPressed;
        if (keyPressed == "Enter") {
            var cursor = this.cursor;
            cursor.isTileSelected = (cursor.isTileSelected == false);
        }
        else if (keyPressed == "ArrowLeft") {
            this.updateForTimerTick_Input_CursorMove(new Coords(-1, 0));
        }
        else if (keyPressed == "ArrowRight") {
            this.updateForTimerTick_Input_CursorMove(new Coords(1, 0));
        }
        else if (keyPressed == "ArrowDown") {
            this.updateForTimerTick_Input_CursorMove(new Coords(0, 1));
        }
        else if (keyPressed == "ArrowUp") {
            this.updateForTimerTick_Input_CursorMove(new Coords(0, -1));
        }
        inputHelper.keyPressed = null;
    }
    updateForTimerTick_Input_CursorMove(directionToMove) {
        var level = this;
        var cursor = level.cursor;
        var map = level.map;
        var mapSizeInCellsMinusOnes = map.sizeInCellsMinusOnes;
        var cursorPos = cursor.pos;
        var cursorPosNext = cursorPos.clone().add(directionToMove).trimToRange(mapSizeInCellsMinusOnes);
        if (cursorPos.equals(cursorPosNext) == false) {
            if (cursor.isTileSelected == true) {
                cursor.isTileSelected = false;
                this.tilesSwapAtPositions(cursorPos, cursorPosNext);
                var matchesResultingFromMove = this.matchesAddToList([]);
                if (matchesResultingFromMove.length == 0) {
                    this.tilesSwapAtPositions(cursorPos, cursorPosNext);
                }
                else {
                    this.numberOfMovesSoFar++;
                    this.haveMatchesBeenCheckedSinceLastChange = false;
                    cursorPos.overwriteWith(cursorPosNext);
                }
            }
            else {
                cursorPos.overwriteWith(cursorPosNext);
            }
        }
    }
    updateForTimerTick_Tiles() {
        var tilesToRemove = [];
        for (var t = 0; t < this.tiles.length; t++) {
            var tile = this.tiles[t];
            if (tile.ticksToLive != null) {
                tile.ticksToLive--;
                if (tile.ticksToLive <= 0) {
                    tilesToRemove.push(tile);
                }
            }
        }
        for (var t = 0; t < tilesToRemove.length; t++) {
            var tile = tilesToRemove[t];
            var tileIndex = this.tiles.indexOf(tile);
            if (tileIndex >= 0) {
                // hack
                // Why is tileIndex < 0 sometimes?
                this.tiles.splice(tileIndex, 1);
            }
            var cellPos = this.map.posOfCell(tile.cell);
            tile.cell.tilePresent = null;
            tile.cell = null;
            this.tilesDestabilizeAbovePos(cellPos);
        }
        var directionDown = new Coords(0, 1);
        var tilePosNext = new Coords(0, 0);
        var areAllTilesAtRest = true;
        var cellPos = new Coords(0, 0);
        for (var y = this.map.sizeInCells.y - 1; y >= 0; y--) {
            cellPos.y = y;
            for (var x = 0; x < this.map.sizeInCells.x; x++) {
                cellPos.x = x;
                var cell = this.map.cellAtPos(cellPos);
                var tile = cell.tilePresent;
                if (tile == null) {
                    areAllTilesAtRest = false;
                }
                else {
                    if (tile.isAtRest == false) {
                        areAllTilesAtRest = false;
                        tilePosNext.overwriteWith(cellPos).add(directionDown);
                        if (tilePosNext.y >= this.map.sizeInCells.y) {
                            tile.isAtRest = true;
                        }
                        else {
                            var cellNext = this.map.cellAtPos(tilePosNext);
                            var tileInCellNext = cellNext.tilePresent;
                            if (tileInCellNext == null) {
                                cell.tilePresent = null;
                                cellNext.tilePresent = tile;
                                tile.cell = cellNext;
                            }
                            else if (tileInCellNext.isAtRest == true) {
                                tile.isAtRest = true;
                            }
                        }
                    }
                }
            }
        }
        if (areAllTilesAtRest) {
            if (this.haveMatchesBeenCheckedSinceLastChange) {
                this.updateForTimerTick_Input();
            }
            else {
                this.matchesEliminate();
                this.haveMatchesBeenCheckedSinceLastChange = true;
            }
        }
    }
    updateForTimerTick_WinOrLose() {
        if (this.isFinished == false) {
            if (this.numberOfMatchesSoFar >= this.numberOfMatchesToWin) {
                alert("You win!");
                this.isFinished = true;
            }
            else if (this.numberOfMovesSoFar >= this.numberOfMovesAllowed) {
                alert("Out of moves! You lose.");
                this.isFinished = true;
            }
        }
    }
    // Drawing.
    drawToDisplay(display) {
        var level = this;
        display.clear();
        var levelMap = level.map;
        this.drawToDisplay_Map(display);
        var tiles = level.tiles;
        for (var i = 0; i < tiles.length; i++) {
            var tile = tiles[i];
            tile.drawToDisplayForLevel(display, level);
        }
        this.drawToDisplay_Cursor(display);
        var textColor = this.colorBorderAndText;
        var fontHeight = 10; // hack
        display.drawTextWithColorAndHeightAtPos("Matches:" + level.numberOfMatchesSoFar + "/" + level.numberOfMatchesToWin, textColor, fontHeight, new Coords(2, levelMap.sizeInPixels.y + fontHeight));
        display.drawTextWithColorAndHeightAtPos("Moves:" + level.numberOfMovesSoFar + "/" + level.numberOfMovesAllowed, textColor, fontHeight, new Coords(2, levelMap.sizeInPixels.y + (fontHeight * 2)));
    }
    drawToDisplay_Cursor(display) {
        var cursor = this.cursor;
        var mapCellSizeInPixels = this.map.cellSizeInPixels;
        var drawPos = this._drawPos.overwriteWith(cursor.pos).add(new Coords(.25, .25)).multiply(mapCellSizeInPixels);
        var cursorSizeInPixels = mapCellSizeInPixels.clone().divideScalar(2);
        var g = display.graphics;
        if (cursor.isTileSelected) {
            g.strokeStyle = this.colorHighlight;
        }
        else {
            g.strokeStyle = this.colorBorderAndText;
        }
        g.strokeRect(drawPos.x, drawPos.y, cursorSizeInPixels.x, cursorSizeInPixels.y);
    }
    drawToDisplay_Map(display) {
        var map = this.map;
        var mapSizeInCells = map.sizeInCells;
        var cellSizeInPixels = map.cellSizeInPixels;
        var cellPos = this._cellPos.clear();
        var drawPos = this._drawPos;
        var colorBorder = "LightGray";
        for (var y = 0; y < mapSizeInCells.y; y++) {
            cellPos.y = y;
            for (var x = 0; x < mapSizeInCells.x; x++) {
                cellPos.x = x;
                drawPos.overwriteWith(cellPos).multiply(cellSizeInPixels);
                display.drawRectangleWithColorFillBorderSizeAtPos(null, // colorFill
                colorBorder, cellSizeInPixels, drawPos);
            }
        }
    }
}
// constants
Level.TicksToEliminateTile = 5;
