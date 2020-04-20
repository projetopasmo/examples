var datasetLine = []
var datasetChartEnter = []
var datasetChartExit = []
var hourLabels = []
var trafficChart = null

function getInfo(region){ 
  var today = new Date();
  finalDate = today.toISOString().slice(0, 19) + 'Z'
  initialDate = new Date(today.getTime() - (24*3600000)).toISOString().slice(0, 19) + 'Z'

  $.when(
    $.ajax('https://pasmo.es.av.it.pt/api/radars/events/' +region+ '/cars_in?initialDate=' +initialDate+ '&finalDate=' +finalDate+ '&groupby=3600'),
    $.ajax('https://pasmo.es.av.it.pt/api/radars/events/' +region+ '/cars_out?initialDate=' +initialDate+ '&finalDate=' +finalDate+ '&groupby=3600')
  )
    .then(function (cars_in, cars_out) {
      processBarData(cars_in, "in")
      processBarData(cars_out, "out")
      processLineData()
    })
    .fail(function (err) {
      console.log('Something went wrong', err);
    });
  
  function processBarData(cars, type) {
    cars[0].forEach(function (item) {
      if (type == "in"){
        datasetChartEnter.push(item['number_of_cars'])
      }else{
        datasetChartExit.push(item['number_of_cars'] * (-1))
      
        var hour = String((new Date(item['timestamp'])).getHours()).padStart(2, '0');
        var minutes = String((new Date(item['timestamp'])).getMinutes()).padStart(2, '0')
        hourLabels.push(hour + ":" + minutes + "h")
      }
    });
  }
}

function processLineData() {
  for(i in datasetChartEnter) {
    datasetLine.push(datasetChartEnter[i]+datasetChartExit[i])
  }
  trafficChart.update();
}

function filterClicked(region){
  datasetLine.length = 0
  datasetChartEnter.length = 0
  datasetChartExit.length = 0
  hourLabels.length = 0

  if(region == "barra"){
    document.getElementById("regionDrop").innerHTML = "Barra";
    document.getElementById("regionTitle").innerHTML = "Fluxo de trafego na Barra";
  }else{
    document.getElementById("regionDrop").innerHTML = "Costa Nova";
    document.getElementById("regionTitle").innerHTML = "Fluxo de trafego na Costa Nova";
  }
  getInfo(region)
}


let barColorsRegions = [
  {
    backgroundColor: 'rgba(229, 35, 35,0.5)',
    borderColor: 'rgba(229, 35, 35,1)',
    pointHoverBackgroundColor: 'rgba(229, 35, 35,1)',
    pointHoverBorderColor: 'rgba(229, 35, 35,1)'
  },
  {
    backgroundColor: 'rgba(35,183,229,0.5)',
    borderColor: 'rgba(35,183,229,1)',
    pointHoverBackgroundColor: 'rgba(35,183,229,1)',
    pointHoverBorderColor: 'rgba(35,183,229,1)'
  },
];

var chartData = {
  labels: hourLabels,
  datasets: [
    {
      type: "line",
      label: "Fluxo de trafego",
      borderColor: 'rgba(114,102,186,1)',
      backgroundColor: 'rgba(114,102,186,0.2)',
      borderWidth: 2,
      data: datasetLine
    },
    {
      type: "bar",
      label: "Carros a entrar",
      backgroundColor: 'rgba(35,183,229,0.5)',
      borderColor: 'rgba(35,183,229,1)',
      borderWidth: 2,
      data: datasetChartEnter,
    },
    {
      type: "bar",
      label: "Carros a sair",
      backgroundColor: 'rgba(229, 35, 35,0.5)',
      borderColor: 'rgba(229, 35, 35,1)',
      borderWidth: 2,
      data: datasetChartExit
    }
  ]
};

window.onload = function () {
  var ctx = document.getElementById("canvas").getContext("2d");
  this.getInfo("barra")
  trafficChart = new Chart(ctx, {
    type: "bar",
    data: chartData,
    options: {
      responsive: true,
      scaleShowVerticalLines: false,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      },
    }
  });
};

