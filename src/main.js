function main()
{
	var tileDefns = 
	[
		new TileDefn("A", "Red"),
		new TileDefn("B", "Orange"),
		new TileDefn("C", "Yellow"),
		new TileDefn("D", "Green"),
		new TileDefn("E", "Blue"),
		new TileDefn("F", "Purple"),
	];

	tileDefns.addLookups("symbol");

	var viewSizeInPixels = new Coords(200, 240);

	var level = new Level
	(
		"Level0",
		30, // numberOfMovesAllowed
		50, // numberOfMatchesToWin
		tileDefns,
		new Map
		(
			new Coords(9, 9),
			new Coords(200, 200)
		)
	);

	Globals.Instance.initialize
	(
		200, // millisecondsPerTimerTick
		viewSizeInPixels,
		level
	);
}
