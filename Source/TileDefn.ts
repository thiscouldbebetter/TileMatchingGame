
class TileDefn
{
	symbol: string;
	color: string;
	visual: Visual;

	constructor(symbol: string, color: string, visual: Visual)
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
		var tileSize = new Coords(100, 100); // todo
		var v = (color: string) => new VisualRectangle(color, tileSize);

		this.A = new TileDefn("A", "Red", v("Red") );
		this.B = new TileDefn("B", "Orange", v("Orange") );
		this.C = new TileDefn("C", "Yellow", v("Yellow") );
		this.D = new TileDefn("D", "Green", v("Green") );
		this.E = new TileDefn("E", "Blue", v("Blue") );
		this.F = new TileDefn("F", "Purple", v("Purple") );

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