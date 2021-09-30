//
this._lockroot = true;
//
//
//trace(ther_mc1.mer_mc._height)
//TIME FACTOR OBJECT//
var TimeFactorObject: TimeFactorClass = new TimeFactorClass();
//ClsCalcCoolingCurve//
var ClsCalcCoolingObject: ClsCalcCoolingCurve = new ClsCalcCoolingCurve();
//DECIMAL VALUES//
var MathDecimal: GetDecimal = new GetDecimal();
//GRAPH//
var graphObj: Graphclass = new Graphclass(main_mc);
//graphObj.horizontalLines(moveXpos,lineXpos,startingPoint,stepsNum,howManyLines);
//
graphObj.horizontalLines(0, 300, -200, 20, 10);
graphObj.verticalLines(0, -200, 0, 20, 15);
//
function waterLevel(Increment: Number) {
	water_mc._y = 437 + ((250 - Increment) / 3.37);
}
var mass: Number = 200;
var SpHeat: Number = 4.18;
var Temp1: Number = 30;
var Power: Number = 100;
var progTime = 0;
//var timeSF = 20;
var exptTime = 0;
var Temp2;
var k = 0;
ther_mc1.therTemp_mc2._visible = true;
var intervalID: Number;
var intervalID3;
var progTime2 = 0;
var timeSF2 = 20;
var exptTime2 = 0;
var timeGV: Number;
var timeElapsed;
//
burnerOn = false;
var minValue: Number;
reset_btn._visible = false;
//
_root.expScale = 30;
//INITIALIZING
main_mc._visible = false;
graph_mc._visible = false;
timer_mc._visible = false;
tempTab_mc._visible = false;
nxtStg_mc._visible = false;
TestArea_mc._visible = false;
var burFade: Boolean = true;
//
var timeSF: Number = _root.expScale;
//
function initProg() {
	//trace("INIT PROG called");
	ther_mc1.updateTemp(Temp1);
}
//
var nextFade: Boolean = true;
//
var burFade: Boolean = true;

//
bur_mc.onPress = function () {
	//
	if (burFade) {
		timeSF = timeScaleFactor();
		//
		bur_mc.gotoAndPlay(2);
		if (!burnerOn) {
			burnerOn = true;
			intervalID = setInterval(findTemp2, 1000);
			trace("first if");
		} else {
			//burnerOn = false;
			trace("this is else");
			clearInterval(intervalID);
			water_mc.water_anim.gotoAndStop(1);
			bur_mc.gotoAndStop(1);
			if (burFade) {
				//
				nxtStg_mc._visible = true;
				TestArea_mc._visible = true;
				burFade = false;
			}
			//bur_mc._visible = false; 
			trace("BURNER is switched OFF");
			if (nextFade) {
				trace("second if");
				nxtStg_mc._visible = true;
				TestArea_mc._visible = true;
				water_mc.water_anim.gotoAndStop(1);
				nextFade = false;
			}
		}
	}
};
//
var mytimeFactor: Number;
//
function timeScaleFactor(): Number {
	timeFactor = _root.expScale;
	mytimeFactor = TimeFactorObject.timeScaleFactor(timeFactor, 1, 240, 20);
	//
	_root.expScale = mytimeFactor;
	return mytimeFactor;
}
//
tp = false;
tempCheck = 0;
//
//
function findTemp2() {
	exptTime = progTime * timeSF;
	Temp2 = ((Power * exptTime) / (mass * SpHeat)) + Temp1;
	progTime++;
	//trace("PROG TIME = "+progTime);
	//trace(burnerOn);
	//
	if (Temp2 > 70) {
		water_mc.water_anim.gotoAndPlay(460);
	}
	//                  
	if (Temp2 > 100) {
		Temp2 = 100;

		clearInterval(intervalID);
		bur_mc._visible = true;
		bur_mc.gotoAndStop(1);
		nxtStg_mc._visible = true;
		TestArea_mc._visible = true;
		water_mc.water_anim.gotoAndStop(1);
		//
		//nextFade = false;
		burFade = false;
		//
	}
	TestArea_mc.T2Value_txt.text = Temp2;
	ther_mc1.updateTemp(Temp2);
}
//
nxtStg_mc.onPress = function () {
	//main_mc.clear();
	reset_btn._visible = true;
	main_mc._visible = true;
	timer_mc._visible = true;
	tempTab_mc._visible = true;
	graph_mc._visible = true;
	nxtStg_mc._visible = false;
	TestArea_mc._visible = false;
	observeCooling();
};
//
//
var p = 0;
//
function timeLimit() {
	trace("p value=" + p);
	trace("Temp2= " + Temp2);
	if (p = 4) {
		bur_mc.gotoAndStop(1);
		//clearInterval(intervalID);
		water_mc.water_anim.gotoAndStop(1);
		//
		bur_mc._visible = false;
		//
		//
		clearInterval(intervalID2);
		observeCooling();
	}
	p++;
}
//
//
function observeCooling() {
	coolingConstant = 0.003;
	ClsCalcCoolingObject.initCoolingObj(Temp1, Temp2, coolingConstant);
	trace("Temperature when cooling starts = " + Temp2);
	currentTemp = Temp2;
	//
	graph_mc._visible = true;
	main_mc._visible = true;
	//
	intervalID3 = setInterval(getCoolingTemp, 1000);
}
//
var kp: Number = 1;
//
function getCoolingTemp() {
	//nxtStg_mc._visible = true;
	//exptTime2 = progTime2*timeSF2;
	timeSF2 = timeScaleFactor();
	exptTime2 = progTime2 * timeSF2;
	//
	minValue = exptTime2 / 60;
	currentTemp = ClsCalcCoolingObject.getTempAtTime(exptTime2);
	//
	if ((minValue % 2) == 0) {
		trace("//");
		trace("minValue=" + minValue);
		_root["tempTab_mc.Time" + kp] = minValue;
		_root["tempTab_mc.Temp" + kp] = currentTemp;
		kp++;
		trace("//");
	}
	//                          
	ther_mc1.updateTemp(currentTemp);
	//
	exptTime2milliseconds = exptTime2 * 1000;
	timer_mc.beginTimer(exptTime2milliseconds);
	//
	DrawGraph((exptTime2 / 6), (-currentTemp * 2));
	//
	progTime2++;
	trace("x position value=" + (exptTime2 / 6));
	if (currentTemp <= (Temp1 + 0.5) || ((exptTime2 / 6) > 300)) {
		trace("cooling loop terminated");
		trace("currentTemp=" + currentTemp);
		clearInterval(intervalID3);
		//
	}
}
//
//getTempAtTime(timeElapsed:Number):Number{
var fade: Boolean = true;
function DrawGraph(timeGV: Number, tempGV: Number) {
	graph_mc.lineStyle(2, 0x000FF, 100);
	if (fade) {
		graph_mc.moveTo(0, (-Temp2 * 2));
		fade = false;
	}
	graph_mc.lineTo(timeGV, tempGV);
}
//}
reset_btn.onPress = function () {
	burFade = true;
	//timer_mc.timer_txt=00:00;
	timer_mc.dy_txt.text = "00" + ":" + "00";
	bur_mc._visible = true;
	//s4.update(250);
	burFade = true;
	s4._min = 200;
	s4._max = 400;
	s4._default = 250;
	s4.update(250);
	s4.init();
	//
	tempTab_mc._visible = false;
	graph_mc._visible = false;
	main_mc._visible = false;
	ther_mc1.mer_mc._height = 50;
	burnerOn = false;
	timer_mc._visible = false;
	_root.expScale = 30;
	//
	nxtStg_mc._visible = false;
	TestArea_mc._visible = false;
	mass = 200;
	SpHeat = 4.18;
	Temp1 = 30;
	ther_mc1.updateTemp(Temp1);
	Power = 100;
	progTime = 0;
	//var timeSF = 20;
	//ther_mc1.therTemp_mc2 = 30;
	exptTime = 0;
	//main_mc.clear();
	graph_mc.clear();
	Temp2;
	for (n = 0; n < 15; n++) {
		_root["tempTab_mc.Time" + n] = "";
		_root["tempTab_mc.Temp" + n] = "";
	}
	k = 0;
	ther_mc1.therTemp_mc2._visible = true;
	intervalID;
	intervalID3;
	progTime2 = 0;
	timeSF2 = 20;
	exptTime2 = 0;
	fade = true;
	//timeGV=0;
	//tempGV=0;
	//
	timeElapsed;
	kp = 1;
	//
	burnerOn = false;
	reset_btn._visible = false;
	//
	clearInterval(intervalID3);
	clearInterval(intervalID);
	clearInterval(intervalID2);
};
