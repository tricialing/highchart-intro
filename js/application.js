'use strict';

$(document).ready(function(){
  var Charts = function (){
    this.graphData = [];
  };
  //1. Get Data
  Charts.prototype.makeAjaxRequest = function (){
    $.ajax({
      context: this, //if use this, add context or it will break 
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success: function(response){

        // 2. data wrangling
        var items = response.data; //data is one of the key of the whole response
        var item; //definded here so it's not a local variable within the for loop 
        
        //to transform big array into an array of hashes key value (x, y)
        for (var i=0; i < items.length; i++){
            item = items[i];
            this.graphData.push({
              x: new Date(item[0]),
              y: item[1]
            }); 
          }

          console.log(this.graphData);
          this.graphChart();
      }
    });
  }; //close makeAjaxRequest

  //3. Graph
  Charts.prototype.graphChart = function (){
    var highchartsConfig = {
      title: {
        text: 'Average retail gas prices'
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics (Multimodal)'
      },
      xAxis: {
        type: 'datetime'
      },
      series: [
        {
          name: 'US',
          data: this.graphData.reverse()
        }
      ]
    };

    $('#chart').highcharts(highchartsConfig);
  };

  //2.1 instanstanziate
  var chart = new Charts();
  chart.makeAjaxRequest();


});