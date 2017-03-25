$.get('https://www.quandl.com/api/v3/datasets/ECB/EURINR', function (result){
    //console.log("result is ", result.dataset.data);

    var data = result.dataset.data;
    //console.log("data is ",data);
    processdata(data);

 /*    Highcharts.chart('chart', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'EUR to INR exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
        }]
    });*/
    convertDate("2017-03-23");
});

function processdata(array){
    //console.log('array in processdata', array);
    var newData = array.reverse();
    //console.log('Reverse array', newData);
    $.each(newData , function(index, obj){
        //console.log(convertDate(obj[0]));
        obj[0] = convertDate(obj[0]);
    }) ;
    console.log('newData done',newData);  
    drawChart(newData) ;
}

function convertDate(date)
{
    var myDate=date;
    myDate=myDate.split("-");
    var newDate=myDate[0]+"."+myDate[1]+"."+myDate[2];
    //console.log("newDate", new Date(newDate).getTime());
    return newDate = new Date(newDate).getTime();

}

function drawChart(data)
{
    Highcharts.chart('chart', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Euro (EUR) to Indian Rupee (INR) exchange rate over time'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'EUR to INR',
            data: data
        }]
    });

}

$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?', function (data) {
    //console.log('data',data);
    /*Highcharts.chart('chart', {
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'USD to EUR exchange rate over time'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'USD to EUR',
            data: data
        }]
    });*/
});