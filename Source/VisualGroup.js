"use strict";
class VisualGroup {
    constructor(children) {
        this.children = children;
    }
    clone() {
        return new VisualGroup(this.children.map(x => x.clone()));
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        this.children.forEach(x => x.drawToDisplayAtPos(display, posToDrawAt));
    }
    transformScaleByFactor(scaleFactor) {
        this.children.forEach(x => x.transformScaleByFactor(scaleFactor));
        return this;
    }
}
