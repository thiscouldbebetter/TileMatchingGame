function ArrayExtensions()
{
	// extension class
}
{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var element = this[i];
			var keyValue = element[keyName];
			this[keyValue] = element;
		}
	}
}
