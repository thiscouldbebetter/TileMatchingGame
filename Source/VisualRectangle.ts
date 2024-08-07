
class VisualRectangle implements Visual
{
	color: string;
	size: Coords;

	constructor(color: string, size: Coords)
	{
		this.color = color;
		this.size = size;
	}

	clone(): Visual
	{
		return new VisualRectangle(this.color, this.size.clone() );
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		display.drawRectangleWithColorsFillAndBorderOfSizeCenteredAtPos
		(
			this.color,
			null, // colorBorder
			this.size,
			posToDrawAt
		);
	}

	transformScaleByFactor(scaleFactor: number): Visual
	{
		this.size.multiplyScalar(scaleFactor);
		return this;
	}
}