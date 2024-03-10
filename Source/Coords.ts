
// classes

class Coords
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	add(other: Coords): Coords
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	clear(): Coords
	{
		this.x = 0;
		this.y = 0;

		return this;
	}

	clone(): Coords
	{
		return new Coords(this.x, this.y);
	}

	divide(other: Coords): Coords
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	divideScalar(scalar: number): Coords
	{
		this.x /= scalar;
		this.y /= scalar;

		return this;
	}

	equals(other: Coords): boolean
	{
		var returnValue = 
		(
			this.x == other.x
			&& this.y == other.y
		);

		return returnValue;
	}

	floor(): Coords
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}

	multiply(other: Coords): Coords
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	multiplyScalar(scalar: number): Coords
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	overwriteWith(other: Coords): Coords
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	subtract(other: Coords): Coords
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	trimToRange(range: Coords): Coords
	{
		if (this.x < 0)
		{
			this.x = 0;
		}
		else if (this.x > range.x)
		{
			this.x = range.x;
		}

		if (this.y < 0)
		{
			this.y = 0;
		}
		else if (this.y > range.y)
		{
			this.y = range.y;
		}

		return this;
	}
}
