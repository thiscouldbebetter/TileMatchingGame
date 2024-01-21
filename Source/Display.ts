
class Display
{
	viewSizeInPixels: Coords;

	colorBackground: string;
	colorBorderAndText: string;
	colorHighlight: string;
	graphics: any;
	useColors: boolean;

	drawPos: Coords;
	drawSize: Coords;

	constructor()
	{
		this.colorBackground = "White";
		this.colorBorderAndText = "Gray";
		this.colorHighlight = "Black";
	}

	clear(): void
	{
		var g = this.graphics;

		var size = this.viewSizeInPixels;

		g.fillStyle = this.colorBackground;
		g.fillRect
		(
			0, 0, 
			size.x, 
			size.y
		);

		g.strokeStyle = this.colorBorderAndText;
		g.strokeRect
		(
			0, 0, 
			size.x, 
			size.y
		);
	}

	drawLevel(level: Level): void
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

		var g = this.graphics;

		if (cursor.isTileSelected)
		{
			g.strokeStyle = this.colorHighlight;
		}
		else
		{
			g.strokeStyle = this.colorBorderAndText;
		}
		
		g.strokeRect
		(
			this.drawPos.x,
			this.drawPos.y,
			cursorSizeInPixels.x,
			cursorSizeInPixels.y
		);

		var fontHeight = 10; // hack

		g.fillStyle = this.colorBorderAndText;
		g.fillText
		(
			"Matches:" + level.numberOfMatchesSoFar + "/" + level.numberOfMatchesToWin,
			2, 
			levelMap.sizeInPixels.y + fontHeight
		);

		g.fillText
		(
			"Moves:" + level.numberOfMovesSoFar + "/" + level.numberOfMovesAllowed,
			2, 
			levelMap.sizeInPixels.y + (fontHeight * 2)
		);
	}

	drawMap(map: MapOfCells): void
	{
		var mapSizeInCells = map.sizeInCells;
		var cellSizeInPixels = map.cellSizeInPixels;

		var cellPos = new Coords(0, 0);
		var drawPos = this.drawPos;

		var g = this.graphics;

		g.strokeStyle = "LightGray";

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

				g.strokeRect
				(
					drawPos.x,
					drawPos.y,
					cellSizeInPixels.x,
					cellSizeInPixels.y
				);
			}
		}
	}

	drawTile(tile: Tile, map: MapOfCells): void
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

		var g = this.graphics;

		if (this.useColors)
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
			);

			g.fillStyle = tileDefn.color;
			g.fillRect
			(
				drawPos.x, drawPos.y,
				drawSize.x, drawSize.y
			);
		}
		else
		{
			var tileWidth = g.measureText(tileDefn.symbol).width;

			if (tileFractionOfLifeRemaining == null)
			{
				g.fillStyle = this.colorBorderAndText;
				g.fillText
				(
					tileDefn.symbol,
					drawPos.x + (mapCellSizeInPixels.x - tileWidth) / 2,
					drawPos.y + mapCellSizeInPixels.y * .6
				);
			}
			else 
			{
				g.fillStyle = "Black";
				g.fillText
				(
					tileDefn.symbol,
					drawPos.x + (mapCellSizeInPixels.x - tileWidth) / 2,
					drawPos.y + mapCellSizeInPixels.y * .6
				);

				if (tileFractionOfLifeRemaining < 1)
				{
					var alpha = 1 - tileFractionOfLifeRemaining;
					g.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
					g.fillRect
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

	initialize(useColors: boolean, viewSizeInPixels: Coords): void
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
