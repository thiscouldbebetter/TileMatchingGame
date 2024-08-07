
class Tile
{
	defnName: string;
	cell: MapOfCellsCell;

	isAtRest: boolean;
	ticksToLive: number;

	_drawPos: Coords;
	_drawSize: Coords;

	constructor(defnName: string, cell: MapOfCellsCell)
	{
		this.defnName = defnName;
		this.cell = cell;

		this.isAtRest = false;
		this.ticksToLive = null;

		this._drawPos = new Coords(0, 0);
		this._drawSize = new Coords(0, 0);
	}

	defn(): TileDefn
	{
		return Globals.Instance.level.tileDefnByName(this.defnName);
	}

	drawToDisplayForLevel(display: Display, level: Level): void
	{
		var tile = this;
		var map = level.map;
		var tileDefn = tile.defn();
		var mapCellSizeInPixels = map.cellSizeInPixels;
		var tilePos = map.posOfCell(tile.cell);

		var halves = Coords.ones().half();

		var drawPos = this._drawPos
			.overwriteWith(tilePos)
			.add(halves)
			.multiply(mapCellSizeInPixels);

		var tileVisual = tileDefn.visual;

		var tileFractionOfLifeRemaining = 
		(
			tile.ticksToLive == null ? null : (tile.ticksToLive / Level.TicksToEliminateTile)
		)

		if (tileFractionOfLifeRemaining != null)
		{
			tileVisual =
				tileVisual
				.clone()
				.transformScaleByFactor(tileFractionOfLifeRemaining);
		}

		tileVisual.drawToDisplayAtPos
		(
			display, drawPos
		)
	}

}
