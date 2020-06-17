/*Global Variables*/
const MAX_EVENT_PER_PAGE = 5;
/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/ 
function EventComponent(service) { 
	//TODO: Intitialize controller for EventComponent
	this.service = service; 
	//this.table = this.get('table-EventID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	this.block_timeline = $('#timeline');
	this.block_nav = $('#navigation');
	this.block_main = $('#main');
	this.block_switch = $('#switcher');
	this.htmlSaver = {
		timeline: this.block_timeline.innerHTML,
		nav: this.block_nav.innerHTML,
		main: this.block_main.innerHTML,
		switcher: this.block_switch.innerHTML,
	};
}
/*--------------------------------------------------------------------------------------------------------------------*/
// Adding a row in the table member 
EventComponent.prototype.addEventRow = function (oneEvent) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Printing all service data into the table member 
EventComponent.prototype.printEventList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addEventRow(this.service.get(i)); 
	} 
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.fillTimeline = function(max = 3) {
	this.block_timeline.innerHTML = this.htmlSaver.timeline;
	let counter = 0;
	let image = '';
	for(let event of this.service.db) {
		for(let content of event.content) {
			if(content.type.startsWith('image')){
				image = content.images[Math.floor(Math.random() * content.images.length)];
			}
		}
		if(event.date !== '' && counter < 3) {
			this.block_timeline.appendChild(buildElement('li',
				[
					buildElement('p', event.date, cls('timeline-title')),
					buildSPAN(null, cls('timeline-span')),
					buildElement('p', [
						buildIMG(image, 'img', cls('timeline-item-image')),
						buildElement('h1', event.title),
						textShortener(event.description, 100)
					], cls('timeline-description'))
				], cls('timeline-item', [{name:'onclick', value:'view.timelineNavigate(' + event.id +')'}])));
			counter++;
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.timelineNavigate = function(id) {
	if(current_page_number !== 1) {
		this.navigate();
		this.timelineNavigate(id);
	} else location.href = '#' + id;
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create navigation menu dynamically
 */
EventComponent.prototype.fillNavigation = function () {
	this.block_nav.innerHTML = this.htmlSaver.nav;
	for(let event of this.page_blocks[current_page_number - 1]) {
		this.block_nav.appendChild(buildHR());
		this.block_nav.appendChild(buildDIV(
			buildLINK('#' + event.id, event.title, cls('menuitem'))
		));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Filling main block
 */
EventComponent.prototype.fillMain = function() {
	this.block_main.innerHTML = this.htmlSaver.main;
	let shows = [];
	let shows_counter = 0;
	for(let event of this.page_blocks[current_page_number - 1]) {
		let eventdiv = buildDIV(buildDIV(event.title, cls('title')), id(event.id));
		let detaildiv = buildDIV(null, cls('details'));
		if(event.date!=='') {
			detaildiv.appendChild(buildElement('p', event.date, cls('date')));
		}
		detaildiv.appendChild(buildDIV(null, wrapIC('gallery', 'gallery-view' + event.id)));
		detaildiv.appendChild(buildElement('p', event.description));
		// Contents
		if(event.content !== []) {
			let contentdiv = buildDIV(null, cls('sub-title'));
			for(let content of event.content) {
				if(content.type === 'card') {
					contentdiv.appendChild(buildDIV([
						buildIMG(content.image),
						buildDIV([
							buildDIV(content.title, cls('element')),
							buildElement('p', content.description)
						], cls('description'))
					], cls('card-event')));
				}
				if(content.type === 'image-show') {
					contentdiv.appendChild(buildDIV([
						buildDIV([
							buildDIV(content.title, cls('element')),
							buildDIV(null, wrapIC('book' + shows_counter, 'book-images'))
						], cls('full-width'))
					], cls('card-event')));
					shows.push({
						book_name: 'book' + shows_counter++,
						book_pics: content.images,
					});
				}
				if(content.type === 'image-grid') {
					contentdiv.appendChild(buildElement('p', content.description));
					let griddiv = buildDIV(null, cls('row'));
					let gridspan = buildSPAN(null, cls('column'));
					for(let image of content.images) {
						gridspan.appendChild(buildIMG(image, 'MQL PLATFORM', id('id_' + image, [{name:'onclick', value:'popIMG(this.id)'}])));
					}
					griddiv.appendChild(gridspan);
					contentdiv.appendChild(griddiv);
				}
			}
			detaildiv.appendChild(contentdiv);
		}
		eventdiv.appendChild(detaildiv);
		this.block_main.appendChild(eventdiv);
	}
	for(let show of shows) {
		createBook(show.book_pics, show.book_name);
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create page switcher dynamically
 */
EventComponent.prototype.fillSwitcher = function () {
	this.block_switch.innerHTML = this.htmlSaver.switcher;
	let pages = this.page_blocks.length;
	for(let i = 1; i<=pages; i++) {
		if(current_page_number === i){
			this.block_switch.appendChild(buildSPAN(i, cls('active-page', [{name:'onclick', value:'view.navigate(' + i + ', true)'}])));
		}
		else {
			this.block_switch.appendChild(buildSPAN(i, wrap([{name:'onclick', value:'view.navigate(' + i + ', true)'}])));
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Navigate between pages
 * @param page_number
 * @param top
 */
EventComponent.prototype.navigate = function(page_number=1, top=false) {
	current_page_number = page_number;
	this.fillTimeline();
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	addTitleIcon('resources/pictures/Event/Event-logo.png', true);
	detect_subContent_trigger_left_bar();
	if(top) window.location.href = '#main';
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Filtering function works with search box
 */
EventComponent.prototype.filterKey = function () {
	let key = $('#key').value;
	if(key === '') {
		// LOAD ALL DATA
		this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	} else {
		// LOAD BY KEY
		this.page_blocks = split(this.service.searchByKey(key), MAX_EVENT_PER_PAGE);
		console.log(this.service.searchByKey(key));
	}
	if(this.page_blocks.length === 0) {
		$('.error-message')[0].innerHTML = 'Event not Found !';
		$('#key').setAttribute('class', 'search-error');
		showEmptyErrorResult();
	}
	else {
		$('.error-message')[0].innerHTML = '';
		$('#key').setAttribute('class', 'search-input');
	}
	this.navigate();
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* FORM SERVICES */
EventComponent.prototype.addData = function() {
	$('#eventSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.editData = function(index) {
	let el_title = $('#eventTitle');
	let el_desc = $('#eventDescription');
	//....
	let target = this.service.get(index);
	el_title.value = target.title;
	el_desc.value = target.description;
	//...
	$('#eventSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Event ?')) {
		this.service.remove(index);
		//....
		try {
			this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
			this.navigate();
		} catch (e) {
			if(confirm('None Event is found! Add new one ?')) {
				view.addData();
			} else {
				route('../Home');
			}
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let title = $('#eventTitle').value;
	let desc = $('#eventDescription').value;
	//...
	if(action === 'add') {
		this.service.add(new EventModel(this.service.size() + 1, title,'', desc));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.title = title;
		target.description = desc;
		//...
		$('#eventSubmit').setAttribute('onclick', 'view.submitData()');
	}
	this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	closeFORM();
	this.navigate();
};
EventComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#eventSubmit');
	submit_element.click();
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */ 
function EventMain() {
	service = new EventComponentService(); 
	service.load(dbEvent);
	view = new EventComponent(service); 
	try {
		view.fillTimeline();
		view.fillNavigation();
		view.fillMain();
		view.fillSwitcher();
	} catch (e) {
		if(confirm('None Event is found! Add new one ?')) {
			view.addData();
		} else {
			route('Home');
		}
	}
	// Stays last
	addTitleIcon('resources/pictures/Event/Event-logo.png', true);
	detect_subContent_trigger_left_bar();
	setKeysAction('.form-content',view.triggerSubmit.bind(view));

}
/*--------------------------------------------------------------------------------------------------------------------*/
