
class InputHelper
{
	keyPressed: string;

	initialize(): void
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(e: any): void
	{
		this.keyPressed = e.key;
	}
}
