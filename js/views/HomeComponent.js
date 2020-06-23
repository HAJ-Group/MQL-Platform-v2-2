/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/ 
function HomeComponent(service) {
	this.service = service;
	this.table= $("#table-program");
	this.table_news= $("#table-news");
	this.news_idSaver = [];
	this.currentPanel = $("#mql-presentation");
}
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.show= function (id) {
	let p=$('#'+id);
	this.currentPanel.style["display"]="none";
	p.style.display="block";
	this.currentPanel= p;
};
/*--------------------------------------------------------------------------------------------------------------------*/
// printStats
HomeComponent.prototype.printStats= function () {
	for (let stat of this.service.db){

	}
	let ctx = $('#myChart').getContext('2d');
	let myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Capgemini', 'CGI', 'CEGEDIM', 'UMANIS', 'ATOS', 'S2M'],
			datasets: [{
				label: 'Nombre/Société',
				data: [77, 44, 7, 7, 6, 3],
				backgroundColor:'rgb(53, 69, 108)',
				borderColor:'rgb(216, 49, 57)',
				borderWidth: 1
			}]
		},
		options: {
			title: {
				display: true,
				text: 'Insertion professionnelle des mqlistes entre 2015 et 2019'
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * News Table builder (Related Service with NewsComponent)
 * @param news
 */
HomeComponent.prototype.addNews=function (news) {
	let row = this.table_news.insertRow();
	this.news_idSaver.push(news.id);
	row.insertCell().innerHTML = formattedDate(news.date);
	row.insertCell().innerHTML = news.title;
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.printNews=function (max = 5) {
	let service = views.news.service;
	if(max > service.size()) max = service.size();
	for (let i = 0; i < max; i++) {
		this.addNews(service.get(i));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * News link managers
 */
HomeComponent.prototype.setNewsRoutes = function () {
	let rows = this.table_news.rows;
	for(let i=0; i<rows.length; i++) {
		let cells = rows[i].cells;
		for(let j=1; j<cells.length; j++) {
			cells[j].innerHTML = '<a onclick="showNews(' + (i+1) + ')">' + cells[j].innerHTML + '</a>';
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function HomeMain() {
	let service = new HomeComponentService();
	service.load(dbHomestats1);
	views['home'] = new HomeComponent(service);
	views['home'].printStats();
	views.home.printNews();
	views.home.setNewsRoutes();
	// stays last
	addTitleIcon('resources/pictures/Home/title-logo.png', false, 'home');
	detect_subContent_trigger_left_bar('home');
	createBook(dbHomeImages);
}
/*--------------------------------------------------------------------------------------------------------------------*/

