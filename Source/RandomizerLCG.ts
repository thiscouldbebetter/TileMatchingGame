
class RandomizerLCG
{
	multiplier: number;
	addend: number;
	modulus: number;
	currentRandom: number;

	constructor
	(
		multiplier: number,
		addend: number,
		modulus: number,
		firstRandom: number
	)
	{
		// "LCG" stands for "linear congruential generator".

		this.multiplier = multiplier;
		this.addend = addend;
		this.modulus = modulus;
		this.currentRandom = firstRandom;
	}

	getNextRandom(): number
	{
		this.currentRandom = 
		(
			(
				this.multiplier 
				* (this.currentRandom * this.modulus)
				+ this.addend
			) 
			% this.modulus
		) 
		/ this.modulus;

		return this.currentRandom;
	}
}
