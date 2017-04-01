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
			var series2 = [];

			var Humidity = [];
			var Temperature = [];
			var WindSpeed = [];
		
			var count = 0;
			console.log('result is ', result);
			result.forEach(function(resultData){
				count++


				categories.push(moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'));
				// Push the humidity to the array
				id = moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD');
				var tobj1 = { name: moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'),
							 y:	resultData.daily.data[0].humidity,
							 drilldown:	'humidity'+moment.unix(resultData.daily.data[0].time).format('DD')	
							}	

				Humidity.push(tobj1);

				// Push todays temperature in degrees C
				//Temperature.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
				// Push the windspeed
				var tobj2 = { name: moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'),
							 y:	resultData.daily.data[0].windSpeed,
							 drilldown:	'windSpeed'+moment.unix(resultData.daily.data[0].time).format('DD')	
							}

				WindSpeed.push(tobj2);

				var tobj = { name: moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'),
							 y:	Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)),
							 drilldown:	'temperature'+moment.unix(resultData.daily.data[0].time).format('DD')	

							}
				Temperature.push(tobj);
				
			});
			// Reverse the arrays so the dates go from the past up to present
			graphArray.reverse();
			categories.reverse();
			Humidity.reverse();
			Temperature.reverse();
			WindSpeed.reverse();
			
			//console.log("id is ",id);
			var data2 =[];

			$.get('http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=a1d9108a9bb74bae93f201051172803&q=Athlone&format=json', function (result){
		    //console.log("result is ", result.dataset.data);

		    var data = result.data.weather[0].hourly;
		    //for(var index in data)
		    //console.log("data is akash ",data);
		    //processdata("Todats data ",data);

		    });
			// Draw the graphs


			//console.log('graphArray',graphArray);
			//console.log('categories',categories);
			//console.log('Humidity',Humidity);
			//console.log('Temperature',Temperature);
			//console.log('WindSpeed',WindSpeed);
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
			

			//console.log('series',series);

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
        text: 'Basic drilldown'
    },
    xAxis: {
        type: 'category'
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
        }
    },

    series: series,
    drilldown: {
        series: [{ id: 'temperature27',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 5.7 },
     { name: '2:00 AM', y: 5.5 },
     { name: '3:00 AM', y: 5.2 },
     { name: '4:00 AM', y: 5 },
     { name: '5:00 AM', y: 4.8 },
     { name: '6:00 AM', y: 4.7 },
     { name: '7:00 AM', y: 4.5 },
     { name: '8:00 AM', y: 5.9 },
     { name: '9:00 AM', y: 7.3 },
     { name: '10:00 AM', y: 8.7 },
     { name: '11:00 AM', y: 10.5 },
     { name: '12:00 PM', y: 12.2 },
     { name: '1:00 PM', y: 14 },
     { name: '2:00 PM', y: 14.5 },
     { name: '3:00 PM', y: 14.9 },
     { name: '4:00 PM', y: 15.4 },
     { name: '5:00 PM', y: 14.2 },
     { name: '6:00 PM', y: 13.1 },
     { name: '7:00 PM', y: 11.9 },
     { name: '8:00 PM', y: 10.6 },
     { name: '9:00 PM', y: 9.2 },
     { name: '10:00 PM', y: 7.9 },
     { name: '11:00 PM', y: 6.8 },
     { name: '12:00 AM', y: 5.7 } ] },
{ id: 'windSpeed27',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 8.9 },
     { name: '2:00 AM', y: 8.7 },
     { name: '3:00 AM', y: 8.5 },
     { name: '4:00 AM', y: 8.3 },
     { name: '5:00 AM', y: 8.3 },
     { name: '6:00 AM', y: 8.3 },
     { name: '7:00 AM', y: 8.3 },
     { name: '8:00 AM', y: 8.9 },
     { name: '9:00 AM', y: 9.6 },
     { name: '10:00 AM', y: 10.3 },
     { name: '11:00 AM', y: 10.1 },
     { name: '12:00 PM', y: 10 },
     { name: '1:00 PM', y: 9.8 },
     { name: '2:00 PM', y: 9.9 },
     { name: '3:00 PM', y: 10 },
     { name: '4:00 PM', y: 10.1 },
     { name: '5:00 PM', y: 9.6 },
     { name: '6:00 PM', y: 9.2 },
     { name: '7:00 PM', y: 8.7 },
     { name: '8:00 PM', y: 9 },
     { name: '9:00 PM', y: 9.3 },
     { name: '10:00 PM', y: 9.6 },
     { name: '11:00 PM', y: 9.2 },
     { name: '12:00 AM', y: 8.7 } ] },
{ id: 'humidity27',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.96 },
     { name: '2:00 AM', y: 0.97 },
     { name: '3:00 AM', y: 0.97 },
     { name: '4:00 AM', y: 0.97 },
     { name: '5:00 AM', y: 0.97 },
     { name: '6:00 AM', y: 0.98 },
     { name: '7:00 AM', y: 0.98 },
     { name: '8:00 AM', y: 0.96 },
     { name: '9:00 AM', y: 0.93 },
     { name: '10:00 AM', y: 0.91 },
     { name: '11:00 AM', y: 0.87 },
     { name: '12:00 PM', y: 0.83 },
     { name: '1:00 PM', y: 0.8 },
     { name: '2:00 PM', y: 0.78 },
     { name: '3:00 PM', y: 0.77 },
     { name: '4:00 PM', y: 0.76 },
     { name: '5:00 PM', y: 0.8 },
     { name: '6:00 PM', y: 0.84 },
     { name: '7:00 PM', y: 0.89 },
     { name: '8:00 PM', y: 0.91 },
     { name: '9:00 PM', y: 0.93 },
     { name: '10:00 PM', y: 0.96 },
     { name: '11:00 PM', y: 0.96 },
     { name: '12:00 AM', y: 0.96 } ] },
{ id: 'temperature28',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 4.6 },
     { name: '2:00 AM', y: 4.5 },
     { name: '3:00 AM', y: 4.5 },
     { name: '4:00 AM', y: 4.4 },
     { name: '5:00 AM', y: 4.4 },
     { name: '6:00 AM', y: 4.5 },
     { name: '7:00 AM', y: 4.5 },
     { name: '8:00 AM', y: 6 },
     { name: '9:00 AM', y: 7.5 },
     { name: '10:00 AM', y: 9 },
     { name: '11:00 AM', y: 10.1 },
     { name: '12:00 PM', y: 11.2 },
     { name: '1:00 PM', y: 12.3 },
     { name: '2:00 PM', y: 12.6 },
     { name: '3:00 PM', y: 12.9 },
     { name: '4:00 PM', y: 13.2 },
     { name: '5:00 PM', y: 12.3 },
     { name: '6:00 PM', y: 11.5 },
     { name: '7:00 PM', y: 10.6 },
     { name: '8:00 PM', y: 10 },
     { name: '9:00 PM', y: 9.5 },
     { name: '10:00 PM', y: 8.9 },
     { name: '11:00 PM', y: 8.9 },
     { name: '12:00 AM', y: 9 } ] },
{ id: 'windSpeed28',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 8.3 },
     { name: '2:00 AM', y: 8.1 },
     { name: '3:00 AM', y: 7.8 },
     { name: '4:00 AM', y: 7.6 },
     { name: '5:00 AM', y: 8 },
     { name: '6:00 AM', y: 8.4 },
     { name: '7:00 AM', y: 8.7 },
     { name: '8:00 AM', y: 9.7 },
     { name: '9:00 AM', y: 10.7 },
     { name: '10:00 AM', y: 11.6 },
     { name: '11:00 AM', y: 12.3 },
     { name: '12:00 PM', y: 13 },
     { name: '1:00 PM', y: 13.6 },
     { name: '2:00 PM', y: 13.6 },
     { name: '3:00 PM', y: 13.6 },
     { name: '4:00 PM', y: 13.6 },
     { name: '5:00 PM', y: 12.2 },
     { name: '6:00 PM', y: 10.7 },
     { name: '7:00 PM', y: 9.2 },
     { name: '8:00 PM', y: 8.8 },
     { name: '9:00 PM', y: 8.4 },
     { name: '10:00 PM', y: 8.1 },
     { name: '11:00 PM', y: 8.5 },
     { name: '12:00 AM', y: 8.9 } ] },
{ id: 'humidity28',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.96 },
     { name: '2:00 AM', y: 0.96 },
     { name: '3:00 AM', y: 0.95 },
     { name: '4:00 AM', y: 0.95 },
     { name: '5:00 AM', y: 0.96 },
     { name: '6:00 AM', y: 0.97 },
     { name: '7:00 AM', y: 0.97 },
     { name: '8:00 AM', y: 0.96 },
     { name: '9:00 AM', y: 0.95 },
     { name: '10:00 AM', y: 0.94 },
     { name: '11:00 AM', y: 0.91 },
     { name: '12:00 PM', y: 0.89 },
     { name: '1:00 PM', y: 0.86 },
     { name: '2:00 PM', y: 0.85 },
     { name: '3:00 PM', y: 0.84 },
     { name: '4:00 PM', y: 0.83 },
     { name: '5:00 PM', y: 0.86 },
     { name: '6:00 PM', y: 0.89 },
     { name: '7:00 PM', y: 0.91 },
     { name: '8:00 PM', y: 0.93 },
     { name: '9:00 PM', y: 0.95 },
     { name: '10:00 PM', y: 0.97 },
     { name: '11:00 PM', y: 0.97 },
     { name: '12:00 AM', y: 0.97 } ] },
{ id: 'temperature29',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 9 },
     { name: '2:00 AM', y: 9.2 },
     { name: '3:00 AM', y: 9.3 },
     { name: '4:00 AM', y: 9.5 },
     { name: '5:00 AM', y: 9.3 },
     { name: '6:00 AM', y: 9 },
     { name: '7:00 AM', y: 8.8 },
     { name: '8:00 AM', y: 9.5 },
     { name: '9:00 AM', y: 10.2 },
     { name: '10:00 AM', y: 10.9 },
     { name: '11:00 AM', y: 11.8 },
     { name: '12:00 PM', y: 12.8 },
     { name: '1:00 PM', y: 13.7 },
     { name: '2:00 PM', y: 13.8 },
     { name: '3:00 PM', y: 14 },
     { name: '4:00 PM', y: 14.1 },
     { name: '5:00 PM', y: 13.7 },
     { name: '6:00 PM', y: 13.2 },
     { name: '7:00 PM', y: 12.8 },
     { name: '8:00 PM', y: 12.3 },
     { name: '9:00 PM', y: 11.8 },
     { name: '10:00 PM', y: 11.3 },
     { name: '11:00 PM', y: 11.1 },
     { name: '12:00 AM', y: 10.8 } ] },
{ id: 'windSpeed29',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 9.4 },
     { name: '2:00 AM', y: 9.3 },
     { name: '3:00 AM', y: 9.2 },
     { name: '4:00 AM', y: 9.2 },
     { name: '5:00 AM', y: 10.7 },
     { name: '6:00 AM', y: 12.3 },
     { name: '7:00 AM', y: 13.9 },
     { name: '8:00 AM', y: 14.6 },
     { name: '9:00 AM', y: 15.4 },
     { name: '10:00 AM', y: 16.1 },
     { name: '11:00 AM', y: 16.9 },
     { name: '12:00 PM', y: 17.6 },
     { name: '1:00 PM', y: 18.3 },
     { name: '2:00 PM', y: 16.6 },
     { name: '3:00 PM', y: 14.9 },
     { name: '4:00 PM', y: 13.2 },
     { name: '5:00 PM', y: 11.5 },
     { name: '6:00 PM', y: 9.8 },
     { name: '7:00 PM', y: 8.1 },
     { name: '8:00 PM', y: 8.4 },
     { name: '9:00 PM', y: 8.8 },
     { name: '10:00 PM', y: 9.2 },
     { name: '11:00 PM', y: 10.4 },
     { name: '12:00 AM', y: 11.6 } ] },
{ id: 'humidity29',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.97 },
     { name: '2:00 AM', y: 0.97 },
     { name: '3:00 AM', y: 0.97 },
     { name: '4:00 AM', y: 0.97 },
     { name: '5:00 AM', y: 0.97 },
     { name: '6:00 AM', y: 0.96 },
     { name: '7:00 AM', y: 0.96 },
     { name: '8:00 AM', y: 0.95 },
     { name: '9:00 AM', y: 0.94 },
     { name: '10:00 AM', y: 0.94 },
     { name: '11:00 AM', y: 0.92 },
     { name: '12:00 PM', y: 0.9 },
     { name: '1:00 PM', y: 0.88 },
     { name: '2:00 PM', y: 0.89 },
     { name: '3:00 PM', y: 0.91 },
     { name: '4:00 PM', y: 0.93 },
     { name: '5:00 PM', y: 0.93 },
     { name: '6:00 PM', y: 0.93 },
     { name: '7:00 PM', y: 0.93 },
     { name: '8:00 PM', y: 0.94 },
     { name: '9:00 PM', y: 0.96 },
     { name: '10:00 PM', y: 0.97 },
     { name: '11:00 PM', y: 0.97 },
     { name: '12:00 AM', y: 0.96 } ] },
     { id: 'temperature30',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 10.6 },
     { name: '2:00 AM', y: 10.6 },
     { name: '3:00 AM', y: 10.6 },
     { name: '4:00 AM', y: 10.6 },
     { name: '5:00 AM', y: 10.4 },
     { name: '6:00 AM', y: 10.1 },
     { name: '7:00 AM', y: 9.9 },
     { name: '8:00 AM', y: 10.8 },
     { name: '9:00 AM', y: 11.6 },
     { name: '10:00 AM', y: 12.5 },
     { name: '11:00 AM', y: 13.1 },
     { name: '12:00 PM', y: 13.8 },
     { name: '1:00 PM', y: 14.4 },
     { name: '2:00 PM', y: 14.7 },
     { name: '3:00 PM', y: 15 },
     { name: '4:00 PM', y: 15.3 },
     { name: '5:00 PM', y: 14.7 },
     { name: '6:00 PM', y: 14.2 },
     { name: '7:00 PM', y: 13.6 },
     { name: '8:00 PM', y: 13.1 },
     { name: '9:00 PM', y: 12.7 },
     { name: '10:00 PM', y: 12.2 },
     { name: '11:00 PM', y: 11.4 },
     { name: '12:00 AM', y: 10.6 } ] },
{ id: 'windSpeed30',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 12.8 },
     { name: '2:00 AM', y: 12.5 },
     { name: '3:00 AM', y: 12.3 },
     { name: '4:00 AM', y: 12.1 },
     { name: '5:00 AM', y: 11.4 },
     { name: '6:00 AM', y: 10.7 },
     { name: '7:00 AM', y: 10.1 },
     { name: '8:00 AM', y: 11.9 },
     { name: '9:00 AM', y: 13.8 },
     { name: '10:00 AM', y: 15.7 },
     { name: '11:00 AM', y: 16.2 },
     { name: '12:00 PM', y: 16.7 },
     { name: '1:00 PM', y: 17.2 },
     { name: '2:00 PM', y: 17 },
     { name: '3:00 PM', y: 16.8 },
     { name: '4:00 PM', y: 16.6 },
     { name: '5:00 PM', y: 15.4 },
     { name: '6:00 PM', y: 14.3 },
     { name: '7:00 PM', y: 13.2 },
     { name: '8:00 PM', y: 13.1 },
     { name: '9:00 PM', y: 13 },
     { name: '10:00 PM', y: 13 },
     { name: '11:00 PM', y: 12.2 },
     { name: '12:00 AM', y: 11.3 } ] },
{ id: 'humidity30',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.96 },
     { name: '2:00 AM', y: 0.96 },
     { name: '3:00 AM', y: 0.95 },
     { name: '4:00 AM', y: 0.94 },
     { name: '5:00 AM', y: 0.95 },
     { name: '6:00 AM', y: 0.95 },
     { name: '7:00 AM', y: 0.95 },
     { name: '8:00 AM', y: 0.93 },
     { name: '9:00 AM', y: 0.91 },
     { name: '10:00 AM', y: 0.89 },
     { name: '11:00 AM', y: 0.86 },
     { name: '12:00 PM', y: 0.84 },
     { name: '1:00 PM', y: 0.81 },
     { name: '2:00 PM', y: 0.81 },
     { name: '3:00 PM', y: 0.81 },
     { name: '4:00 PM', y: 0.82 },
     { name: '5:00 PM', y: 0.84 },
     { name: '6:00 PM', y: 0.87 },
     { name: '7:00 PM', y: 0.9 },
     { name: '8:00 PM', y: 0.92 },
     { name: '9:00 PM', y: 0.93 },
     { name: '10:00 PM', y: 0.95 },
     { name: '11:00 PM', y: 0.96 },
     { name: '12:00 AM', y: 0.96 } ] },
     { id: 'temperature31',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 9.8 },
     { name: '2:00 AM', y: 9.7 },
     { name: '3:00 AM', y: 9.7 },
     { name: '4:00 AM', y: 9.6 },
     { name: '5:00 AM', y: 9.1 },
     { name: '6:00 AM', y: 8.7 },
     { name: '7:00 AM', y: 8.2 },
     { name: '8:00 AM', y: 8.9 },
     { name: '9:00 AM', y: 9.7 },
     { name: '10:00 AM', y: 10.4 },
     { name: '11:00 AM', y: 10.7 },
     { name: '12:00 PM', y: 11 },
     { name: '1:00 PM', y: 11.3 },
     { name: '2:00 PM', y: 11.9 },
     { name: '3:00 PM', y: 12.6 },
     { name: '4:00 PM', y: 13.2 },
     { name: '5:00 PM', y: 12.5 },
     { name: '6:00 PM', y: 11.7 },
     { name: '7:00 PM', y: 11 },
     { name: '8:00 PM', y: 9.5 },
     { name: '9:00 PM', y: 8.1 },
     { name: '10:00 PM', y: 6.6 },
     { name: '11:00 PM', y: 5.9 },
     { name: '12:00 AM', y: 5.1 } ] },
{ id: 'windSpeed31',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 10.5 },
     { name: '2:00 AM', y: 10.6 },
     { name: '3:00 AM', y: 10.7 },
     { name: '4:00 AM', y: 10.7 },
     { name: '5:00 AM', y: 10 },
     { name: '6:00 AM', y: 9.2 },
     { name: '7:00 AM', y: 8.5 },
     { name: '8:00 AM', y: 9.9 },
     { name: '9:00 AM', y: 11.3 },
     { name: '10:00 AM', y: 12.8 },
     { name: '11:00 AM', y: 13.2 },
     { name: '12:00 PM', y: 13.6 },
     { name: '1:00 PM', y: 14.1 },
     { name: '2:00 PM', y: 13.2 },
     { name: '3:00 PM', y: 12.3 },
     { name: '4:00 PM', y: 11.4 },
     { name: '5:00 PM', y: 9.7 },
     { name: '6:00 PM', y: 8 },
     { name: '7:00 PM', y: 6.3 },
     { name: '8:00 PM', y: 6 },
     { name: '9:00 PM', y: 5.8 },
     { name: '10:00 PM', y: 5.6 },
     { name: '11:00 PM', y: 5 },
     { name: '12:00 AM', y: 4.4 } ] },
{ id: 'humidity31',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.97 },
     { name: '2:00 AM', y: 0.97 },
     { name: '3:00 AM', y: 0.97 },
     { name: '4:00 AM', y: 0.97 },
     { name: '5:00 AM', y: 0.97 },
     { name: '6:00 AM', y: 0.97 },
     { name: '7:00 AM', y: 0.98 },
     { name: '8:00 AM', y: 0.95 },
     { name: '9:00 AM', y: 0.92 },
     { name: '10:00 AM', y: 0.89 },
     { name: '11:00 AM', y: 0.87 },
     { name: '12:00 PM', y: 0.86 },
     { name: '1:00 PM', y: 0.85 },
     { name: '2:00 PM', y: 0.84 },
     { name: '3:00 PM', y: 0.82 },
     { name: '4:00 PM', y: 0.8 },
     { name: '5:00 PM', y: 0.82 },
     { name: '6:00 PM', y: 0.85 },
     { name: '7:00 PM', y: 0.87 },
     { name: '8:00 PM', y: 0.89 },
     { name: '9:00 PM', y: 0.92 },
     { name: '10:00 PM', y: 0.94 },
     { name: '11:00 PM', y: 0.95 },
     { name: '12:00 AM', y: 0.96 } ] },
{ id: 'temperature01',
  name: 'Temperature deg.C',
  data: 
   [ { name: '1:00 AM', y: 4.4, drilldown: 'temp1:00 AM' },
     { name: '2:00 AM', y: 4.5, drilldown: 'temp2:00 AM' },
     { name: '3:00 AM', y: 4.6, drilldown: 'temp3:00 AM' },
     { name: '4:00 AM', y: 4.7, drilldown: 'temp4:00 AM' },
     { name: '5:00 AM', y: 4.8, drilldown: 'temp5:00 AM' },
     { name: '6:00 AM', y: 4.8, drilldown: 'temp6:00 AM' },
     { name: '7:00 AM', y: 4.9, drilldown: 'temp7:00 AM' },
     { name: '8:00 AM', y: 6.6, drilldown: 'temp8:00 AM' },
     { name: '9:00 AM', y: 8.4, drilldown: 'temp9:00 AM' },
     { name: '10:00 AM', y: 10.1, drilldown: 'temp10:00 AM' },
     { name: '11:00 AM', y: 10.1, drilldown: 'temp11:00 AM' },
     { name: '12:00 PM', y: 10, drilldown: 'temp12:00 PM' },
     { name: '1:00 PM', y: 10, drilldown: 'temp1:00 PM' },
     { name: '2:00 PM', y: 10.6, drilldown: 'temp2:00 PM' },
     { name: '3:00 PM', y: 11.3, drilldown: 'temp3:00 PM' },
     { name: '4:00 PM', y: 11.9, drilldown: 'temp4:00 PM' },
     { name: '5:00 PM', y: 11, drilldown: 'temp5:00 PM' },
     { name: '6:00 PM', y: 10.1, drilldown: 'temp6:00 PM' },
     { name: '7:00 PM', y: 9.2, drilldown: 'temp7:00 PM' },
     { name: '8:00 PM', y: 7.8, drilldown: 'temp8:00 PM' },
     { name: '9:00 PM', y: 6.3, drilldown: 'temp9:00 PM' },
     { name: '10:00 PM', y: 4.9, drilldown: 'temp10:00 PM' },
     { name: '11:00 PM', y: 4.4, drilldown: 'temp11:00 PM' },
     { name: '12:00 AM', y: 3.9, drilldown: 'temp12:00 AM' } ] }
,
{ id: 'windSpeed01',
  name: 'WindSpeed Mph',
  data: 
   [ { name: '1:00 AM', y: 3.8 },
     { name: '2:00 AM', y: 4.1 },
     { name: '3:00 AM', y: 4.4 },
     { name: '4:00 AM', y: 4.7 },
     { name: '5:00 AM', y: 5.4 },
     { name: '6:00 AM', y: 6.2 },
     { name: '7:00 AM', y: 6.9 },
     { name: '8:00 AM', y: 9.8 },
     { name: '9:00 AM', y: 12.8 },
     { name: '10:00 AM', y: 15.7 },
     { name: '11:00 AM', y: 15.5 },
     { name: '12:00 PM', y: 15.4 },
     { name: '1:00 PM', y: 15.2 },
     { name: '2:00 PM', y: 15.8 },
     { name: '3:00 PM', y: 16.4 },
     { name: '4:00 PM', y: 17 },
     { name: '5:00 PM', y: 14.2 },
     { name: '6:00 PM', y: 11.5 },
     { name: '7:00 PM', y: 8.7 },
     { name: '8:00 PM', y: 8.1 },
     { name: '9:00 PM', y: 7.5 },
     { name: '10:00 PM', y: 6.9 },
     { name: '11:00 PM', y: 6.6 },
     { name: '12:00 AM', y: 6.2 } ] },
{ id: 'humidity01',
  name: 'Humidity %',
  data: 
   [ { name: '1:00 AM', y: 0.97 },
     { name: '2:00 AM', y: 0.96 },
     { name: '3:00 AM', y: 0.96 },
     { name: '4:00 AM', y: 0.95 },
     { name: '5:00 AM', y: 0.95 },
     { name: '6:00 AM', y: 0.95 },
     { name: '7:00 AM', y: 0.94 },
     { name: '8:00 AM', y: 0.93 },
     { name: '9:00 AM', y: 0.91 },
     { name: '10:00 AM', y: 0.89 },
     { name: '11:00 AM', y: 0.87 },
     { name: '12:00 PM', y: 0.85 },
     { name: '1:00 PM', y: 0.83 },
     { name: '2:00 PM', y: 0.8 },
     { name: '3:00 PM', y: 0.76 },
     { name: '4:00 PM', y: 0.73 },
     { name: '5:00 PM', y: 0.76 },
     { name: '6:00 PM', y: 0.8 },
     { name: '7:00 PM', y: 0.83 },
     { name: '8:00 PM', y: 0.87 },
     { name: '9:00 PM', y: 0.9 },
     { name: '10:00 PM', y: 0.94 },
     { name: '11:00 PM', y: 0.94 },
     { name: '12:00 AM', y: 0.94 } ] },
{ id: 'temp6:00 PM',
  name: 'Temperature deg.C',
  data: 
   [ { name: '6:00 M', y: 0.97 },
     { name: '7:02 M', y: 0.96 },
     { name: '6:03 PM', y: 0.96 },
     { name: '6:04 PM', y: 0.95 },
     { name: '6:05 PM', y: 0.95 },
     { name: '6:06 PM', y: 0.95 },
     { name: '6:07 PM', y: 0.94 },
     { name: '6:08 PM', y: 0.93 },
     { name: '6:09 PM', y: 0.91 },
     { name: '6:10 PM', y: 0.89 },
     { name: '6:11 PM', y: 0.87 },
     { name: '6:12 PM', y: 0.85 },
     { name: '6:13 PM', y: 0.83 },
     { name: '6:14 PM', y: 0.8 },
     { name: '6:15 PM', y: 0.76 },
     { name: '6:16 PM', y: 0.73 },
     { name: '6:17 PM', y: 0.76 },
     { name: '6:18 PM', y: 0.8 },
     { name: '6:19 PM', y: 0.83 },
     { name: '6:20 PM', y: 0.87 },
     { name: '6:21 PM', y: 0.9 },
     { name: '6:22 PM', y: 0.94 },
     { name: '6:23 PM', y: 0.94 },
     { name: '6:24 PM', y: 0.94 },
     { name: '6:25 PM', y: 0.97 },
     { name: '6:26 PM', y: 0.96 },
     { name: '6:27 PM', y: 0.96 },
     { name: '6:28 PM', y: 0.95 },
     { name: '6:29 PM', y: 0.95 },
     { name: '6:30 PM', y: 0.95 },
     { name: '6:31 PM', y: 0.94 },
     { name: '6:32 PM', y: 0.93 },
     { name: '6:33 PM', y: 0.91 },
     { name: '6:34 PM', y: 0.89 },
     { name: '6:35 PM', y: 0.87 },
     { name: '6:36 PM', y: 0.85 },
     { name: '6:37 PM', y: 0.83 },
     { name: '6:38 PM', y: 0.8 },
     { name: '6:39 PM', y: 0.76 },
     { name: '6:40 PM', y: 0.73 },
     { name: '6:41 PM', y: 0.76 },
     { name: '6:42 PM', y: 0.8 },
     { name: '6:43 PM', y: 0.83 },
     { name: '6:44 PM', y: 0.87 },
     { name: '6:45 PM', y: 0.9 },
     { name: '6:46 PM', y: 0.94 },
     { name: '6:47 PM', y: 0.94 },
     { name: '6:48 PM', y: 0.94 },
     { name: '6:49 PM', y: 0.85 },
     { name: '6:50 PM', y: 0.83 },
     { name: '6:51 PM', y: 0.8 },
     { name: '6:52 PM', y: 0.76 },
     { name: '6:53 PM', y: 0.73 },
     { name: '6:54 PM', y: 0.76 },
     { name: '6:55 PM', y: 0.8 },
     { name: '6:56 PM', y: 0.83 },
     { name: '6:57 PM', y: 0.87 },
     { name: '6:58 PM', y: 0.9 },
     { name: '6:59 PM', y: 0.94 }] }],
    }
});


}