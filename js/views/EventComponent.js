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
	this.block_nav = $('#EventNavigation');
	this.block_main = $('#EventMain');
	this.block_switch = $('#EventSwitcher');
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
EventComponent.prototype.fillTimeline = function(max = 5) {
	this.block_timeline.innerHTML = this.htmlSaver.timeline;
	let counter = 0;
	for(let event of this.service.db) {
		if(event.date !== '' && counter < max) {
			let image = '';
			for(let content of event.content) {
				if(content.type.startsWith('image')){
					image = content.images[Math.floor(Math.random() * content.images.length)];
				}
			}
			let list = buildElement('li',
				[
					buildElement('p', event.date, cls('timeline-title')),
					buildSPAN(null, cls('timeline-span')),
				], cls('timeline-item', [{name:'onclick', value:'views.event.timelineNavigate(' + event.id +')'}]));
			let list_content = buildElement('p', null, cls('timeline-description'));
			if (image !== '') {
				list_content.appendChild(buildIMG(image, 'img', cls('timeline-item-image')));
			}
			list_content.appendChild(buildDIV([
					buildElement('h1', event.title),
					textShortener(event.description, 100)
				])
			);
			console.log(event.description);
			list.appendChild(list_content);
			this.block_timeline.appendChild(list);
			counter++;
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
EventComponent.prototype.timelineNavigate = function(id) {
	let page = getValueInRowBYId(id, this.page_blocks);
	this.navigate(page);
	this.selectEvent(id);
	views.spa.markAsSelected(id, 'event');
	views.spa.downFunction(900);
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Create navigation menu dynamically
 */
EventComponent.prototype.fillNavigation = function () {
	this.block_nav.innerHTML = this.htmlSaver.nav;
	this.block_nav.appendChild(buildDIV([
		buildSPAN('Afficher tout', wrapCI(['menuitem', 'd-none'],'all-event',[
			{name:'onclick', value:'views.event.navigate(' + current_page_number + ', true)'}]))
	]));
	for(let event of this.page_blocks[current_page_number - 1]) {
		this.block_nav.appendChild(buildHR());
		this.block_nav.appendChild(buildDIV([
			buildSPAN(event.title, wrapCI(['menuitem', 'nav-event'],'nav-event-' + event.id ,[
				{name:'onclick', value:'views.event.selectEvent(' + event.id + ');  views.spa.markAsSelected('+ event.id +', \'event\')'}]))
		]));
	}
	views.spa.addNavigationPageNavigators(this.block_nav, this.page_blocks.length, 'event');
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
		let eventdiv = buildDIV(buildDIV(event.title, cls(['title', 'event-title'])), id('event-' + event.id));
		let detaildiv = buildDIV(null, cls(['details', 'event-details']));
		if(event.date!=='') {
			detaildiv.appendChild(buildElement('p', event.date, cls('date')));
		}
	//	detaildiv.appendChild(buildDIV(null, wrapIC('gallery', 'gallery-view' + event.id)));
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
				if(content.type === 'card-items') {
					let description = buildElement('p', content.description);
					let ul = buildElement('ul',null);
					for (let item of content.items){
						ul.appendChild(buildElement('li',item));
					}
					description.appendChild(ul);
					contentdiv.appendChild(buildDIV([
						buildIMG(content.image),
						buildDIV([
							buildDIV(content.title, cls('element')),
							description
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
						gridspan.appendChild(buildIMG(image, 'MQL PLATFORM', id('id_' + image, [{name:'onclick', value:'views.spa.popIMG(this.id)'}])));
					}
					griddiv.appendChild(gridspan);
					contentdiv.appendChild(griddiv);
				}
				if(content.type === 'video') {
					contentdiv.appendChild(buildElement('p', content.description));
					for(let video of content.videos) {
						let videoo = buildElement('video',null,cls('mql-video'));
						videoo.controls = true;
						videoo.appendChild(buildElement('source',null,wrap([{name:'src',value:video}])));
						contentdiv.appendChild(
							videoo
						);
					}
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
			this.block_switch.appendChild(buildSPAN(i, cls('active-page', [{name:'onclick', value:'views.event.navigate(' + i + ', true)'}])));
		}
		else {
			this.block_switch.appendChild(buildSPAN(i, wrap([{name:'onclick', value:'views.event.navigate(' + i + ', true)'}])));
		}
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Navigate between pages
 * @param page_number
 * @param top
 * @param all
 */
EventComponent.prototype.navigate = function(page_number=1, all = false, top=false) {
	current_page_number = page_number;
	this.fillTimeline();
	this.fillNavigation();
	this.fillMain();
	this.fillSwitcher();
	views.spa.addTitleIcon('resources/pictures/Event/Event-logo.png', true, 'event');
	views.spa.detect_subContent_trigger_left_bar('event');
	$('#all-event').style.display = 'none';
	if(top) window.location.href = '#NewsMain';
	if(!all) {
		try {
			views.event.selectEvent(this.page_blocks[current_page_number - 1][0].id);
			views.spa.markAsSelected(this.page_blocks[current_page_number - 1][0].id, 'event');
		} catch (e) {}
	}
	views.spa.setTheme();
};

EventComponent.prototype.selectEvent = function(id){
	for (let i = 0; i < this.service.size(); i++) {
		if (this.service.get(i).id === id){
			this.displayEvent(this.service.get(i));
		}
	}
};

EventComponent.prototype.displayEvent = function(event) {
	this.block_main = $('#EventMain');
	let shows = [];
	let shows_counter = 0;
		let eventdiv = buildDIV(buildDIV(event.title, cls(['title', 'event-title'])), id('event-' + event.id));
		let detaildiv = buildDIV(null, cls(['details', 'event-details']));
		if(event.date!=='') {
			detaildiv.appendChild(buildElement('p', event.date, cls('date')));
		}
		//detaildiv.appendChild(buildDIV(null, wrapIC('gallery', 'gallery-view' + event.id)));
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
				if(content.type === 'card-items') {
					let description = buildElement('p', content.description);
					let ul = buildElement('ul',null);
					for (let item of content.items){
						ul.appendChild(buildElement('li',item));
					}
					description.appendChild(ul);
					contentdiv.appendChild(buildDIV([
						buildIMG(content.image),
						buildDIV([
							buildDIV(content.title, cls('element')),
							description
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
						gridspan.appendChild(buildIMG(image, 'MQL PLATFORM', id('id_' + image, [{name:'onclick', value:'views.spa.popIMG(this.id)'}])));
					}
					griddiv.appendChild(gridspan);
					contentdiv.appendChild(griddiv);
				}
				if(content.type === 'video') {
					contentdiv.appendChild(buildElement('p', content.description));
					for(let video of content.videos) {
						let videoo = buildElement('video',null,cls('mql-video'));
						videoo.controls = true;
						videoo.appendChild(buildElement('source',null,wrap([{name:'src',value:video}])));
						contentdiv.appendChild(
							videoo
						);
					}
				}
			}
			detaildiv.appendChild(contentdiv);
		}
		eventdiv.appendChild(detaildiv);
		this.block_main.innerHTML = null;
		this.block_main.appendChild(eventdiv);

	for(let show of shows) {
		createBook(show.book_pics, show.book_name);
	}
	this.block_switch.innerHTML = '';
	views.spa.addTitleIcon('resources/pictures/Event/Event-logo.png', true, 'event');
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
		views.spa.showEmptyErrorResult();
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
	$('#eventSubmit').setAttribute('onclick', 'views.event.submitData()');
	views.spa.popFORM('EventForm');
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
	$('#eventSubmit').setAttribute('onclick', 'views.event.submitData(\'edit\', ' + index + ')');
	views.spa.popFORM('EventForm');
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
				views.event.addData();
			} else {
				views.spa.route('Home');
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
		$('#eventSubmit').setAttribute('onclick', 'views.event.submitData()');
	}
	this.page_blocks = split(this.service.db, MAX_EVENT_PER_PAGE);
	views.spa.closeFORM('EventForm');
	this.navigate();
};
EventComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#eventSubmit');
	submit_element.click();
};
/*--------------------------------------------------------------------------------------------------------------------*/
