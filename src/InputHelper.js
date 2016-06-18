
function InputHelper()
{}
{
	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	InputHelper.prototype.handleEventKeyDown = function(e)
	{
		this.keyCode = e.keyCode;
	}
}
