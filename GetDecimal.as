/*
 * To->:   IL&FS EDUCATIONAL & TECHNOLOGY SERVICES  :
 * Class: GetDesimal:
 *
 * Description:
 * This class is responsible for getting ExactNumber with desired
       Desimal values   :
 *
 * Author:
 *   Kamalakar.M:
 * Creation Date:
 *   March 13, 2007:
 */
/*
 * List your Imports after this comment:
 */
class GetDecimal {
	//
	public function GetDecimal() {
	}
	//
	function getExactValue(passValue:Number, decimalPlaces:Number):Number {
		var Value:Number = passValue;
		var newVal:Number = Value-Math.floor(Value);
		var multiFactor:Number = Math.pow(10, decimalPlaces);
		var anewval:Number = newVal*multiFactor;
		var thisfloor:Number = Math.round(anewval);
		var forDivision:Number = thisfloor/multiFactor;
		var ultimate:Number = (Math.floor(Value)+forDivision);
		//var myFinalNumber:Number = ultimate+oneValue;
		return ultimate;
	}
}
