/**
 * IL&FS EDUCATIONAL & TECHNOLOGY SERVICES  :
 * Class: TimeFactorClass:
 *
 * Description:
 * 
 *
 * Created By:
 *   Kamalakar.M:
 * Creation Date:
 *   March 23, 2007:
 */
/**
 * List your Imports after this comment:
 */
class TimeFactorClass {
	//
	//
	var mytimeFactor:Number;
	public function TimeFactorClass() {
		//
	}
	//
	//
	function timeScaleFactor(timeFactor:Number, minValue:Number, maxValue:Number, defaultValue:Number):Number {
		//
		if (timeFactor>minValue && timeFactor<maxValue) {
			trace("time Scale factor is number");
			mytimeFactor = Math.round(timeFactor);
		} else if (timeFactor<minValue || timeFactor>maxValue) {
			trace("time factor is range is"+minValue+" to"+maxValue+"");
			mytimeFactor = defaultValue;
		} else {
			trace("plz Enter Integer Values");
			mytimeFactor = defaultValue;
		}
		//
		return mytimeFactor;
	}
}
