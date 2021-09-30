/**
 * To:   IL&FS EDUCATIONAL & TECHNOLOGY SERVICES  :
 * Class: ScoreKeeper:
 *
 * Description:
 * This class is responsible for counting the Number:
 *
 *
 * Author:
 *   Kamalakar.M:
 * Creation Date:
 *   March 11, 2007:
 */
/**
 * List your Imports after this comment:
 */
class Graphclass {
	var Draw_mc:MovieClip;
	public function Graphclass(my_mc:MovieClip) {
		this.Draw_mc = my_mc;
	}
	function horizontalLines(moveXpos:Number, lineXpos:Number,startingPoint:Number, stepsNum:Number, howManyLines:Number) {
		var k = startingPoint;
		for (var i = 0; i<=howManyLines; i++) {
			Draw_mc.lineStyle(1, 0xDAE2E9, 100);
			Draw_mc.moveTo(moveXpos, startingPoint);
			Draw_mc.lineTo(lineXpos, startingPoint);
			startingPoint = startingPoint+stepsNum;
		}
	}
	function verticalLines(moveYpos:Number, lineYpos:Number,startingPoint:Number, stepsNum:Number, howManyLines:Number) {
		var k = startingPoint;
		for (var i = 0; i<=howManyLines; i++) {
			Draw_mc.lineStyle(1, 0xDAE2E9, 100);
			Draw_mc.moveTo(startingPoint, moveYpos);
			Draw_mc.lineTo(startingPoint, lineYpos);
			startingPoint = startingPoint+stepsNum;
		}
	}
}
