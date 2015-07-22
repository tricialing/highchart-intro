'use strict';

$(document).ready(function(){
  var Charts = function(){ // defining class
    this.graphData = [];
  };

  //1. grabbing the data
  Charts.prototype.makeAjaxRequest = function(){
    $.ajax({
      context: this,
      type: 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/WORLDBANK/HKG_IT_CEL_SETS_P2.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success: function(response){
        // console.log(response.data);

        //2. data wranggling
        var items = response.data;
        var item; 

        for (var i = 0; i <items.length; i++){
            item = items[i];
            this.graphData.push({
              x: new Date(item[0]),
              y: item[1]
            });
            // console.log(this.graphData);
        };

        console.log(this.graphData);
        this.graphChart();
      }
    }); //end of ajax
  }//end of makeAjaxRequest


  //3. Graph
  Charts.prototype.graphChart=function(){
    var chatsConfig = {
      title:{
        text: "Hong Kong Mobile cellular subscriptions"
      },
      subtitle: {
        text: "per-100-people"
      },
      xAxis: {
        type: 'datetime'
      },
      series: [
        {
        name: 'Date',
        data: this.graphData.reverse()
        }
      ]
    };

    $('#chart').highcharts(chatsConfig);

  };
  //1.2 instance 
  var chart = new Charts ();
  chart.makeAjaxRequest(); //1.3 call makeAjaxRequest
}); // end of doc ready