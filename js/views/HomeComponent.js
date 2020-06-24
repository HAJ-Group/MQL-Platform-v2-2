/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/ 
function HomeComponent(service) {
	this.service = service;
	this.table= $("#table-program");
	this.table_news= $("#table-news");
	this.firstPromotionStudentsTable = $('#m1-list-students');
	this.secondPromotionStudentsTable = $('#m2-list-students');
	this.news_idSaver = [];
	this.currentPanel = $("#mql-presentation");
	this.currentPromotionPanel = $("#table1");
	this.newsBlock = $('.home-news-content')[0];
	this.htmlSaver = {
		news: this.newsBlock.innerHTML,
	}
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
			options: stat.options,
		});
		i++;
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/

HomeComponent.prototype.addStudentToTable = function(student, tableReference){
	// The content of the table
	let row = tableReference.insertRow();
	row.insertCell().innerHTML = student.id;
	row.insertCell().innerHTML = student.firstName;
	row.insertCell().innerHTML = student.lastName;
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.printStudents = function () {

	this.tablesHeaders(this.firstPromotionStudentsTable);
	this.firstPromotionStudentsTable.createTBody();
	for (let i = 0; i < this.service.sizeFirstCollection(); i++){
		this.addStudentToTable(this.service.getStudentFromFirstCollection(i), this.firstPromotionStudentsTable)
	}

	this.tablesHeaders(this.secondPromotionStudentsTable);
	this.secondPromotionStudentsTable.createTBody();
	for (let i = 0; i < this.service.sizeSecondCollection(); i++){
		this.addStudentToTable(this.service.getStudentFromSecondCollection(i), this.secondPromotionStudentsTable)
	}

};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.tablesHeaders = function(reference){
	// The header of the table and adjusting size of columns
	let col = buildElement('col');
	let col2 = buildElement('col');
	let col3 = buildElement('col');
	col.setAttribute('style', 'width: 20%');
	col2.setAttribute('style', 'width: 40%');
	col3.setAttribute('style', 'width: 40%');
	reference.appendChild(col);
	reference.appendChild(col2);
	reference.appendChild(col3);

	let header = reference.createTHead();
	let number = buildElement('th', 'Numéro');
	let firstName = buildElement('th', 'Nom');
	let lastName = buildElement('th', 'Prénom');
	header.appendChild(number);
	header.appendChild(firstName);
	header.appendChild(lastName);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.showPromotion = function (id, ballId) {
	let newPanel = $('#' + id);
	this.currentPromotionPanel.style["display"] = "none";
	newPanel.style.display = "block";
	this.currentPromotionPanel = newPanel;

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
let presenterTimer;
let last_presenter_element;
HomeComponent.prototype.startPresenter = function(start = 0) {
	let counter = start;
	function handler() {
		if(counter === 4) {
			counter = 0;
		}
		if(counter > 0) views.home.hidePresented(counter - 1);
		else views.home.hidePresented(3);
		views.home.present(counter++);
		last_presenter_element = counter;
	}
	presenterTimer = setInterval(handler, 2000);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.present = function (id) {
	$('.presenter-item')[id].style.opacity = '1';
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.hidePresented = function (id) {
	$('.presenter-item')[id].style.opacity = '0';
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.pausePresenter = function() {
	clearInterval(presenterTimer);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.resumePresenter = function() {
	this.startPresenter(last_presenter_element);
};
/*--------------------------------------------------------------------------------------------------------------------*/
let max_saver;
let newsTimer;
let last_news_element = 1;
HomeComponent.prototype.fillNews = function(max = 5) {
	this.newsBlock.innerHTML = this.htmlSaver.news;
	let service = views.news.service;
	if(max > service.size()) max = service.size();
	for(let i=0; i<max; i++) {
		this.newsBlock.appendChild(buildDIV(service.get(i).title, cls('news-item', [
			{name:'onclick', value:'showNews(' + (i+1) + ')'},
		])));
	}
	this.showNews(0);
	max_saver = max;
	this.startNews(max, 0);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.startNews = function(max, start = 0, timeout = 2000) {
	let counter = start;
	function handler() {
		if(counter === max) {
			counter = 0;
		}
		if(counter > 0) views.home.hideNews(counter - 1);
		else views.home.hideNews(max-1);
		views.home.showNews(counter++);
		last_news_element = counter;
	}
	newsTimer = setInterval(handler, timeout);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.showNews = function (id) {
	$('.news-item')[id].style.display = 'block';

};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.hideNews = function (id) {
	$('.news-item')[id].style.display = 'none';
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.switchNews = function() {
	let counter = last_news_element;
	if(counter === max_saver) {
		counter = 0;
	}
	if(counter > 0) this.hideNews(counter - 1);
	else this.hideNews(max_saver - 1);
	this.showNews(counter++);
	last_news_element = counter;
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.pauseNews = function() {
	clearInterval(newsTimer);
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.resumeNews = function() {
	this.startNews(max_saver, last_news_element);
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function HomeMain() {
	let service = new HomeComponentService();
	service.loadAllData(dbHomestats1, dbStudents[0].data, dbStudents[1].data);
	views['home'] = new HomeComponent(service);
	views['home'].printStats();
	views.home.startPresenter();
    views.home.printStudents();
    views.home.fillNews();
	views.home.printNews();
	views.home.setNewsRoutes();
	// stays last
	addTitleIcon('resources/pictures/Home/title-logo.png', false, 'home');
	detect_subContent_trigger_left_bar('home');
	createBook(dbHomeImages);
}
/*--------------------------------------------------------------------------------------------------------------------*/

