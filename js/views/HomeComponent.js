/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/
function HomeComponent(service) {
	this.service = service;
	this.table= $("#table-program");
	this.table_news= $("#table-news");
	this.firstPromotionStudentsTable = $('#m1-list-students');
	this.secondPromotionStudentsTable = $('#m2-list-students');
	this.professorsReference = $('#professors');
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
	let ctx;
	for (let stat of this.service.db){
		if(screen.width > 700){
			ctx = $('#myChart'+i).getContext('2d');
			stat.options.maintainAspectRatio = true;
		}
		else{
			ctx =$('#phone-myChart'+i).getContext('2d');
		}
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

HomeComponent.prototype.addStudentToTable = function(student, tableReference, promotion = null){
	// The content of the table
	let row = tableReference.insertRow();
	row.insertCell().innerHTML = student.id;
	row.insertCell().innerHTML = student.firstName;
	row.insertCell().innerHTML = student.lastName;
	if (promotion !== null){
		row.insertCell().innerHTML = student.internship;
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.printStudents = function () {
	this.tablesHeadersFirstPromotion(this.firstPromotionStudentsTable);
	this.firstPromotionStudentsTable.createTBody();
	for (let i = 0; i < this.service.sizeFirstCollection(); i++){
		this.addStudentToTable(this.service.getStudentFromFirstCollection(i), this.firstPromotionStudentsTable)
	}
	this.tablesHeadersSecondPromotion(this.secondPromotionStudentsTable);
	this.secondPromotionStudentsTable.createTBody();
	for (let i = 0; i < this.service.sizeSecondCollection(); i++){
		this.addStudentToTable(this.service.getStudentFromSecondCollection(i), this.secondPromotionStudentsTable, 'm2')
	}
	$('#mqlStudentsPromotion').textContent = dbStudents[0].promotion;
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.tablesHeadersFirstPromotion = function(reference) {
	// The header of the table and adjusting size of columns
	cols = [];
	cols.push(buildElement('col', cls('width-20')));
	cols.push(buildElement('col', cls('width-40')));
	cols.push(buildElement('col', cls('width-40')));
	for (let i = 0; i < cols.length; i++) {
		reference.appendChild(cols[i]);
	}

	let header = reference.createTHead();
	colsNames = [];
	colsNames.push(buildElement('th', 'Numéro'));
	colsNames.push(buildElement('th', 'Prénom'));
	colsNames.push(buildElement('th', 'Nom'));
	for (let i = 0; i < colsNames.length; i++) {
		header.appendChild(colsNames[i])
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.tablesHeadersSecondPromotion = function(reference){
	// The header of the table and adjusting size of columns
	cols = [];
	cols.push(buildElement('col', cls('width-10')));
	cols.push(buildElement('col', cls('width-30')));
	cols.push(buildElement('col', cls('width-30')));
	cols.push(buildElement('col', cls('width-30')));
	for (let i = 0; i < cols.length; i++){
		reference.appendChild(cols[i]);
	}

	let header = reference.createTHead();
	colsNames = [];
	colsNames.push(buildElement('th', 'Numéro'));
	colsNames.push(buildElement('th', 'Prénom'));
	colsNames.push(buildElement('th', 'Nom'));
	colsNames.push(buildElement('th', 'Insertion en stage'));
	for (let i = 0; i < colsNames.length; i++){
		header.appendChild(colsNames[i])
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.addProfessor = function(professor){
	// The content of the table
	let row = this.professorsReference.insertRow();
	row.insertCell().innerHTML = professor.id;
	row.insertCell().innerHTML = professor.firstName;
	row.insertCell().innerHTML = professor.lastName;
	row.insertCell().innerHTML = professor.course;
};
HomeComponent.prototype.printProfessors = function(){
	let professors = this.professorsReference;
	if( screen.width <700) {
		 professors = $('#professors-phone');
	}
    for (let i = 0; i < this.service.sizeProfessors(); i++) {
        let professor = this.service.getProfessor(i);
        let courseImagePath = professor.courseImage;
        let profPhotoPath = professor.photo;

        if (courseImagePath === ''){
            courseImagePath = 'resources/pictures/Home/default-image-course.png';
        }
        if (profPhotoPath === ''){
            profPhotoPath = 'resources/pictures/Home/default-professor-photo.png';
        }

        let divProfessor = buildDIV([
                                buildDIV(
                                    buildIMG('' + profPhotoPath, ''),
                                    cls('professor-image')),

                                buildDIV([
                                    buildSPAN('Pr. ' + professor.firstName + ' ' + professor.lastName),
                                    buildBR(),
                                    buildSPAN('(' + professor.course + ')')
                                    ],
                                    cls('professor-name')),

                                buildDIV(
                                    buildIMG('' + courseImagePath, ''),
                                    cls('course-image'))
                                ],

                           cls('professor-container'));
        professors.appendChild(divProfessor);
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.showPromotion = function (id, ballId) {
	let newPanel = $('#' + id);
	this.currentPromotionPanel.style["display"] = "none";
	newPanel.style.display = "block";
	this.currentPromotionPanel = newPanel;
	if(id.includes('1')) {
		$('#mqlStudentsPromotion').textContent = dbStudents[0].promotion;
	}
	else {
		$('#mqlStudentsPromotion').textContent = dbStudents[1].promotion;
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
HomeComponent.prototype.showRemoteNews = function(id) {
	views.spa.route('News');
	$('#nav-news-' + id).click();
	if(screen.width > 700 )
		views.spa.downFunction(1000);
	else
		$('#show-all').style.display = 'block';
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
			cells[j].innerHTML = '<a onclick="views.home.showRemoteNews(' + (i+1) + ')">' + cells[j].innerHTML + '</a>';
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
			{name:'onclick', value:'views.home.showRemoteNews(' + (i+1) + ')'},
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
HomeComponent.prototype.switchColorOfSelectedElement = function(id, id2) {
	$('#' + id).classList.add('red-ball');
	$('#' + id2).classList.remove('red-ball');
};
/*--------------------------------------------------------------------------------------------------------------------*/

