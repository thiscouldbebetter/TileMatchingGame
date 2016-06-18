
// classes

function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;

		return this;
	}

	Coords.prototype.equals = function(other)
	{
		var returnValue = 
		(
			this.x == other.x
			&& this.y == other.y
		);

		return returnValue;
	}

	Coords.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	Coords.prototype.trimToRange = function(range)
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
