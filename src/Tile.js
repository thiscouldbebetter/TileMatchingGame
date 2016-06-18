
function Tile(defnName, cell)
{
	this.defnName = defnName;
	this.cell = cell;

	this.isAtRest = false;
	this.ticksToLive = null;
}

{
	Tile.prototype.defn = function()
	{
		return Globals.Instance.level.tileDefns[this.defnName];
	}
}
