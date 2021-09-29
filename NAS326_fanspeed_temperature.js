window.onload = function () {
        let DebugMode = false;
    resize_canvases()

    // Fan Speed

    var chart_fanspeed = new SmoothieChart({millisPerPixel: 200, maxValueScale: 1.1, minValueScale: 1.1, scaleSmoothing: 0.1, grid: { fillStyle: '#ffffff', millisPerLine: 5000, verticalSections: 8 }, labels: { fillStyle: '#0000ff', fontSize: 16, precision: 1 }, timestampFormatter: SmoothieChart.timeFormatter }),
        canvas_fanspeed = document.getElementById('smoothie-chart-fanspeed'),
        series_fanspeed = new TimeSeries();
        average_array_fanspeed = []

    chart_fanspeed.addTimeSeries(series_fanspeed, { lineWidth: 3.5, strokeStyle: '#ff0000' });
    chart_fanspeed.streamTo(canvas_fanspeed, 500);

    function run_fanspeed_proc(series_fanspeed, average_array_fanspeed) {
                var proc = cockpit.script("bash -c \"echo $[60000/$(($(/usr/sbin/i2cget -y 0x0 0x0a 0x08)))] ' RPM'\" | awk '{print $1}'");
        proc.done(function(data){
            pt = parseInt(data.match(/([0-9\.]+)/)[1]);
            series_fanspeed.append(new Date().getTime(), pt);
            document.getElementById("cur_fanspeed").innerHTML = '' + pt + ' RPM';
            average_array_fanspeed.push(pt);
            if(average_array_fanspeed.length > 5*60){
                average_array_fanspeed.shift();
            }
            document.getElementById("avg_fanspeed").innerHTML = '' + average(average_array_fanspeed) + ' RPM';
            if(DebugMode)
                    console.log(average_array_fanspeed);
        });
    };

    setInterval(function () { run_fanspeed_proc(series_fanspeed, average_array_fanspeed) }, 1000);


    // CPU Temperature

    var chart_temp = new SmoothieChart({millisPerPixel: 200, maxValueScale: 1.1, minValueScale: 1.1, scaleSmoothing: 0.1, grid: { fillStyle: '#ffffff', millisPerLine: 5000, verticalSections: 8 }, labels: { fillStyle: '#0000ff', fontSize: 16, precision: 1 }, timestampFormatter: SmoothieChart.timeFormatter }),
        canvas_temp = document.getElementById('smoothie-chart-temp'),
        series_temp = new TimeSeries();
        average_array_temp = []

    chart_temp.addTimeSeries(series_temp, { lineWidth: 3.5, strokeStyle: '#ff0000' });
    chart_temp.streamTo(canvas_temp, 500);

    function run_temp_proc(series_temp, average_array_temp) {
                var proc = cockpit.script("bash -c \"echo $(($(/usr/sbin/i2cget -y 0x0 0x0a 0x07))) ' C'\" | awk '{print $1}'")
        proc.done(function(data){
            pt = parseFloat(data.match(/([0-9\.]+)/)[1]);
                        pt = parseInt(pt * 100) / 100.0;
            series_temp.append(new Date().getTime(), pt);
            document.getElementById("cur_temp").innerHTML = '' + pt + ' °C';
            average_array_temp.push(pt);
            if(average_array_temp.length > 5*60){
                average_array_temp.shift();
            }
            document.getElementById("avg_temp").innerHTML = '' + average(average_array_temp) + ' °C';
            if(DebugMode)
                                console.log(average_array_temp);
        });
    };

    setInterval(function () { run_temp_proc(series_temp, average_array_temp) }, 1000);
}

function resize_canvases() {
    document.getElementById("smoothie-chart-temp").width = window.innerWidth - 50;
    document.getElementById("smoothie-chart-fanspeed").width = window.innerWidth - 50;
}

function average(array) {
    var sum = 0;
    var count = array.length;
    for (var i = 0; i < count; i++) {
      sum = sum + array[i];
    }
    return parseInt(sum / count * 100) / 100.0;
  }