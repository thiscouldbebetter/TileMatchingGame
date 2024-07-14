
interface Visual
{
	clone(): Visual;
	drawToDisplayAtPos(display: Display, posToDrawAt: Coords): void;
	transformScaleByFactor(scaleFactor: number): Visual;
}