/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/
function ActivityComponent(service) {
	//TODO: Intitialize controller for ActivityComponent
	this.service = service;
	//this.table = this.get('table-ActivityID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
}
/*--------------------------------------------------------------------------------------------------------------------*/
// Adding a row in the table member
ActivityComponent.prototype.addActivityRow = function (oneActivity) {
	let row = this.table.insertRow();
	//row.insertCell().innerHTML = news.id;
	//TODO:INSERT DATA IN CELLS
};
// Printing all service data into the table member
ActivityComponent.prototype.printActivityList = function () {
	for (let i = 0; i < this.service.size(); i++) {
		this.addActivityRow(this.service.get(i));
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------*/
ActivityComponent.prototype.printSemesters = function(){
	let subjectZone = $('#zone');
	for (let i = 0; i < this.service.size(); i++) {
		let semesterI = this.service.get(i);
		let semesterName = '';
		switch (i + 1) {
			case 1: semesterName = 'Le premier semestre'; break;
			case 2: semesterName = 'Le deuxième semestre'; break;
			case 3: semesterName = 'Le troisième semestre'; break;
			case 4: semesterName = 'Le quatrième semestre (Stage pré-embauche)'; break;
		}

		let ulModulesElement = buildElement('ul', null);
		let moduleImage = '';
		for (let j = 0; j < semesterI.modules.length; j++) {
			moduleImage = semesterI.modules[0];
			if (j === 0) continue;
			ulModulesElement.appendChild(buildElement('li', 'M' + (j) + '(' + semesterI.modules[j] + ')'));
		}

		let activitiesElement = [];
		let activityImage = '';
		for (let j = 0; j < semesterI.activity.length; j++) {
			activityImage = semesterI.activity[0];
			if(j === 0) continue;
			activitiesElement.push(buildParagraph( [buildSPAN(),
				semesterI.activity[j]]
			));
		}

		let cards = [];
		for (let j = 1; j <= 3; j++) {
			if (j === 1){
				cards.push(buildDIV(
					buildParagraph(semesterI.description[1]), cls('semester-description')
				));

			}
			let divCard;
			let divCardText;
			let divModules;
			let divActivities;
			let divCardFooter;
			if (j === 2){

				if(i !==3) {
					divCard = buildDIV(
						buildIMG(moduleImage, '', cls('activity-card-image')),
						cls('card'));

					divCardText = buildDIV([
						buildDIV('Modules', cls('card-subject')),
					], cls('card-text'));

					divModules = buildDIV(null, cls('subject'));

					divModules.appendChild(ulModulesElement);

					divCardText.appendChild(divModules);

					divCardFooter = buildDIV(
						buildIMG('resources/pictures/Activity/logo-mql2.png', '',
							cls('logo-mql')),
						cls('card-footer'));

					divCard.appendChild(divCardText);
					divCard.appendChild(divCardFooter);

					cards.push(divCard);
				}
			}
			if (j === 3){
				divCard = buildDIV(
					buildIMG(activityImage, '', cls('activity-card-image')),
					wrapIC('card', 'card'));

				divCardText = buildDIV([
					buildDIV('Objectifs', cls('card-subject')),
				], cls('card-text'));

				divActivities = buildDIV(null, cls('subject'));
				for (let activity of activitiesElement) {
					divActivities.appendChild(activity);
				}

				divCardText.appendChild(divActivities);

				divCardFooter = buildDIV(
					buildIMG('resources/pictures/Activity/logo-mql2.png', '',
						cls('logo-mql')),
					cls('card-footer'));

				divCard.appendChild(divCardText);
				divCard.appendChild(divCardFooter);

				cards.push(divCard);
			}
		}

	/*	console.log(cards);*/
		let bigContainer = buildDIV(
			buildDIV(semesterName, wrapIC('collapse-' + (i + 1), 'title-top-cards collapsible '+'collapse-' + (i + 1))),
			cls('big-container')
		);

		let cardContainer = buildDIV(null, cls('cards-container content-card'));
		for (let card of cards){
			cardContainer.appendChild(card);
		}

		bigContainer.appendChild(cardContainer);
		subjectZone.appendChild(bigContainer);
	}
};

/*--------------------------------------------------------------------------------------------------------------------*/
ActivityComponent.prototype.updateView = function () {
	if(window.innerWidth > 700){
		window.location.reload();
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
function collapse(){
	let coll = $(".collapsible");
	let i;


	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active-element");
			let content = this.nextElementSibling;

			if (content.style.maxHeight){
				content.style.maxHeight = null;
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
			}
		});
	}
}
/* Tree model --------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
let toggle = false;
let last_branch_toggled;
ActivityComponent.prototype.showBranch = function(id) {
	toggle = !toggle;
	let titles = document.getElementsByClassName('branch-title');
	let branches = document.getElementsByClassName('branch-content');
	for(let t of titles) {
		t.classList.remove('branch-active');
	}
	if(toggle) {
		titles[id].classList.add('branch-active');
		branches[id].style.display = 'block';
		last_branch_toggled = id;
	}
};
/*--------------------------------------------------------------------------------------------------------------------*/
