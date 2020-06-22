/* Global data source table for EventComponent */
/**
 * You can use these types : card, image-show, image-grid,
 * @type {*[]}
 */

let dbEventBook1 = [
	'resources/pictures/Event/CAP.JPG',
	'resources/pictures/Event/cap1.JPG',
	'resources/pictures/Event/cap2.JPG',
	'resources/pictures/Event/CGI.JPG',
	'resources/pictures/Event/CGI2.JPG',
	'resources/pictures/Event/CGI1.JPG',
	'resources/pictures/Event/CGI3.JPG',
	'resources/pictures/Event/UMANIS2.JPG',
	'resources/pictures/Event/UMANIS4.JPG',
	'resources/pictures/Event/CGI.JPG',
	'resources/pictures/Event/CGI3.JPG',
];

let dbEventBook2 = [
	'resources/pictures/Event/JE1.JPG',
	'resources/pictures/Event/JE2.JPG',
	'resources/pictures/Event/JE3.JPG',
	'resources/pictures/Event/JE4.JPG',
	'resources/pictures/Event/JE5.JPG',
	'resources/pictures/Event/JE6.JPG',
];

let dbEvent = [
	{
		id: 1,
		title:'Concours',
		date : 'À partir d\'octobre',
		description:'Un Mqliste, dans sa deuxième année de formation, commence déjà  à passer des entretiens de stage pré-ambauche, en fait nous retrouvons, à la faculté des sciences, des multinationales dans des sessions de recrutement organisées par les étudiants MQL.' +
			' Ces compagnes de stages se déroulent généralemenet en 3 phases : ',
		content:[
			{
				type:'card',
				title:'Test PsychoTechnique',
				description: 'Les tests psychotechniques sont utilisés pour mesurer les aptitudes logiques, verbales et numériques de l\'étudiant. Ils mesurent les capacités de réaction, de réflexion, de concentration mais aussi la faculté à intégrer et à traiter l’information ou la stimulation.',
				image:'resources/pictures/Event/Psytest.jpg',
			},
			{
				type:'card',
				title:'Test Technique',
				description: 'Un entretien technique  sur les différents aspects du developpement informatique selon le besoin de l\'entreprise.',
				image:'resources/pictures/Event/TechTest.jpg',
			},
			{
				type:'card',
				title:'Entretien RH',
				description: 'Le candidat doit mettre en avant son expérience, ses compétences et sa personnalité à travers la description de son parcours professionnel.',
				image:'resources/pictures/Event/HRInter.jpg',
			},
			{
				type:'image-show',
				title:'Galerie',
				images: dbEventBook1,
			},
		],
	},
	{
		id: 2,
		title:'Compagnes de stages',
		date : 'À partir d\'octobre',
		description:'Un Mqliste, dans sa deuxième année de formation, commence déjà  à passer des entretiens de stage pré-ambauche, en fait nous retrouvons, à la faculté des sciences, des multinationales dans des sessions de recrutement organisées par les étudiants MQL.' +
			' Ces compagnes de stages se déroulent généralemenet en 3 phases : ',
		content:[
			{
				type:'card',
				title:'Test PsychoTechnique',
				description: 'Les tests psychotechniques sont utilisés pour mesurer les aptitudes logiques, verbales et numériques de l\'étudiant. Ils mesurent les capacités de réaction, de réflexion, de concentration mais aussi la faculté à intégrer et à traiter l’information ou la stimulation.',
				image:'resources/pictures/Event/Psytest.jpg',
			},
			{
				type:'card',
				title:'Test Technique',
				description: 'Un entretien technique  sur les différents aspects du developpement informatique selon le besoin de l\'entreprise.',
				image:'resources/pictures/Event/TechTest.jpg',
			},
			{
				type:'card',
				title:'Entretien RH',
				description: 'Le candidat doit mettre en avant son expérience, ses compétences et sa personnalité à travers la description de son parcours professionnel.',
				image:'resources/pictures/Event/HRInter.jpg',
			},
			{
				type:'image-show',
				title:'Galerie',
				images: dbEventBook1,
			},
		],
	},
	{
		id:3,
		title: 'Journée Entrepreunariat',
		date:'Novembre',
		description: 'Les étudiants MQL organisent une journée entrepreneuriat, dont des équipes de différents masters présentent leurs projets devant un jury pour une durée de 7 minutes.',
		content: [
			{
				type:'image-show',
				title:'Galerie',
				images: dbEventBook2,
			}
		],
	},
	{
		id:4,
		title: 'Cérémonie de remise de diplomes',
		date:'Mars-Avril',
		description: 'La cérémonie de remise de diplômes est une cérémonie organisée afin de célébrer nos jeunes diplomés, que la majorité ont déjâ signés contrats CDI avec des multinationales notamment Capgemini,CGI,ATOS .... ',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['resources/pictures/Event/economiste.jpg','resources/pictures/Event/CE1.jpg'],
			},
			{
				type:'image-grid',
				title:'Galerie',
				description:'Les lauréats MQL ne s\'arretent pas à l\'insertion professionnelle mais excellent dans leurs parcours professionnels et deviennent des éléments clé pour le developpement de ses entreprises. ils aident également les nouvelles générations( formations, informations ...) dans une solidarité familiale.',
				images: [
					'resources/pictures/Event/CE2-1.jpg',
					'resources/pictures/Event/CE2-2.jpg',
				],
			},
		],
	},
	{
		id:5,
		title:'Soutenance',
		date:'',
		description:'MQL dépasse les limtes de la formation et l\'éducation; MQL est une équipe, une famille, un style de vie.',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['resources/pictures/App/mqlfam.JPG','resources/pictures/Event/sortie.jpg'],
			},
		],
	},
	{
		id:6,
		title:'Evenements para-scolaire',
		date:'',
		description:'MQL dépasse les limtes de la formation et l\'éducation; MQL est une équipe, une famille, un style de vie.',
		content: [
			{
				type:'image-grid',
				title:'Galerie',
				description:'',
				images: ['resources/pictures/App/mqlfam.JPG','resources/pictures/Event/sortie.jpg'],
			},
		],
	},
];


