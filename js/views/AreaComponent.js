/*Default class*/
function AreaComponent(service) { 
	//TODO: Intitialize controller for AreaComponent
	this.service = service; 
	//this.table = this.get('table-AreaID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
}
/*--------------------------------------------------------------------------------------------------------------------*/
// Adding a row in the table member 
AreaComponent.prototype.addAreaRow = function (oneArea) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Printing all service data into the table member 
AreaComponent.prototype.printAreaList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addAreaRow(this.service.get(i));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.promptLogin = function () {
	$('#restricted').style.display = 'none';
	let window = $('#AreaForm');
	window.style.display = 'block';
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.authenticate = function() {
	let username = $('#username').value;
	let password = $('#password').value;
	if(this.service.isExist(username, password)) {
		// GRANT ACCESS (WORKING ONLY WHEN DATA IS EXTERNAL)
		sessionStorage.setItem('ACCESS', username);
		this.loadData();
	} else {
		$('#errorMess').innerHTML = 'Username or Password not valid';
		$('#errorBlock').style.display = 'block';
	}
	this.refresh()
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.logout = function() {
	// DENY ACCESS
	sessionStorage.removeItem('ACCESS');
	console.log(sessionStorage.getItem('ACCESS'));
	route('Home');
	this.refresh();
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.loadData = function() {
	// REMOVE RESTRICTIONS
	$('#errorBlock').style.display = 'none';
	$('#AreaForm').style.display = 'none';
	$('#user').innerHTML = sessionStorage.getItem('ACCESS');
	$('#phone-user').innerHTML = sessionStorage.getItem('ACCESS');
	$('#restricted').style.display = 'block';
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.cancel = function () {
	route('Home');
};
/*--------------------------------------------------------------------------------------------------------------------*/
AreaComponent.prototype.refresh = function () {
	views.news.navigate();
	views.event.navigate();
	views.laureate.navigate();
	views.partner.navigate();
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */ 
function AreaMain() {
	let service = new AreaComponentService();
	service.load(dbArea);
	views['area'] = new AreaComponent(service);
	//views.area.printAreaList(); Uncomment to print data in table member
	if(sessionStorage.getItem('ACCESS') !== null){
		views.area.loadData();
	} else views.area.promptLogin();
}
