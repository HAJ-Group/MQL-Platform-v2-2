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
}
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Program table builder
 * @param program
 */
HomeComponent.prototype.addColumn=function (program) {
	let row = this.table.insertRow();
	let cell = row.insertCell();
	cell.innerHTML += "<span class='semester'>Semestre"+program.id +"</span>" + "<hr>" + "<ul>";
	for (let i = 0; i < program.modules.length ; i++) {
		cell.innerHTML+="<li>"+"M"+(i+1)+":"+program.modules[i]+"</li>";
	}
	cell.innerHTML += "</ul>" +"<br>";
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.printSemesters=function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addColumn(this.service.get(i));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
HomeComponent.prototype.show= function (id) {
	let p=$('#'+id);
	this.currentPanel.style["display"]="none";
	p.style.display="block";
	this.currentPanel= p;
};

/*--------------------------------------------------------------------------------------------------------------------*/

HomeComponent.prototype.addStudentToTable = function(student, tableReference){
	// The content of the table
	let row = tableReference.insertRow();
	row.insertCell().innerHTML = student.id;
	row.insertCell().innerHTML = student.firstName;
	row.insertCell().innerHTML = student.lastName;
}

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

HomeComponent.prototype.tablesHeaders = function(reference){
	// The header of the table
	let header = reference.createTHead();
	let number = buildElement('th', 'Numéro');
	let firstName = buildElement('th', 'Nom');
	let lastName = buildElement('th', 'Prénom');
	header.appendChild(number);
	header.appendChild(firstName);
	header.appendChild(lastName);
};

HomeComponent.prototype.showPromotion = function (id) {
	let newPanel = $('#' + id);
	this.currentPromotionPanel.style["display"] = "none";
	this.currentPromotionPanel.style.color = '#0e2f4e';
	newPanel.style.display = "block";
	newPanel.style.color = '#c1350d';
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
/* Main Function */
function HomeMain() {
	let service = new HomeComponentService();
	service.loadAllData(dbHomeProgram, dbStudents[0].data, dbStudents[1].data);
	views['home'] = new HomeComponent(service);
//	views.home.printSemesters();
	views.home.printNews();
	views.home.setNewsRoutes();
	views.home.printStudents();
	// stays last
	addTitleIcon('resources/pictures/Home/title-logo.png', false, 'home');
	detect_subContent_trigger_left_bar('home');
	createBook(dbHomeImages);
}
/*--------------------------------------------------------------------------------------------------------------------*/

