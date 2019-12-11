
function Globals()
{}
{
	Globals.Instance = new Globals();

	Globals.prototype.initialize = function
	(
		millisecondsPerTimerTick, 
		viewSizeInPixels,
		level
	)
	{
		this.displayHelper = new DisplayHelper();
		var useColors = true;
		this.displayHelper.initialize(useColors, viewSizeInPixels);

		this.level = level;

		this.randomizer = new RandomizerLCG
		(
			12345,
			54321,
			123456789,
			.12345
		);

		setInterval
		(
			this.handleEventTimerTick.bind(this),
			millisecondsPerTimerTick
		);		

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();
	}

	// events

	Globals.prototype.handleEventTimerTick = function()
	{
		this.level.updateForTimerTick();
	}
}
