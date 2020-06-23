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
HomeComponent.prototype.show= function (id, element = null) {
	let p=$('#'+id);
	this.currentPanel.style["display"]="none";
	p.style.display="block";
	this.currentPanel= p;
	// Active management
	if(element !== null) {
		for(let e of $('.home-span')) {
			e.classList.remove('home-span-active');
		}
		element.classList.add('home-span-active');
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
// printStats
HomeComponent.prototype.printStats= function () {
	let i=0;
	for (let stat of this.service.db){
		let ctx = $('#myChart'+i).getContext('2d');
		let myChart = new Chart(ctx, {
			type: stat.type,
			data: {
				labels: stat.labels,
				datasets: stat.dataSet
			},
			options: {
				title: {
					display: true,
					text: stat.title,
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
		i++;
	}
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
HomeComponent.prototype.startPresenter = function() {
	let counter = 0;
	function handler() {
		if(counter === 4) {
			counter = 0;
		}
		if(counter > 0) views.home.hidePresented(counter - 1);
		else views.home.hidePresented(3);
		views.home.present(counter++);
	}
	setInterval(handler, 1000);
};

HomeComponent.prototype.present = function (id) {
	$('.presenter-item')[id].style.opacity = '1';
};
HomeComponent.prototype.hidePresented = function (id) {
	$('.presenter-item')[id].style.opacity = '0';
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function HomeMain() {
	let service = new HomeComponentService();
	service.load(dbHomestats1);
	views['home'] = new HomeComponent(service);
	views['home'].printStats();
	views.home.startPresenter();
//	views.home.printSemesters();
	// views.home.printNews();
	// views.home.setNewsRoutes();
	// stays last
	addTitleIcon('resources/pictures/Home/title-logo.png', false, 'home');
	detect_subContent_trigger_left_bar('home');
	createBook(dbHomeImages);
}
/*--------------------------------------------------------------------------------------------------------------------*/

