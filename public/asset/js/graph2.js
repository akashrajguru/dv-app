// Wait until the body has loaded
$(document).ready(function(){
	console.log('js');
	var days = 7, choice = '58c6bbc6c8f6041cb4ae0e7b';
	setupCharts(days, choice);
});

// Function to process data for the charts
function setupCharts(days, choice){
	// Mockup field data
	var fields = [
	{
	    "_id" : "58c6bbc6c8f6041cb4ae0e7b",
	    "createdAt" : "2017-03-13T15:33:26.088Z",
	    "name" : "Field A",
	    "area" : {
	        "measure" : "Hectare",
	        "value" : 200000
	    },
	    "soil" : {
	        "texture" : "",
	        "measure" : "",
	        "deficitDepth" : 0,
	        "deficit" : ""
	    },
	    "note" : "",
	    "owner" : "58c6b99775370921206dedad",
	    "staff" : [ 
	        {
	            "roles" : [ 
	                "owner"
	            ],
	            "date" : "2017-03-13T15:33:26.059Z",
	            "user" : "58c6b99775370921206dedad",
	            "name" : "dennis killeen"
	        }, 
	        {
	            "roles" : [ 
	                "operator"
	            ],
	            "date" : "2017-03-13T15:56:27.824Z",
	            "user" : "58c6c11ac8f6041cb4ae0e7f",
	            "name" : "test test"
	        }
	    ],
	    "gps" : [ 
	        {
	            "lat" : 53.4201212606748,
	            "lng" : -7.90646553039551
	        }, 
	        {
	            "lat" : 53.4201724108337,
	            "lng" : -7.90397644042969
	        }, 
	        {
	            "lat" : 53.4192261229338,
	            "lng" : -7.90389060974121
	        }, 
	        {
	            "lat" : 53.4192261229338,
	            "lng" : -7.90637969970703
	        }, 
	        {
	            "lat" : 53.4201212606748,
	            "lng" : -7.90646553039551
	        }
	    ],
	    "__v" : 0
	}];


	// Vars needed
	var field, x = 0, y = 0, i =0, unixTimes = [], graphData;
	// Loop through fields
	fields.forEach(function(fieldParam){
		if(choice == fieldParam._id){
			// Find the field that matches our choice
			field = fieldParam;
		}
	});
	// Get the gps of each field and add them up
	field.gps.forEach(function(gps){
		x += gps.lat;
		y += gps.lng;
		i += 1;
	})
	// Average Lat-Lng to get the center of the field
	x = x / i;
	y = y / i;

	// If days is numeric ie not 'Start of the Year'
	if(days > 0){
		// Loop through the days and get the date
		for(var i = 0; i < days; i++){
			// Working backwards subtract the days the user wants from todays date to get the dates needed
			var temp = moment().subtract(i, 'days').toISOString();
			// Push the dates to an array in unix
			unixTimes.push(moment(temp).format('X'));
		}
		// Get the weather data
		aggregateWeatherData(unixTimes, x, y, function(result)
		{
			var graphArray = [];

			var categories = [];
			var series = [];
			var Humidity = [];
			var Temperature = [];
			var WindSpeed = [];
		
			result.forEach(function(resultData){
		

				categories.push(moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'));
				// Push the humidity to the array
				Humidity.push(resultData.daily.data[0].humidity);

				// Push todays temperature in degrees C
				Temperature.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
				// Push the windspeed
				WindSpeed.push(resultData.daily.data[0].windSpeed);
				
			});
			// Reverse the arrays so the dates go from the past up to present
			graphArray.reverse();
			categories.reverse();
			Humidity.reverse();
			Temperature.reverse();
			WindSpeed.reverse();
			
			
			// Draw the graphs


			//console.log('graphArray',graphArray);
			console.log('categories',categories);
			console.log('Humidity',Humidity);
			console.log('Temperature',Temperature);
			console.log('WindSpeed',WindSpeed);
			var obj = { name: 'Humidity %',
						data: Humidity
					}
			var obj1 = { name: 'Temperature deg.C',
						data: Temperature
					}
			var obj2 = { name: 'WindSpeed Mph',
						data: WindSpeed
					}		

			series.push(obj);
			series.push(obj1);
			series.push(obj2);

			console.log('series',series);

			drawChart(categories, series)

		});
	} 
}

function aggregateWeatherData(dates, x, y, callback){
	
	var ajaxReqList = [];

	//
	//	Create ajax calls
	//	
	$(dates).each(function()
	{
		var timestamp = this;

		var ajaxReq = $.ajax(
		{
	    	url: 'https://api.darksky.net/forecast/30b15ed903e8c1fe90ff1bb16dbd7f27/'+x+','+y+','+timestamp+'?exclude=currently,hourly,flags',
		 	type: 'GET',
		 	dataType : 'jsonp',
	    });

	    ajaxReqList.push(ajaxReq);
	});

	//
	//	Execute all calls
	//
	$.when.apply(undefined, ajaxReqList).done(function()
	{
		var callbackData = [];

		_(arguments).forEach(function(ajaxArgs)
		{
			var data = ajaxArgs.shift();
			var statusText = ajaxArgs.shift();
			var jqXHR = ajaxArgs.shift();

			callbackData.push(data);
		});

		callback(callbackData);

    }); 
}


function drawChart(categories, series)
{
    var chart = Highcharts.chart('chart', {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Weather Rates vs. Dates'
    },
    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    xAxis: {
        categories: categories,
        labels: {
            x: -10
        }
    },

    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Weather Rates'
        }
    },

    series: series,

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
});

}