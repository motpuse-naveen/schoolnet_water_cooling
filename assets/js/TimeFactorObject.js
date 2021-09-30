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
            ctx = document.getElementById('myChart').getContext('2d');
            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
                    datasets: [
                        {
                            data: []
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Time (min)'
                            }
                        },
                        y: {
                            display: true,
                            suggestedMin: 0,
                            suggestedMax: 100,
                            title: {
                                display: true,
                                text: 'Temperature (°C)'
                            },
                            ticks: {
                                stepSize: 10
                            }
                        }
                    }
                }
            });
        },
        update: function (datapoint) {
            const data = chart.data;
            if (data.datasets.length > 0) {
                data.datasets[0].data.push(datapoint);
                chart.update();
            }
        }
    }
})();