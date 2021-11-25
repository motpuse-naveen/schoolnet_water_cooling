//Basic Template initialise start
// copper - incremental of 1
// iron - incremental of 9
// brass - incremental of 2
// bronze - incremental of 1
var noOfSlides;
var slides = document.getElementsByClassName("Slides");
var slideIndex = 1;
var currentslide;
var metalBall = "";
var metalBallD = "";
let timer;
let ballDiameter = "2";
let incremental = 0;
let copperVal = 0.000001;
let ironVal = 0.000009;
let brassVal = 0.000002;
let bronzeVal = 0.000001;
let metalVal = 0;
let settimerV = '';
let coolTimerS = false;

var showSlides = function () {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  currentslide = slides[slideIndex - 1];
  slides[slideIndex - 1].style.display = "block";
}
//Basic Template initialise ends

//Observation Tab scroll
$(document).on('click', '#downScroller', function () {
  $('#contentsName').css('top', '-177px')
  $('#upScroller').css('display', 'block')
});

$(document).on('click', '#upScroller', function () {
  $('#contentsName').css('top', '33px')
});


//File close Func
$(document).on('click', '#closeBtn', function () {
  window.close();
});

//Worksheet Func starts
$('#workSheetDiv').on('click', function () {
  $('#file-input').trigger('click');
});
function OpenWord() {
  var mylink = document.getElementById("MyLink");
  mylink.setAttribute("href", "assets/docs/watercooling_word.doc");
  mylink.click();
}
//Worksheet Func ends

$(document).ready(function () {
  InitBrowserAttribute();
  InitOSAttribute();
  showSlides(slideIndex);
  WaterCoolingChart.init([{ "x": 0, "y": 0 }]);
});

var procedCount = 1;
$('.prevProcd').on('click', function () {
  if (procedCount > 2) {
    procedCount--;
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 1;
    $('.prevProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});
$('.nextProcd').on('click', function () {
  if (procedCount < 5) {
    procedCount++;
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 6;
    $('.nextProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcd').addClass('closeProcdAfter');
  $('.closeProcd').removeClass('closeProcdBefore');
  $('.closeProcd').attr('src', 'assets/images/closeProd.gif').css('cursor', 'pointer');
});
$('.closeProcd').on('mouseout', function () {
  $('.closeProcd').addClass('closeProcdBefore');
  $('.closeProcd').removeClass('closeProcdAfter');
  $('.closeProcd').attr('src', 'assets/images/closeUp.png');
});

$('.procdClick, .procopentxt').on('mouseover', function () {
  $('.procdClick').attr('src', 'assets/images/procdHover.gif');
  $('.procdClick').css('cursor', 'pointer');
  $(".procopentxt").addClass("show")
});
$('.procdClick, .procopentxt').on('mouseout', function () {
  $('.procdClick').attr('src', 'assets/images/procdClick.png');
  $(".procopentxt").removeClass("show")
});

$('.procdClick,.procopentxt').on('click', function () {
  $('.procdClick').css('display', 'none');
  $(".procopentxt").removeClass("show")
  $('.procdAnim').attr('src', 'assets/images/procedure.gif').css('display', 'block');
  setTimeout(() => {
    $('.mainProcdiv').css('display', 'block');
  }, 3800);
});

$('.closeProcd').on('click', function () {
  $('.mainProcdiv').css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/closeProcdiv.gif').css('display', 'block');
  setTimeout(() => {
    $('.procdClick').css('display', 'block');
    $('.procdAnim').css('display', 'none');
  }, 1900);
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcdTxt').css('display', 'block');
});

$('.closeProcd').on('mouseout', function () {
  $('.closeProcdTxt').css('display', 'none');
});

$('.showObj').on('mouseover', function () {
  $(this).attr('src', 'assets/images/showObj.gif').css('cursor', 'pointer');
  $('.contentContainer, .tableContainer, .mainstand, .graphTempVsTime, .threshold, .timerDiv, .thermeterGroup, .standContainer .opactermometer').addClass("opac3")

  if (procedCount == 1 || procedCount == 3) {
    $(".standContainer .opacburner").show().removeClass("opac3")
  }
  if (procedCount == 2) {
    $(".standContainer .opactermometer").removeClass("opac3")
    $(".standContainer .thermeterGroup").removeClass("opac3")
  }
  if (procedCount == 4) {
    $(".threshold").removeClass("opac3")
    $(".threshold .thresholdText").addClass("opac3")
  }
  if (procedCount == 5) {
    $(".standContainer .opactermometer").removeClass("opac3")
    $(".standContainer .thermeterGroup").removeClass("opac3")
    $(".mainstand").removeClass("opac3");
    $(".burner-base-opac").show();
  }
  if (procedCount == 6) {
    $(".contentContainer").removeClass("opac3")
  }
});

$('.showObj').on('mouseout', function () {
  $(this).attr('src', 'assets/images/showObjM.gif');
  $('.contentContainer, .tableContainer,.mainstand, .graphTempVsTime, .threshold, .timerDiv, .thermeterGroup').removeClass("opac3")
  $(".standContainer .opacburner").hide().removeClass("opac3")
  $(".standContainer .opactermometer").removeClass("opac3")
  $(".threshold .thresholdText").removeClass("opac3")
  $(".burner-base-opac").hide();
});

var timeSF2 = 20;
var expScale = 30;
var timeSF = expScale;
var burnerOn = false;
var intervalID;
var exptTime = 0;
var mass = 200;
var SpHeat = 4.18;
var Temp1 = 30;
var Temp2 = 30;
var Power = 100;
var progTime = 0;

function timeScaleFactor() {
  timeFactor = expScale;
  var mytimeFactor = TimeFactorObject.timeScaleFactor(timeFactor, 1, 240, 20);
  expScale = mytimeFactor;
  return mytimeFactor;
}

function updateTemperature(temperature) {
  //Nav: Update temperature in textbox
  $(".standContainer .txtTemp").text(temperature)
  //Nav: Update thermometer
  $(".termameterredbar").css({ "height": temperature + "%" })
}

function ObserveHeating() {
  exptTime = progTime * timeSF;
  Temp2 = ((Power * exptTime) / (mass * SpHeat)) + Temp1;
  //Temp2 = Number(Temp2.toFixed(2));
  Temp2 = Number(toTrunc(Temp2, 2));
  progTime++;
  if (Temp2 > 30) {
    //water_mc.water_anim.gotoAndPlay(460);
    $(".boilingwater").show();
    if ($(".boilingwater").find("img").length <= 0) {
      $(".boilingwater").append($('<img src="assets/images/crops/bbl-v2.gif">'))
    }
  }
  if (Temp2 > 100) {
    Temp2 = 100;
    bur_mc_auto_off()
  }
  updateTemperature(Temp2)
}

$(".burnerKnob .layer1, .burnerKnob .layer2, .burnerKnob .layer3").on('click', function () {
  //debugger;
  
  if ($(this).closest(".burnerKnob").hasClass("off")) {
    bur_mc_on()
  }
  else {
    bur_mc_off()
  }
})

$('.resetDiv').on('click', function () {
  $('.clockText').text("00:00");
  $(".threshold").hide();
  $(".timerDiv").hide();
  $(".graphTempVsTime").hide();
  $(".resetDiv").hide();
  $(".tableContainer").hide();
  $(".graphic-normal").show();
  $(".graphic-active").hide();
  $(".burnerKnob").show();
  $(".boilingwater").hide();
  $(".boilingwater").empty();
  timeSF2 = 20;
  expScale = 30;
  timeSF = expScale;
  burFade = true;
  burnerOn = false;
  clearInterval(intervalID);
  exptTime = 0;
  Temp1 = 30;
  Temp2 = 30;
  progTime = 0;
  updateTemperature(Temp2)

  kp = 1;
  intervalID3;
  progTime2 = 0;
  timeSF2 = 20;
  exptTime2 = 0;
  clearInterval(intervalID3);
  $("#tableCoolingTemp tbody tr td").html("&nbsp;");
});


function bur_mc_on() {
  $(".burnerKnob").addClass("on").removeClass("off")
  $(".graphic-normal").hide();
  $(".graphic-active").show();

  clearInterval(intervalID);
  $(".threshold").hide();
  $(".boilingwater").hide();
  $(".boilingwater").empty();

  timeSF = timeScaleFactor();
  if (!burnerOn) {
    burnerOn = true;
    intervalID = setInterval(ObserveHeating, 1000);
  }
}
function bur_mc_off() {
  $(".burnerKnob").addClass("off").removeClass("on")
  $(".graphic-normal").show();
  $(".graphic-active").hide();

  clearInterval(intervalID);
  $(".threshold").show();
  $(".threshold .heatedToTempVal").text(Temp2);
  $(".burnerKnob").hide();
  //$(".boilingwater").hide();
  $(".boilingwater").empty();
  if(Temp2>=30 && Temp2<40){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_30-40.gif">'))
  }
  if(Temp2>=40 && Temp2<50){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_40-50.gif">'))
  }
  if(Temp2>=50 && Temp2<60){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_50-60.gif">'))
  }
  if(Temp2>=60 && Temp2<70){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_60-70.gif">'))
  }
  if(Temp2>=70 && Temp2<80){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_70-80.gif">'))
  }
  if(Temp2>=80 && Temp2<90){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_80-90.gif">'))
  }
  if(Temp2>=90){
    $(".boilingwater").append($('<img src="assets/images/crops/frame_90-100.gif">'))
  }
}
function bur_mc_auto_off() {
  bur_mc_off();
}

$(".gotonextstepbtn").on('click', function () {
  $(".threshold").hide();
  $(".timerDiv").show();
  $(".graphTempVsTime").show();
  $(".resetDiv").show();
  $(".tableContainer").show();

  StartCooling();
})

var kp = 1;
var intervalID3;
var progTime2 = 0;
var timeSF2 = 20;
var exptTime2 = 0;


function StartCooling() {
  var coolingConstant = 0.003;
  ClsCalcCoolingObject.initCoolingObj(Temp1, Temp2, coolingConstant);

  WaterCoolingChart.init([{ "x": 0, "y": 0 }]);
  intervalID3 = setInterval(ObserveCooling, 1000);
}

function ObserveCooling() {
  timeSF2 = timeScaleFactor();
  exptTime2 = progTime2 * timeSF2;
  minValue = exptTime2 / 60;

  var currentTemp = ClsCalcCoolingObject.getTempAtTime(exptTime2);
  currentTemp = Number(toTrunc(currentTemp, 2));
  WaterCoolingChart.update({ x: minValue, y: Number(toTrunc(currentTemp, 1)) })
  if ((minValue % 2) == 0) {
    $("#tableCoolingTemp tbody tr:nth-child(" + kp + ") td:nth-child(1)").text(minValue);
    if (Number(currentTemp) == 100) {
      $("#tableCoolingTemp tbody tr:nth-child(" + kp + ") td:nth-child(2)").text(100);
    }
    else {
      $("#tableCoolingTemp tbody tr:nth-child(" + kp + ") td:nth-child(2)").text(toTrunc(currentTemp, 1).toFixed(1));
    }
    kp++;
  }
  
  updateTemperature(currentTemp);
  if(currentTemp<100 && currentTemp>=90){
    $(".boilingwater img").attr("src","assets/images/crops/frame_90-100.gif");
  }
  if(currentTemp<90 && currentTemp>=80){
    $(".boilingwater img").attr("src","assets/images/crops/frame_80-90.gif");
  }
  if(currentTemp<80 && currentTemp>=70){
    $(".boilingwater img").attr("src","assets/images/crops/frame_70-80.gif");
  }
  if(currentTemp<70 && currentTemp>=60){
    $(".boilingwater img").attr("src","assets/images/crops/frame_60-70.gif");
  }
  if(currentTemp<60 && currentTemp>=50){
    $(".boilingwater img").attr("src","assets/images/crops/frame_50-60.gif");
  }
  if(currentTemp<50 && currentTemp>=40){
    $(".boilingwater img").attr("src","assets/images/crops/frame_40-50.gif");
  }
  if(currentTemp<40 && currentTemp>=30){
    $(".boilingwater").empty();
  }
  //
  var exptTime2milliseconds = exptTime2 * 1000;
  $(".timerDiv .clockText").text(convertMilliseconds(exptTime2milliseconds, "mm:ss").clock);
  //
  //DrawGraph((exptTime2 / 6), (-currentTemp * 2));

  //
  progTime2++;
  //trace("x position value=" + (exptTime2 / 6));
  if (currentTemp <= (Temp1 + 0.5) || ((exptTime2 / 6) > 300)) {
    //trace("cooling loop terminated");
    //trace("currentTemp=" + currentTemp);
    clearInterval(intervalID3);
    //
  }
}


function toTrunc(value, n) {
  x = (value.toString() + ".0").split(".");
  return parseFloat(x[0] + "." + x[1].substr(0, n));
}



