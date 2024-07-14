
class VisualPolygon implements Visual
{
	color: string;
	vertices: Coords[];

	constructor(color: string, vertices: Coords[])
	{
		this.color = color;
		this.vertices = vertices;
	}

	clone(): Visual
	{
		return new VisualPolygon
		(
			this.color,
			this.vertices.map(x => x.clone() )
		);
	}

	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void
	{
		display.drawPolygonWithColorsFillAndBorderAndVerticesAtPos
		(
			this.color,
			null, // colorBorder
			this.vertices,
			posToDrawAt
		);
	}

	transformScaleByFactor(scaleFactor: number): Visual
	{
		this.vertices.forEach(x => x.multiplyScalar(scaleFactor) );
		return this;
	}
}