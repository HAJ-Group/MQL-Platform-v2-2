/* Default Model for HomeComponent */ 
function Home(type,labels,dataSet,options) {
	this.type = type;
	this.labels = labels;
	this.dataSet = dataSet;
	this.options = options;
}

function HomeStudents(id, firstName, lastName, internship) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.internship = internship;
}


function HomeProfessors(id, firstName, lastName, photo, course, courseImage) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.photo = photo;
	this.course = course;
	this.courseImage = courseImage;
}
