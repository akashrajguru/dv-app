// Wait until the body has loaded
$(document).ready(function(){
	console.log('js');
	// Set up the charts page
	google.charts.load("current", {packages:['corechart']});
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
			var precipArray= [];
			//graphArray.push(['Date', 'Humidity', 'Temperature', 'WindSpeed']);
			console.log('result ',result);
			// For each result sort the data into the google charts format ie ['String', numeric, numeric, numeric]
			result.forEach(function(resultData){
				// Create the empty array
				var jsonObject = [];
				// Push todays day name and date to the array
				jsonObject.push(moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'));
				// Push the humidity to the array
				jsonObject.push(resultData.daily.data[0].humidity);
				// Push todays temperature in degrees C
				jsonObject.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
				// Push the windspeed
				jsonObject.push(resultData.daily.data[0].windSpeed);
				// Push this array to the graph arrays
				graphArray.push(jsonObject);
				// Push tdays day name and date and precipitation to the precip array
				precipArray.push([moment.unix(resultData.daily.data[0].time).format('dddd')+' '+moment.unix(resultData.daily.data[0].time).format('DD'), (resultData.daily.data[0].precipIntensity * 25.4)])
			});
			// Reverse the arrays so the dates go from the past up to present
			graphArray.reverse();
			precipArray.reverse();
			// Prepend the tabs for graph naming conventions
			graphArray.unshift(['Month', 'Humidity %', 'Temperature deg.C', 'WindSpeed Mph']);
			precipArray.unshift(['Month', 'Precipatation']);
			// Draw the graphs
			drawChart(graphArray);
			drawPrecipChart(precipArray);
		});
	} else {
		// Vars needed for now and the start of the year
		var date = moment();
		var yearStart = moment([date.year(), 0, 1]);
		// Count how many days we wish to go back
		var day = date.diff(yearStart, 'days');
		// Loop through the days and get the date
		for(var i = 0; i < day; i++){
			var temp = moment().subtract(i, 'days').toISOString();
			unixTimes.push(moment(temp).format('X'));
		}
		// Get the weather data
		aggregateWeatherData(unixTimes, x, y, function(result)
		{
			// Arrays needed
			var graphArray = [];
			var precipArray =[];
			// Loop through the result data
			result.forEach(function(resultData){
				// Get the month from the data element
				var month = moment.unix(resultData.daily.data[0].time).format('MMMM');
				// If there is an element in the array
				if(graphArray.length > 0){
					// Loop through the array the graph array to find the month
					for(var  k = 0; k < graphArray.length; k++){
						// If the element has this month attached to it
						if(graphArray[k].indexOf(month) > -1){
							// Make our temp array equal to our graphArray array
							var temp = graphArray[k];
							// Add the data to the elements
							temp[1] = temp[1]+resultData.daily.data[0].humidity;
							temp[2] = temp[2]+Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5))
							temp[3] = temp[3]+resultData.daily.data[0].windSpeed;
							// Increment i once more. (This is our averaging counter)
							temp[4] = temp[4] + 1;
							// Reset the graphArray variable
							graphArray[k] = temp;
							// If the eleemnt is not present in the array and the loop is at the end of its loop
						} else if(graphArray[k].indexOf(month) == -1 && k == graphArray.length -1){
							// Create a new temp array
							var arrayObject = [];
							// Push what we need onto the array
							arrayObject.push(moment.unix(resultData.daily.data[0].time).format('MMMM'));
							arrayObject.push(resultData.daily.data[0].humidity);
							arrayObject.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
							arrayObject.push(resultData.daily.data[0].windSpeed);
							arrayObject.push(1);
							// Push the temp array onto the graphArray
							graphArray.push(arrayObject);
						}
					}
				} 
				// If there is no elements on the graphArray
				else {
					// Create a new temp array
					var arrayObject = [];
					// Push what we need onto the array
					arrayObject.push(moment.unix(resultData.daily.data[0].time).format('MMMM'));
					arrayObject.push(resultData.daily.data[0].humidity);
					arrayObject.push(Math.round((((((resultData.daily.data[0].temperatureMax + resultData.daily.data[0].temperatureMin)/2)-32)/9)*5)));
					arrayObject.push(resultData.daily.data[0].windSpeed);
					arrayObject.push(1);
					// Push the temp array onto the graphArray
					graphArray.push(arrayObject);
				}
				// If there is an element in the array
				if(precipArray.length > 0){
					// Loop through precipArray
					for(var  k = 0; k < precipArray.length; k++){
						// If there is an element with the same month
						if(precipArray[k].indexOf(month) > -1){
							// reference the array object
							var temp = precipArray[k];
							// Add the data to the elements
							temp[1] = temp[1]+(resultData.daily.data[0].precipIntensity * 25.4);
							temp[2] = temp[2] + 1;
							// Push the temp array onto the precipArray
							precipArray[k] = temp;
						} else if(precipArray[k].indexOf(month) == -1 && k == precipArray.length -1){
							var arrayObject = [];
							// Push what we need onto the array
							arrayObject.push(moment.unix(resultData.daily.data[0].time).format('MMMM'));
							arrayObject.push((resultData.daily.data[0].precipIntensity * 25.4));
							arrayObject.push(1);
							// Push the temp array onto the precipArray
							precipArray.push(arrayObject);
						}
					}
				} 
				// If there is not an element in the array
				else {
					// Create a new temp array
					var arrayObject = [];
					// Push what we need onto the array
					arrayObject.push(moment.unix(resultData.daily.data[0].time).format('MMMM'));
					arrayObject.push((resultData.daily.data[0].precipIntensity * 25.4));
					arrayObject.push(1);
					// Push the temp array onto the precipArray
					precipArray.push(arrayObject);
				}
			});

			//Loop through the array
			graphArray.forEach(function(graphData){
				// Loop through the values in the array
				for(var i = 1; i < graphData.length-1; i++){
					// Divide the data by the i incremented value(Average summation)
					graphData[i] = graphData[i]/graphData[graphData.length-1];
				}
				// Pop the incremental i off the array
				graphData.pop();
			});

			//Loop through the array
			precipArray.forEach(function(graphData){
				// Loop through the values in the array
				for(var i = 1; i < graphData.length-1; i++){
					// divide the data by the i incremented value(Average summation)
					graphData[i] = graphData[i]/graphData[graphData.length-1];
				}
				// Pop the incremental i off the array
				graphData.pop();
			});

			//Reverse the data to go from past to present(its currently present to past)
			graphArray.reverse();
			precipArray.reverse();

			// Naming conventions for the graph
			graphArray.unshift(['Month', 'Humidity %', 'Temperature deg.C', 'WindSpeed Mph']);
			precipArray.unshift(['Month', 'Precipation']);
			// Send the data to its respective function to be drawn
			drawChart(graphArray);
			drawPrecipChart(precipArray);
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
//Draw the data to the charts
function drawChart(graphArray){
	console.log('graphArray', graphArray)
	var data = google.visualization.arrayToDataTable(graphArray);
	var options = {
		tooltip : { ignoreBounds : true },
        title: "Weather Rates vs. Dates",
        bar: {groupWidth: "90%"},
        vAxis : { title: 'Weather Rates'},
        hAxis : { title: 'Dates'},
        legend: { position: 'top'}
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("weather_chart"));
      chart.draw(data, options);
}

function drawPrecipChart(precipArray){
	console.log('precipArray', precipArray)
	var data = google.visualization.arrayToDataTable(precipArray);
	var options = {
        title: "Precipation vs. Dates",
        bar: {groupWidth: "90%"},
        vAxis : { title: 'Precipation(mm per Hour)'},
        hAxis : { title: 'Dates'},
        legend: { position: 'top'}
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("precip_chart"));
      chart.draw(data, options);
}