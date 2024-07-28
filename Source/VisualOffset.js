"use strict";
class VisualOffset {
    constructor(offset, child) {
        this.offset = offset;
        this.child = child;
        this._posTransformed = Coords.create();
    }
    clone() {
        return new VisualOffset(this.offset.clone(), this.child.clone());
    }
    drawToDisplayAtPos(display, posToDrawAt) {
        var posTransformed = this._posTransformed
            .overwriteWith(posToDrawAt)
            .add(this.offset);
        this.child.drawToDisplayAtPos(display, posTransformed);
    }
    transformScaleByFactor(scaleFactor) {
        this.offset.multiplyScalar(scaleFactor);
        this.child.transformScaleByFactor(scaleFactor);
        return this;
    }
}
