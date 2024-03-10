"use strict";
class Globals {
    initialize(millisecondsPerTimerTick, viewSizeInPixels, level) {
        this.display = new Display();
        this.display.initialize(viewSizeInPixels);
        this.level = level;
        this.randomizer = new RandomizerLCG(12345, 54321, 123456789, .12345);
        setInterval(this.handleEventTimerTick.bind(this), millisecondsPerTimerTick);
        this.inputHelper = new InputHelper();
        this.inputHelper.initialize();
    }
    // events
    handleEventTimerTick() {
        this.level.updateForTimerTick();
    }
}
Globals.Instance = new Globals();
