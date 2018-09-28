var rows = localStorage.getItem("rows");
var cols = localStorage.getItem("cols");

var pastGeneration = -1;
var canvas = document.getElementById('Graph');
var data = {
	labels: [],
	datasets: [{
		label: "Porcentaje Celulas Vivas",
		backgroundColor: "rgba(0,0,0,0.4)",
		borderColor: "rgba(0,0,0,1)",
		pointBackgroundColor: "#fff",
		pointRadius: 5,
		data: [],
	}],
};
var labels = {
	scales: {
		xAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Generación'
			}
		}],
		yAxes: [{
			scaleLabel: {
				display: true,
				labelString: 'Porcentaje Celulas Vivas'
			}
		}]
	}
};
var cellsChart = Chart.Line(canvas, {
	data: data,
	options: labels
});
setInterval(function () {
	if (localStorage.getItem("gameOn") == "true") {
		livingCells = localStorage.getItem("livingCells")
		gen = localStorage.getItem("generation")
		
		if(gen != pastGeneration){
			len = cellsChart.data.datasets[0].data.length;
			cellsChart.data.datasets[0].data[len] = (parseInt(livingCells) /(parseInt(rows) * parseInt(cols)))*100;
		
			cellsChart.data.labels[len] = gen;
			cellsChart.update();
			pastGeneration = gen;
		}
	}
}, 1);