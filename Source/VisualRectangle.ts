
class VisualRectangle implements Visual
{
	color: string;
	size: Coords;

	constructor(color: string, size: Coords)
	{
		this.color = color;
		this.size = size;
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		display.drawRectangleWithColorFillBorderSizeAtPos
		(
			this.color,
			null, // colorBorder
			this.size,
			posToDrawAt
		);
	}
}