
class TileDefn
{
	symbol: string;
	color: string;
	visual: Visual;

	constructor
	(
		symbol: string,
		color: string,
		visual: Visual
	)
	{
		this.symbol = symbol;
		this.color = color;
		this.visual = visual;
	}

	static _instances: TileDefn_Instances;
	static Instances(): TileDefn_Instances
	{
		if (TileDefn._instances == null)
		{
			TileDefn._instances = new TileDefn_Instances();
		}
		return TileDefn._instances;
	}
}

class TileDefn_Instances
{
	A: TileDefn;
	B: TileDefn;
	C: TileDefn;
	D: TileDefn;
	E: TileDefn;
	F: TileDefn;

	_All: TileDefn[];

	constructor()
	{
		var tileDimension = 24;
		var tileDimensionHalf = tileDimension / 2;

		var tileSize =
			Coords.ones().multiplyScalar(tileDimension);

		var radiusHighlight = tileDimension / 8;

		var visualHighlight = new VisualOffset
		(
			Coords.ones().invert().multiplyScalar(radiusHighlight),
			new VisualGroup
			([
				new VisualCircle("Black", radiusHighlight),
				new VisualOffset
				(
					Coords.ones().invert().multiplyScalar(1),
					new VisualCircle("White", radiusHighlight * .5)
				)
			])
		);

		// Circle.
		var vc = (color: string) =>
			new VisualGroup
			([
				new VisualCircle(color, tileDimensionHalf * .8),

				visualHighlight
			]);

		// Square.
		var vs = (color: string) =>
			new VisualGroup
			([
				new VisualRectangle
				(
					color,
					tileSize.clone().multiplyScalar(.8)
				),

				visualHighlight
			]);

		// Triangle.
		var vt = (color: string) =>
			new VisualGroup
			([
				new VisualPolygon
				(
					color,
					[
						new Coords(0, -tileDimensionHalf),
						new Coords(tileDimensionHalf, tileDimensionHalf),
						new Coords(-tileDimensionHalf, tileDimensionHalf)
					]
				).transformScaleByFactor(.8),

				visualHighlight
			]);

		// Triangle inverted.
		var vti = (color: string) =>
			new VisualGroup
			([
				new VisualPolygon
				(
					color,
					[
						new Coords(0, tileDimensionHalf),
						new Coords(tileDimensionHalf, -tileDimensionHalf),
						new Coords(-tileDimensionHalf, -tileDimensionHalf)
					]
				).transformScaleByFactor(.8),

				visualHighlight
			]);

		// Star.
		var vstar = (color: string) =>
		{
			var pointsPerTurn = 5;
			var verticesPerTurn = pointsPerTurn * 2;
			var radiansPerTurn = Math.PI * 2;
			var radiansPerVertex = radiansPerTurn / verticesPerTurn;

			var vertices = new Array<Coords>();

			for (var v = 0; v < verticesPerTurn; v++)
			{
				var angleInRadians = v * radiansPerVertex;

				var radiusMultiplier =
					(v % 2 == 0)
					? 1
					: .5;

				var radius = tileDimensionHalf * radiusMultiplier;

				var x = Math.cos(angleInRadians) * radius;
				var y = Math.sin(angleInRadians) * radius;

				var vertex = new Coords(x, y);

				vertices.push(vertex);
			}

			return new VisualGroup
			([
				new VisualPolygon(color, vertices),
				visualHighlight
			]);
		}

		// Hexagon.
		var vhexagon = (color: string) =>
		{
			var verticesPerTurn = 6;
			var radiansPerTurn = Math.PI * 2;
			var radiansPerVertex = radiansPerTurn / verticesPerTurn;

			var vertices = new Array<Coords>();

			var radius = tileDimensionHalf;

			for (var v = 0; v < verticesPerTurn; v++)
			{
				var angleInRadians = v * radiansPerVertex;

				var x = Math.cos(angleInRadians) * radius;
				var y = Math.sin(angleInRadians) * radius;

				var vertex = new Coords(x, y);

				vertices.push(vertex);
			}

			var visualBody = new VisualPolygon
			(
				color,
				vertices
			);

			visualBody.transformScaleByFactor(.9);

			var visual = new VisualGroup
			([
				visualBody,
				visualHighlight
			]);

			return visual;
		}

		this.A = new TileDefn("A", "Red", vs("Red") );
		this.B = new TileDefn("B", "Orange", vt("Orange") );
		this.C = new TileDefn("C", "Yellow", vti("Yellow") );
		this.D = new TileDefn("D", "Green", vc("Green") );
		this.E = new TileDefn("E", "Blue", vstar("Blue") );
		this.F = new TileDefn("F", "Purple", vhexagon("Purple") );

		this._All =
		[
			this.A,
			this.B,
			this.C,
			this.D,
			this.E,
			this.F
		];
	}
}