
class VisualCircle implements Visual
{
	color: string;
	radius: number;

	constructor(color: string, radius: number)
	{
		this.color = color;
		this.radius = radius;
	}

	clone(): Visual
	{
		return new VisualCircle(this.color, this.radius );
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		display.drawCircleWithColorsFillAndBorderOfRadiusAtPos
		(
			this.color,
			null, // colorBorder
			this.radius,
			posToDrawAt
		);
	}

	transformScaleByFactor(scaleFactor: number): Visual
	{
		this.radius *= scaleFactor;
		return this;
	}
}