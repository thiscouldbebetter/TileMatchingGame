
function DisplayHelper()
{}
{
	DisplayHelper.prototype.clear = function()
	{
		this.graphics.fillStyle = "White";
		this.graphics.fillRect
		(
			0, 0, 
			this.viewSizeInPixels.x, 
			this.viewSizeInPixels.y
		);

		this.graphics.strokeStyle = "LightGray";
		this.graphics.strokeRect
		(
			0, 0, 
			this.viewSizeInPixels.x, 
			this.viewSizeInPixels.y
		);
	}

	DisplayHelper.prototype.drawLevel = function(level)
	{
		this.clear();

		var levelMap = level.map;
		var mapCellSizeInPixels = levelMap.cellSizeInPixels;

		this.drawMap(level.map);

		var tiles = level.tiles;

		for (var i = 0; i < tiles.length; i++)
		{
			var tile = tiles[i];
			this.drawTile
			(
				tile, 
				levelMap
			);
		}

		var cursor = level.cursor;

		this.drawPos.overwriteWith
		(
			cursor.pos
		).add
		(
			new Coords(.25, .25)
		).multiply
		(
			mapCellSizeInPixels
		);

		var cursorSizeInPixels = mapCellSizeInPixels.clone().divideScalar(2);

		if (cursor.isTileSelected == true)
		{
			this.graphics.strokeStyle = "Black";
		}
		else
		{
			this.graphics.strokeStyle = "LightGray";
		}
		
		this.graphics.strokeRect
		(
			this.drawPos.x,
			this.drawPos.y,
			cursorSizeInPixels.x,
			cursorSizeInPixels.y
		);

		var fontHeight = 10; // hack

		this.graphics.fillStyle = "LightGray";
		this.graphics.fillText
		(
			"Matches:" + level.numberOfMatchesSoFar + "/" + level.numberOfMatchesToWin,
			2, 
			levelMap.sizeInPixels.y + fontHeight
		);

		this.graphics.fillText
		(
			"Moves:" + level.numberOfMovesSoFar + "/" + level.numberOfMovesAllowed,
			2, 
			levelMap.sizeInPixels.y + (fontHeight * 2)
		);
	}

	DisplayHelper.prototype.drawMap = function(map)
	{
		var mapSizeInCells = map.sizeInCells;
		var cellSizeInPixels = map.cellSizeInPixels;

		var cellPos = new Coords(0, 0);
		var drawPos = this.drawPos;

		this.graphics.strokeStyle = "LightGray";
	
		for (var y = 0; y < mapSizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				drawPos.overwriteWith
				(
					cellPos
				).multiply
				(
					cellSizeInPixels
				);

				this.graphics.strokeRect
				(
					drawPos.x,
					drawPos.y,
					cellSizeInPixels.x,
					cellSizeInPixels.y
				);
			}
		}
	}

	DisplayHelper.prototype.drawTile = function(tile, map)
	{
		var tileDefn = tile.defn();
		var mapCellSizeInPixels = map.cellSizeInPixels;
		var tilePos = map.posOfCell(tile.cell);

		var drawPos = this.drawPos.overwriteWith
		(
			tilePos
		).multiply
		(
			mapCellSizeInPixels
		);

		var drawSize = this.drawSize.overwriteWith
		(
			mapCellSizeInPixels
		);

		var tileFractionOfLifeRemaining = 
		(
			tile.ticksToLive == null ? null : (tile.ticksToLive / Level.TicksToEliminateTile)
		)

		if (this.useColors == true)
		{
			if (tileFractionOfLifeRemaining != null)
			{
				drawSize = drawSize.multiplyScalar
				(
					tileFractionOfLifeRemaining
				);
			}

			drawPos.add
			(
				mapCellSizeInPixels.clone().subtract
				(
					drawSize
				).divideScalar(2)
			)

			this.graphics.fillStyle = tileDefn.color;
			this.graphics.fillRect
			(
				drawPos.x,
				drawPos.y,
				drawSize.x,
				drawSize.y
			);
		}
		else
		{
			var tileWidth = this.graphics.measureText(tileDefn.symbol).width;


			if (tileFractionOfLifeRemaining == null)
			{
				this.graphics.fillStyle = "LightGray";
				this.graphics.fillText
				(
					tileDefn.symbol,
					drawPos.x + (mapCellSizeInPixels.x - tileWidth) / 2,
					drawPos.y + mapCellSizeInPixels.y * .6
				);
			}
			else 
			{
				this.graphics.fillStyle = "Black";
				this.graphics.fillText
				(
					tileDefn.symbol,
					drawPos.x + (mapCellSizeInPixels.x - tileWidth) / 2,
					drawPos.y + mapCellSizeInPixels.y * .6
				);
					
				if (tileFractionOfLifeRemaining < 1)
				{
					var alpha = 1 - tileFractionOfLifeRemaining;
					this.graphics.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
					this.graphics.fillRect
					(
						drawPos.x,
						drawPos.y,
						drawSize.x,
						drawSize.y	
					);
				}
			}
		}
	}

	DisplayHelper.prototype.initialize = function(useColors, viewSizeInPixels)
	{
		this.useColors = useColors;

		this.viewSizeInPixels = viewSizeInPixels;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSizeInPixels.x;
		canvas.height = this.viewSizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);

		this.drawPos = new Coords(0, 0);
		this.drawSize = new Coords(0, 0);
	}
}
