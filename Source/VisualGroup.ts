
class VisualGroup implements Visual
{
	children: Visual[];

	constructor(children: Visual[])
	{
		this.children = children;
	}

	clone(): Visual
	{
		return new VisualGroup(this.children.map(x => x.clone() ) );
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		this.children.forEach
		(
			x => x.drawToDisplayAtPos(display, posToDrawAt)
		);
	}

	transformScaleByFactor(scaleFactor: number): Visual
	{
		this.children.forEach
		(
			x => x.transformScaleByFactor(scaleFactor)
		);
		return this;
	}
}