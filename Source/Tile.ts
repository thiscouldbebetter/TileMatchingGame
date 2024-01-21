
class Tile
{
	defnName: string;
	cell: MapOfCellsCell;

	isAtRest: boolean;
	ticksToLive: number;

	constructor(defnName: string, cell: MapOfCellsCell)
	{
		this.defnName = defnName;
		this.cell = cell;

		this.isAtRest = false;
		this.ticksToLive = null;
	}

	defn()
	{
		return Globals.Instance.level.tileDefnByName(this.defnName);
	}
}
