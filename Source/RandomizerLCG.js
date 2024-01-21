"use strict";
class RandomizerLCG {
    constructor(multiplier, addend, modulus, firstRandom) {
        // "LCG" stands for "linear congruential generator".
        this.multiplier = multiplier;
        this.addend = addend;
        this.modulus = modulus;
        this.currentRandom = firstRandom;
    }
    getNextRandom() {
        this.currentRandom =
            ((this.multiplier
                * (this.currentRandom * this.modulus)
                + this.addend)
                % this.modulus)
                / this.modulus;
        return this.currentRandom;
    }
}
