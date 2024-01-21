"use strict";
class InputHelper {
    initialize() {
        document.body.onkeydown = this.handleEventKeyDown.bind(this);
    }
    // events
    handleEventKeyDown(e) {
        this.keyPressed = e.key;
    }
}
