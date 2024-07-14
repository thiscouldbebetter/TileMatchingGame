
class Display
{
	viewSizeInPixels: Coords;

	colorBackground: string;
	colorBorderAndText: string;
	colorHighlight: string;
	graphics: any;

	_centerPos: Coords;
	_drawPos: Coords;
	_drawSize: Coords;

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
			size.x, size.y
		);

		g.strokeStyle = this.colorBorderAndText;
		g.strokeRect
		(
			0, 0, 
			size.x, size.y
		);
	}

	drawCircleWithColorsFillAndBorderOfRadiusAtPos
	(
		colorFill: string, colorBorder: string,
		radius: number, pos: Coords
	)
	{
		var g = this.graphics;

		g.beginPath();

		g.arc
		(
			pos.x, pos.y,
			radius,
			0, Math.PI * 2
		);

		if (colorFill != null)
		{
			g.fillStyle = colorFill;
			g.fill();
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder;
			g.stroke();
		}
	}

	drawPolygonWithColorsFillAndBorderAndVerticesAtPos
	(
		colorFill: string, colorBorder: string,
		vertices: Coords[], pos: Coords
	): void
	{
		var g = this.graphics;

		g.beginPath();

		for (var i = 0; i < vertices.length; i++)
		{
			var vertex = vertices[i];

			var drawPos =
				this._drawPos
					.overwriteWith(vertex)
					.add(pos);

			if (i == 0)
			{
				g.moveTo(drawPos.x, drawPos.y);
			}
			else
			{
				g.lineTo(drawPos.x, drawPos.y);
			}
		}

		g.closePath();

		if (colorFill != null)
		{
			g.fillStyle = colorFill;
			g.fill();
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder;
			g.stroke();
		}

	}

	drawRectangleWithColorsFillAndBorderOfSizeCenteredAtPos
	(
		colorFill: string, colorBorder: string,
		size: Coords, centerPos: Coords
	)
	{
		this.drawRectangleWithColorFillBorderSizeAtPos
		(
			colorFill, colorBorder,
			size,
			this._centerPos
				.overwriteWith(size)
				.half()
				.invert()
				.add(centerPos)
		);
	}

	drawRectangleWithColorFillBorderSizeAtPos
	(
		colorFill: string, colorBorder: string,
		size: Coords, pos: Coords
	): void
	{
		var g = this.graphics;

		if (colorFill != null)
		{
			g.fillStyle = colorFill;
			g.fillRect(pos.x, pos.y, size.x, size.y);
		}
		
		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder;
			g.strokeRect(pos.x, pos.y, size.x, size.y);
		}
	}

	drawTextWithColorAndHeightAtPos
	(
		text: string, color: string, heightInPixels: number, pos: Coords
	): void
	{
		var g = this.graphics;
		g.fillStyle = color;
		g.font = "" + heightInPixels + "px sans-serif";
		g.fillText(text, pos.x, pos.y);
	}

	initialize(viewSizeInPixels: Coords): void
	{
		this.viewSizeInPixels = viewSizeInPixels;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSizeInPixels.x;
		canvas.height = this.viewSizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);

		this._centerPos = Coords.create();
		this._drawPos = Coords.create();
		this._drawSize = Coords.create();
	}
}
