
class MapOfCells
{
	sizeInCells: Coords;
	sizeInPixels: Coords;

	sizeInCellsMinusOnes: Coords;
	cellSizeInPixels: Coords;
	cells: MapOfCellsCell[];

	constructor(sizeInCells: Coords, sizeInPixels: Coords)
	{
		this.sizeInCells = sizeInCells;
		this.sizeInPixels = sizeInPixels;

		this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
		(
			new Coords(1, 1)
		);

		this.cellSizeInPixels = this.sizeInPixels.clone().divide
		(
			this.sizeInCells
		);

		this.cells = [];
		var numberOfCells = this.sizeInCells.x * this.sizeInCells.y;

		for (var i = 0; i < numberOfCells; i++)
		{
			var cell = new MapOfCellsCell(null);
			this.cells.push(cell);
		}
	}

	cellAtPos(cellPos: Coords): MapOfCellsCell
	{
		var cellIndex = this.indexOfCellAtPos(cellPos);
		var returnValue = this.cells[cellIndex];
		return returnValue;
	}

	indexOfCellAtPos(cellPos: Coords): number
	{
		return cellPos.y * this.sizeInCells.x + cellPos.x;
	}

	posOfCell(cell: MapOfCellsCell): Coords
	{
		return this.posOfCellAtIndex(this.cells.indexOf(cell));
	}

	posOfCellAtIndex(cellIndex: number): Coords
	{
		var cellPosX = cellIndex % this.sizeInCells.x;
		var cellPosY = (cellIndex - cellPosX) / this.sizeInCells.x;

		var returnValue = new Coords
		(
			cellPosX,
			cellPosY
		);

		return returnValue;
	}
}
