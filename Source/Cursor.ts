
class Cursor
{
	pos: Coords;
	isTileSelected: boolean;

	constructor(pos: Coords, isTileSelected: boolean)
	{
		this.pos = pos;
		this.isTileSelected = isTileSelected;
	}
}
