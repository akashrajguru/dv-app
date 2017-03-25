// Wait until the body has loaded
$(document).ready(function(){
	console.log('js');
	// Set up the charts page
	//google.charts.load("current", {packages:['corechart']});
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

			//graphArray.push(['Date', 'Humidity', 'Temperature', 'WindSpeed']);

			// For each result sort the data into the google charts format ie ['String', numeric, numeric, numeric]
			result.forEach(function(resultData){
				// Create the empty array
				var jsonObject = [];
				var object1 = {};
				
				categories.push(moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'));
				// Push the humidity to the array
				jsonObject.push(resultData.daily.data[0].humidity);
				object1.name =resultData.daily.data[0].humidity;
				// Push todays temperature in degrees C
				jsonObject.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
				// Push the windspeed
				jsonObject.push(resultData.daily.data[0].windSpeed);
				// Push this array to the graph arrays
				graphArray.push(jsonObject);
				// Push tdays day name and date and precipitation to the precip array
				
			});
			// Reverse the arrays so the dates go from the past up to present
			graphArray.reverse();
			categories.reverse();
			// Prepend the tabs for graph naming conventions
			graphArray.unshift(['Month', 'Humidity %', 'Temperature deg.C', 'WindSpeed Mph']);
			
			// Draw the graphs


			console.log('graphArray',graphArray);
			console.log('categories',categories);
			console.log('object',object1.name);
			/*drawChart(graphArray);
			drawPrecipChart(precipArray);*/
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
    var chart = Highcharts.chart('container', {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Highcharts responsive chart'
    },

    subtitle: {
        text: 'Resize the frame or click buttons to change appearance'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    xAxis: {
        categories: ['Apples', 'Oranges', 'Bananas'],
        labels: {
            x: -10
        }
    },

    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Amount'
        }
    },

    series: [{
        name: 'Christmas Eve',
        data: [1, 4, 3]
    }, {
        name: 'Christmas Day before dinner',
        data: [6, 4, 2]
    }, {
        name: 'Christmas Day after dinner',
        data: [8, 4, 3]
    }],

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