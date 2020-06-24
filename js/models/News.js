/* Default Model for NewsComponent */ 
function News(id,title,date,description='',images=[],id_event='') {
	this.id = id;
	this.title=title;
	this.date=date;
	this.description=description;
	this.images=images;
	this.id_event = id_event;
}
