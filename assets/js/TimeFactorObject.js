var TimeFactorObject = (function () {
    var mytimeFactor;
    return {
        timeScaleFactor: function (timeFactor, minValue, maxValue, defaultValue) {
            //
            if (timeFactor > minValue && timeFactor < maxValue) {
                console.log("time Scale factor is number");
                mytimeFactor = Math.round(timeFactor);
            } else if (timeFactor < minValue || timeFactor > maxValue) {
                console.log("time factor is range is" + minValue + " to" + maxValue + "");
                mytimeFactor = defaultValue;
            } else {
                console.log("plz Enter Integer Values");
                mytimeFactor = defaultValue;
            }
            //
            return mytimeFactor;
        }
    }
})();

var ClsCalcCoolingObject = (function () {
    // Ambient Temperature - user given
    var Ta;
    // Temperature at time zero - user given
    var T0;
    // Current Temperature - calculated value - returned
    var Tc;
    // Constant which governs the rate of cooling - user given
    var k;
    return {
        initCoolingObj: function (mTa, mT0, mk) {
            Ta = mTa;
            T0 = mT0;
            k = mk;
        },
        getTempAtTime: function (timeElapsed) {
            // this is the maximum temperature diff, i.e. betn temp at zero time and ambient temp
            var maxTempDiff = T0 - Ta;
            // this is the product of time elapsed (sec) and -k, i.e. Constant of cooling rate 
            var netCoolingFactor;
            netCoolingFactor = (-1) * timeElapsed * k;
            // equation to calculate Current Temp
            Tc = Ta + ((maxTempDiff) * Math.exp(netCoolingFactor));

            return Tc;
        }
    }
})();


function convertMilliseconds(ms, p) {
    var pattern = p || "hh:mm:ss",
        arrayPattern = pattern.split(":"),
        clock = [],
        hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
        minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
        seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds

    // build the clock result
    function createClock(unit) {
        // match the pattern to the corresponding variable
        if (pattern.match(unit)) {
            if (unit.match(/h/)) {
                addUnitToClock(hours, unit);
            }
            if (unit.match(/m/)) {
                addUnitToClock(minutes, unit);
            }
            if (unit.match(/s/)) {
                addUnitToClock(seconds, unit);
            };
        }
    }

    function addUnitToClock(val, unit) {
        if (val < 10 && unit.length === 2) {
            val = "0" + val;
        }
        clock.push(val); // push the values into the clock array
    }


    // loop over the pattern building out the clock result
    for (var i = 0, j = arrayPattern.length; i < j; i++) {
        createClock(arrayPattern[i]);
    }

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        clock: clock.join(":")
    };

}


var WaterCoolingChart = (function () {
    var ctx = null;
    var chart = null;
    return {
        init: function (pdata) {
            chart = Highcharts.chart('myChart', {
                chart: {
                    type: 'spline',
                    width: 410,
                    height:290,
                    animation: true
                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (min)',
                        style:{
                            color:"#7f542a",
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }
                    },
                    labels: {
                        rotation: 0
                    },
                    min:0,
                    max:30.5,
                    tickInterval:2,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 0,
                    lineColor:"#000000",
                    majorTickPosition:"outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 2,
                    minorTickLength: 10,
                    minorTickWidth: 1
                },
                title: false,
                subtitle:false,
                yAxis: {
                    title: {
                        text: 'Temperature (°C)',
                        margin: 5,
                        style:{
                            color:"#447215",
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }
                    },
                    min:0,
                    max:100,
                    tickInterval:5,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 0,
                    lineColor:"#000000",
                    majorTickPosition:"outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 10,
                    minorTickLength: 10,
                    majorTickLength: 10,
                    minorTickWidth: 1
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '',
                    color:"#0505ff",
                    marker: {
                        enabled: false
                     },
                    data: []
                }]
            });
                          
        },
        update: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chart.series[0].addPoint(datapoint,true,false);
            //chart.redraw();
        }
    }
})();


function InitBrowserAttribute() {
		
    // Get the user-agent string
    let userAgentString =
        navigator.userAgent;

    let browserStr = "";

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;

    // Detect Internet Explorer
    let IExplorerAgent =
        userAgentString.indexOf("MSIE") > -1 ||
        userAgentString.indexOf("rv:") > -1;

    // Detect Firefox
    let firefoxAgent =
        userAgentString.indexOf("Firefox") > -1;

    // Detect Safari
    let safariAgent =
        userAgentString.indexOf("Safari") > -1;
        
    // Discard Safari since it also matches Chrome
    if ((chromeAgent) && (safariAgent))
        safariAgent = false;

    // Detect Opera
    let operaAgent =
        userAgentString.indexOf("OP") > -1;
        
    // Discard Chrome since it also matches Opera	
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;

    if (safariAgent) browserStr = "safari"
    else if(chromeAgent) browserStr = "chrome"
    else if(firefoxAgent) browserStr = "firefox"
    else if (IExplorerAgent) browserStr = "IE"

    $("body").attr("browser", browserStr);
}


function InitOSAttribute(){
    var OSName = "Unknown";
    var OSGroup = "Unknown";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) {OSName="Windows10";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) {OSName="Windows8_1";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {OSName="Windows8";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {OSName="Windows7";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {OSName="WindowsVista";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {OSName="WindowsXP";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {OSName="Windows2000";OSGroup="windows"};
    if (window.navigator.userAgent.indexOf("Mac")            != -1) {OSName="MaciOS";OSGroup="macios"};
    if (window.navigator.userAgent.indexOf("X11")            != -1) {OSName="UNIX";OSGroup="unix"};
    if (window.navigator.userAgent.indexOf("Linux")          != -1) {OSName="Linux";OSGroup="linux"};

    $("body").attr("os", OSGroup);
}