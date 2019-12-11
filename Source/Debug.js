
function Debug()
{}
{
	Debug._idNext = 0;

	Debug.IDNext = function()
	{
		IDHelper._idNext++;
		return IDHelper._idNext;	
	}
}
