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
	},
	{
		label: "Still Life",
		backgroundColor: "rgba(195,0,28,0.4)",
		borderColor: "rgba(195,0,28,1)",
		pointBackgroundColor: "#fff",
		pointRadius: 5,
		data: [],
	},
	{
		label: "Osciladores",
		backgroundColor: "rgba(124,182,0,0.4)",
		borderColor: "rgba(124,182,0,1)",
		pointBackgroundColor: "#fff",
		pointRadius: 5,
		data: [],
	},
	{
		label: "Gliders",
		backgroundColor: "rgba(139,0,155,0.4)",
		borderColor: "rgba(139,0,155,1)",
		pointBackgroundColor: "#fff",
		pointRadius: 5,
		data: [],
	}],
};
var labels = {
	showLines: true, 
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
				labelString: 'Celulas Vivas'
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
			pat = localStorage.getItem("patterns").split(',')
			len = cellsChart.data.datasets[0].data.length;
			len_p1 = cellsChart.data.datasets[1].data.length;
			len_p2 = cellsChart.data.datasets[2].data.length;
			len_p3 = cellsChart.data.datasets[3].data.length;

			cellsChart.data.datasets[0].data[len] = parseInt(livingCells);
			cellsChart.data.datasets[1].data[len_p1] = parseInt(pat[0]);
			cellsChart.data.datasets[2].data[len_p2] = parseInt(pat[1]);
			cellsChart.data.datasets[3].data[len_p3] = parseInt(pat[2]);

			cellsChart.data.labels[len] = gen;
			cellsChart.update();
			pastGeneration = gen;
		}
	}
}, 1);