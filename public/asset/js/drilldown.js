// Wait until the body has loaded
$(document).ready(function(){
	console.log('js');
	
	drawChart();
	
});

function drawChart()
{   
    var topLevelTitle = "Operating systems World market shares. March 2017";
    var drilldown1Title = 'Operating system market shares by region (March 2017)';

    var chart = Highcharts.chart('chart', {
    chart: {
        type: 'column',
         events: {
                drilldown: function(e) {
                    chart.setTitle({ text: e.point.name+' '+drilldown1Title});
                },
                drillup: function(e) {
                    chart.setTitle({ text: topLevelTitle });
                }
            }

    },
    title: {
        text: topLevelTitle
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://gs.statcounter.com/os-market-share">netmarketshare.com</a>.'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total percent market share'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Windows',
            y: 37.91,
            drilldown: 'Window-world'
        }, {
            name: 'Android',
            y: 37.93,
            drilldown: 'Android-world'
        }, {
            name: 'iOS',
            y: 13.09,
            drilldown: 'iOS-world'
        }, {
            name: 'OS X',
            y: 5.17,
            drilldown: 'OSX-world'
        }, {
            name: 'Linux',
            y: 0.75,
            drilldown: 'Linux-world'
        }]
    }],
    drilldown: {
        series: [{ id: 'Window-world',
                    name: 'Windows',
                    data: 
                       [ { name: 'Europe', y: 51.74, drilldown: 'Windows-Europe' },
                        { name: 'Asia', y: 29.23, drilldown: 'Windows-Asia' },
                        { name: 'North America', y: 39.51, drilldown: 'Windows-NorthAmerica' },
                        { name: 'South America', y: 56.86, drilldown: 'Windows-SouthAmerica' },
                        { name: 'Oceania', y: 38.14, drilldown: 'Windows-Oceania' }] 
                },
                {   id: 'Android-world',
                    name: 'Android',
                    data: 
                       [ { name: 'Europe', y: 23.58, drilldown: 'Android-Europe' },
                       { name: 'Asia', y: 52.15, drilldown: 'Android-Asia' },
                       { name: 'North America', y: 21.16, drilldown: 'Android-NorthAmerica' },
                       { name: 'South America', y: 31.29, drilldown: 'Android-SouthAmerica' },
                       { name: 'Oceania', y: 16.11, drilldown: 'Android-Oceania' }] 
                },
                {   id: 'iOS-world',
                    name: 'iOS',
                    data: 
                        [ { name: 'Europe', y: 13.73, drilldown: 'iOS-Europe' },
                        { name: 'Asia', y: 8.84, drilldown: 'iOS-Asia' },
                        { name: 'North America', y: 25.66, drilldown: 'iOS-NorthAmerica' },
                        { name: 'South America', y: 3.97, drilldown: 'iOS-SouthAmerica' },
                        { name: 'Oceania', y: 29.6, drilldown: 'iOS-Oceania' }] 
                },
                {   id: 'OSX-world',
                    name: 'OSX',
                    data: 
                        [ { name: 'Europe', y: 7.9, drilldown: 'OSX-Europe' },
                        { name: 'Asia', y: 1.74, drilldown: 'OSX-Asia' },
                        { name: 'North America', y: 10.4, drilldown: 'OSX-NorthAmerica' },
                        { name: 'South America', y: 4.93, drilldown: 'OSX-SouthAmerica' },
                        { name: 'Oceania', y: 12.97, drilldown: 'OSX-Oceania' }] 
                },
                {   id: 'Linux-world',
                    name: 'Linux',
                    data: [ { name: 'Europe', y: 1.3, drilldown: 'Linux-Europe' },
                    { name: 'Asia', y: 0.6, drilldown: 'Linux-Asia' },
                    { name: 'North America', y: 0.73, drilldown: 'Linux-NorthAmerica' },
                    { name: 'South America', y: 0.96, drilldown: 'Linux-SouthAmerica' },
                    { name: 'Oceania', y: 0.48, drilldown: 'Linux-Oceania' }] 
                },
        {
            name: 'Windows-Europe',
            id: 'Windows-Europe',
            data: [
                    ['Apr 2016',57.19],
                    ['May 2016',55.58 ],
                    ['June 2016',54.98],
                    ['July 2016',52.74],
                    ['Aug 2016',52.34],
                    ['Sept 2016',53.93],
                    ['Oct 2016',53.76],
                    ['Nov 2016',53.5],
                    ['Dec 2016',51.45],
                    ['Jan 2017',51.97],
                    ['Feb 2017',51.81],
                    ['Mar 2017',51.74]
                ]
        },{
            name: 'Android-Europe',
            id: 'Android-Europe',
            data: [
                    ['Apr 2016',19.91],
                    ['May 2016',20.84],
                    ['June 2016',21.21],
                    ['July 2016',23.21],
                    ['Aug 2016' ,23.57],
                    ['Sept 2016',22.76],
                    ['Oct 2016',21.9],
                    ['Nov 2016',22.58],
                    ['Dec 2016',23.57],
                    ['Jan 2017',23.39],
                    ['Feb 2017',23.54],
                    ['Mar 2017',23.58]
                ]
        },
        {
            name: 'iOS-Europe',
            id: 'iOS-Europe',
            data: [
                    ['Apr 2016',11.77],
                    ['May 2016',12.17],
                    ['June 2016',12.54],
                    ['July 2016',13.09],
                    ['Aug 2016',12.87],
                    ['Sept 2016',12.39],
                    ['Oct 2016',12.3],
                    ['Nov 2016',12.6],
                    ['Dec 2016',13.24],
                    ['Jan 2017',13.97],
                    ['Feb 2017',13.83],
                    ['Mar 2017',13.73]
                ]
        },
        {
            name: 'OSX-Europe',
            id: 'OSX-Europe',
            data: [
                    ['Apr 2016',7.14],
                    ['May 2016',7.28],
                    ['June 2016',7.14],
                    ['July 2016',6.5],
                    ['Aug 2016',6.47],
                    ['Sept 2016',6.95],
                    ['Oct 2016',7.5],
                    ['Nov 2016',7.67],
                    ['Dec 2016',7.29],
                    ['Jan 2017',7.45],
                    ['Feb 2017',7.71],
                    ['Mar 2017',7.9]
                ]
        },
        {
            name: 'Linux-Europe',
            id: 'Linux-Europe',
            data: [
                    ['Apr 2016',1.14],
                    ['May 2016',1.36],
                    ['June 2016',1.36],
                    ['July 2016',1.36],
                    ['Aug 2016',1.3],
                    ['Sept 2016',1.32],
                    ['Oct 2016',1.32],
                    ['Nov 2016',1.34],
                    ['Dec 2016',1.36],
                    ['Jan 2017',1.29],
                    ['Feb 2017',1.24],
                    ['Mar 2017',1.3]
                ]
        },
        {
            name: 'Windows-Asia',
            id: 'Windows-Asia',
            data: [
                    ['Apr 2016',36.77],
                    ['May 2016',34.12],
                    ['June 2016',36.45],
                    ['July 2016',34.69],
                    ['Aug 2016',34.8],
                    ['Sept 2016',33.11],
                    ['Oct 2016',30.99],
                    ['Nov 2016',30.08],
                    ['Dec 2016',30.16],
                    ['Jan 2017',29.62],
                    ['Feb 2017',29.81],
                    ['Mar 2017',29.23]
                ]
        },{
            name: 'Android-Asia',
            id: 'Android-Asia',
            data: [
                    ['Apr 2016',43.1],
                    ['May 2016',45.09],
                    ['June 2016',42.67],
                    ['July 2016',43.67],
                    ['Aug 2016' ,42.78],
                    ['Sept 2016',44.73],
                    ['Oct 2016',47.74],
                    ['Nov 2016',49.92],
                    ['Dec 2016',50.84],
                    ['Jan 2017',51.63],
                    ['Feb 2017',51.83],
                    ['Mar 2017',52.15]
                ]
        },
        {
            name: 'iOS-Asia',
            id: 'iOS-Asia',
            data: [
                    ['Apr 2016',7.88],
                    ['May 2016',8.23],
                    ['June 2016',8.75],
                    ['July 2016',8.86],
                    ['Aug 2016',9.01],
                    ['Sept 2016',8.87],
                    ['Oct 2016',8.9],
                    ['Nov 2016',8.85],
                    ['Dec 2016',8.91],
                    ['Jan 2017',9.05],
                    ['Feb 2017',8.85],
                    ['Mar 2017',8.84]
                ]
        },
        {
            name: 'OSX-Asia',
            id: 'OSX-Asia',
            data: [
                    ['Apr 2016',1.68],
                    ['May 2016',1.72],
                    ['June 2016',1.94],
                    ['July 2016',1.73],
                    ['Aug 2016',1.8],
                    ['Sept 2016',1.74],
                    ['Oct 2016',1.68],
                    ['Nov 2016',1.76],
                    ['Dec 2016',1.71],
                    ['Jan 2017',1.65],
                    ['Feb 2017',1.76],
                    ['Mar 2017',1.74]
                ]
        },
        {
            name: 'Linux-Asia',
            id: 'Linux-Asia',
            data: [
                    ['Apr 2016',0.65],
                    ['May 2016',0.59],
                    ['June 2016',0.63],
                    ['July 2016',0.61],
                    ['Aug 2016',0.65],
                    ['Sept 2016',0.61],
                    ['Oct 2016',0.55],
                    ['Nov 2016',0.56],
                    ['Dec 2016',0.54],
                    ['Jan 2017',0.52],
                    ['Feb 2017',0.52],
                    ['Mar 2017',0.49]
                ]
        },
        {
            name: 'Windows-NorthAmerica',
            id: 'Windows-NorthAmerica',
            data: [
                    ['Apr 2016',50.81],
                    ['May 2016',48.8],
                    ['June 2016',48.05],
                    ['July 2016',44.15],
                    ['Aug 2016',44.6],
                    ['Sept 2016',44.33],
                    ['Oct 2016',42.06],
                    ['Nov 2016',41.29],
                    ['Dec 2016',40.06],
                    ['Jan 2017',41.41],
                    ['Feb 2017',40.73],
                    ['Mar 2017',39.51]
                ]
        },{
            name: 'Android-NorthAmerica',
            id: 'Android-NorthAmerica',
            data: [
                    ['Apr 2016',15.84],
                    ['May 2016',16.7],
                    ['June 2016',16.92],
                    ['July 2016',19.25],
                    ['Aug 2016' ,18.41],
                    ['Sept 2016',18.73],
                    ['Oct 2016',18.41],
                    ['Nov 2016',20.23],
                    ['Dec 2016',21.29],
                    ['Jan 2017',20.25],
                    ['Feb 2017',20.28],
                    ['Mar 2017',21.16]
                ]
        },
        {
            name: 'iOS-NorthAmerica',
            id: 'iOS-NorthAmerica',
            data: [
                    ['Apr 2016',19.23],
                    ['May 2016',20.19],
                    ['June 2016',20.61],
                    ['July 2016',22.2],
                    ['Aug 2016',21.81],
                    ['Sept 2016',20.74],
                    ['Oct 2016',22.32],
                    ['Nov 2016',23.25],
                    ['Dec 2016',24.44],
                    ['Jan 2017',24.51],
                    ['Feb 2017',24.88],
                    ['Mar 2017',25.66]
                ]
        },
        {
            name: 'OSX-NorthAmerica',
            id: 'OSX-NorthAmerica',
            data: [
                    ['Apr 2016',9.77],
                    ['May 2016',9.76],
                    ['June 2016',10.06],
                    ['July 2016',9.65],
                    ['Aug 2016',10.05],
                    ['Sept 2016',10.1],
                    ['Oct 2016',11.59],
                    ['Nov 2016',10.84],
                    ['Dec 2016',10.29],
                    ['Jan 2017',10.44],
                    ['Feb 2017',10.69],
                    ['Mar 2017',10.4]
                ]
        },
        {
            name: 'Linux-NorthAmerica',
            id: 'Linux-NorthAmerica',
            data: [
                    ['Apr 2016',1.02],
                    ['May 2016',0.84],
                    ['June 2016',0.86],
                    ['July 2016',0.9],
                    ['Aug 2016',0.87],
                    ['Sept 2016',0.22],
                    ['Oct 2016',0.72],
                    ['Nov 2016',0.76],
                    ['Dec 2016',0.76],
                    ['Jan 2017',0.74],
                    ['Feb 2017',0.77],
                    ['Mar 2017',0.73]
                ]
        },
        {
            name: 'Windows-SouthAmerica',
            id: 'Windows-SouthAmerica',
            data: [
                    ['Apr 2016',63.71],
                    ['May 2016',61.7 ],
                    ['June 2016',68.18],
                    ['July 2016',61.27],
                    ['Aug 2016',60.32],
                    ['Sept 2016',59.16],
                    ['Oct 2016',57.5],
                    ['Nov 2016',57.31],
                    ['Dec 2016',55.66],
                    ['Jan 2017',55.23],
                    ['Feb 2017',56.28],
                    ['Mar 2017',56.86]
                ]
        },{
            name: 'Android-SouthAmerica',
            id: 'Android-SouthAmerica',
            data: [
                    ['Apr 2016',23.76],
                    ['May 2016',25.25],
                    ['June 2016',23.89],
                    ['July 2016',25.57],
                    ['Aug 2016' ,26],
                    ['Sept 2016',27.07],
                    ['Oct 2016',29.08],
                    ['Nov 2016',30.45],
                    ['Dec 2016',32.14],
                    ['Jan 2017',32.97],
                    ['Feb 2017',31.96],
                    ['Mar 2017',31.29]
                ]
        },
        {
            name: 'iOS-SouthAmerica',
            id: 'iOS-SouthAmerica',
            data: [
                    ['Apr 2016',3.89],
                    ['May 2016',4.17],
                    ['June 2016',3.78],
                    ['July 2016',3.88],
                    ['Aug 2016',3.61],
                    ['Sept 2016',3.59],
                    ['Oct 2016',3.6],
                    ['Nov 2016',3.63],
                    ['Dec 2016',4.46],
                    ['Jan 2017',4.45],
                    ['Feb 2017',4.05],
                    ['Mar 2017',3.97]
                ]
        },
        {
            name: 'OSX-SouthAmerica',
            id: 'OSX-SouthAmerica',
            data: [
                    ['Apr 2016',3.94],
                    ['May 2016',3.95],
                    ['June 2016',4.1],
                    ['July 2016',3.87],
                    ['Aug 2016',4.37],
                    ['Sept 2016',4.34],
                    ['Oct 2016',3.99],
                    ['Nov 2016',4.31],
                    ['Dec 2016',4.39],
                    ['Jan 2017',3.98],
                    ['Feb 2017',4.55],
                    ['Mar 2017',4.93]
                ]
        },
        {
            name: 'Linux-SouthAmerica',
            id: 'Linux-SouthAmerica',
            data: [
                    ['Apr 2016',1.15],
                    ['May 2016',1.11],
                    ['June 2016',1.19],
                    ['July 2016',1.19],
                    ['Aug 2016',1.2],
                    ['Sept 2016',1.11],
                    ['Oct 2016',1.08],
                    ['Nov 2016',1.05],
                    ['Dec 2016',1.01],
                    ['Jan 2017',0.97],
                    ['Feb 2017',0.97],
                    ['Mar 2017',0.97]
                ]
        },
        {
            name: 'Windows-Oceania',
            id: 'Windows-Oceania',
            data: [
                    ['Apr 2016',44.49],
                    ['May 2016',44.56 ],
                    ['June 2016',43.83],
                    ['July 2016',42.39],
                    ['Aug 2016',42.9],
                    ['Sept 2016',41.38],
                    ['Oct 2016',40.07],
                    ['Nov 2016',40.13],
                    ['Dec 2016',37.75],
                    ['Jan 2017',37.98],
                    ['Feb 2017',38.67],
                    ['Mar 2017',38.14]
                ]
        },{
            name: 'Android-Oceania',
            id: 'Android-Oceania',
            data: [
                    ['Apr 2016',13.71],
                    ['May 2016',12.81],
                    ['June 2016',12.88],
                    ['July 2016',14.31],
                    ['Aug 2016' ,13.91],
                    ['Sept 2016',14.62],
                    ['Oct 2016',15.19],
                    ['Nov 2016',15.44],
                    ['Dec 2016',17.21],
                    ['Jan 2017',16.96],
                    ['Feb 2017',16.3],
                    ['Mar 2017',16.11]
                ]
        },
        {
            name: 'iOS-Oceania',
            id: 'iOS-Oceania',
            data: [
                    ['Apr 2016',25.63],
                    ['May 2016',25.1],
                    ['June 2016',25.85],
                    ['July 2016',26.94],
                    ['Aug 2016',26.01],
                    ['Sept 2016',26.9],
                    ['Oct 2016',27.57],
                    ['Nov 2016',28.07],
                    ['Dec 2016',30.31],
                    ['Jan 2017',30.53],
                    ['Feb 2017',29.8],
                    ['Mar 2017',29.6]
                ]
        },
        {
            name: 'OSX-Oceania',
            id: 'OSX-Oceania',
            data: [
                    ['Apr 2016',12.68],
                    ['May 2016',14.01],
                    ['June 2016',13.87],
                    ['July 2016',12.52],
                    ['Aug 2016',13.28],
                    ['Sept 2016',13.08],
                    ['Oct 2016',13.38],
                    ['Nov 2016',13.25],
                    ['Dec 2016',11.28],
                    ['Jan 2017',11.83],
                    ['Feb 2017',12.83],
                    ['Mar 2017',12.97]
                ]
        },
        {
            name: 'Linux-Oceania',
            id: 'Linux-Oceania',
            data: [
                    ['Apr 2016',0.92],
                    ['May 2016',0.85],
                    ['June 2016',0.89],
                    ['July 2016',0.88],
                    ['Aug 2016',0.74],
                    ['Sept 2016',0.65],
                    ['Oct 2016',0.57],
                    ['Nov 2016',0.57],
                    ['Dec 2016',0.61],
                    ['Jan 2017',0.59],
                    ['Feb 2017',0.54],
                    ['Mar 2017',0.48]
                ]
        }

        ]
    }
});




}