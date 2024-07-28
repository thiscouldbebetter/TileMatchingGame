
class VisualOffset implements Visual
{
	offset: Coords;
	child: Visual;

	_posTransformed: Coords;

	constructor(offset: Coords, child: Visual)
	{
		this.offset = offset;
		this.child = child;

		this._posTransformed = Coords.create();
	}

	clone(): Visual
	{
		return new VisualOffset
		(
			this.offset.clone(), this.child.clone()
		);
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		var posTransformed =
			this._posTransformed
				.overwriteWith(posToDrawAt)
				.add(this.offset);

		this.child.drawToDisplayAtPos(display, posTransformed);
	}

	transformScaleByFactor(scaleFactor: number): Visual
	{
		this.offset.multiplyScalar(scaleFactor);
		this.child.transformScaleByFactor(scaleFactor);
		return this;
	}
}