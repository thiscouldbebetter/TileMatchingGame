function main()
{
	var tileDefns = TileDefn.Instances()._All;

	var viewSizeInPixels = new Coords(200, 240);

	var level = new Level
	(
		"Level0",
		30, // numberOfMovesAllowed
		50, // numberOfMatchesToWin
		tileDefns,
		new MapOfCells
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
