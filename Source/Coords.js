"use strict";
// classes
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static create() {
        return new Coords(0, 0);
    }
    static ones() {
        return new Coords(1, 1);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    clear() {
        this.x = 0;
        this.y = 0;
        return this;
    }
    clone() {
        return new Coords(this.x, this.y);
    }
    divide(other) {
        this.x /= other.x;
        this.y /= other.y;
        return this;
    }
    divideScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    equals(other) {
        var returnValue = (this.x == other.x
            && this.y == other.y);
        return returnValue;
    }
    floor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    half() {
        return this.divideScalar(2);
    }
    invert() {
        return this.multiplyScalar(-1);
    }
    multiply(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    overwriteWith(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    trimToRange(range) {
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x > range.x) {
            this.x = range.x;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y > range.y) {
            this.y = range.y;
        }
        return this;
    }
}
