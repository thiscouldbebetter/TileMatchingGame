
function Map(sizeInCells, sizeInPixels)
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
		var cell = new MapCell(null);
		this.cells.push(cell);
	}
}

{
	Map.prototype.cellAtPos = function(cellPos)
	{
		var cellIndex = this.indexOfCellAtPos(cellPos);
		var returnValue = this.cells[cellIndex];
		return returnValue;
	}

	Map.prototype.indexOfCellAtPos = function(cellPos)
	{
		return cellPos.y * this.sizeInCells.x + cellPos.x;
	}

	Map.prototype.posOfCell = function(cell)
	{
		return this.posOfCellAtIndex(this.cells.indexOf(cell));
	}

	Map.prototype.posOfCellAtIndex = function(cellIndex)
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
