class ClsCalcCoolingCurve {
	//
	//..............PROPERTIES...........declared here
	//
	// Ambient Temperature - user given
	var Ta:Number;
	//
	// Temperature at time zero - user given
	var T0:Number;
	//
	// Current Temperature - calculated value - returned
	var Tc:Number;
	//
	// Constant which governs the rate of cooling - user given
	var k:Number;
	//
	//........METHODS..........begin here
	//
	//Constructor......
	public function ClsCalcCoolingCurve() {
//
	}
	//
	//
	//Constructor......
	public function initCoolingObj(mTa:Number, mT0:Number, mk:Number) {
		Ta = mTa;
		T0 = mT0;
		k = mk;
		trace("cooling obj created" + Ta + "  " + T0 + "  " + k );
	}
	//
	
	//
	public function getTempAtTime(timeElapsed:Number):Number {
		//
		trace("getTempAtTime called");
		//
		
		// this is the maximum temperature diff, i.e. betn temp at zero time and ambient temp
		var maxTempDiff:Number = T0-Ta;
		//
		// this is the product of time elapsed (sec) and -k, i.e. Constant of cooling rate 
		var netCoolingFactor:Number;
		netCoolingFactor = (-1)*timeElapsed*k;
		//
		// equation to calculate Current Temp
		Tc = Ta+((maxTempDiff)*Math.exp(netCoolingFactor));
		trace(Tc);
		//
		return Tc;
	}
	//
	//
	//Class close bracket
}
