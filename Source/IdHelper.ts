
class IdHelper
{
	static _idNext = 0;

	static IdNext()
	{
		IdHelper._idNext++;
		return IdHelper._idNext;
	}
}
