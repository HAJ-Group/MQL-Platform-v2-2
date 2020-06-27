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
		title:'Concours d\'accès',
		date : 'Septembre',
		description:'L\'accès au master qualité du logiciel est limité, les étudiants titulaires d’une Licence en Sciences Mathématiques et Informatiques (SMI), ou titulaires d’une Maîtrise en Informatique, ou titulaires d’un diplôme équivalent, sont aménés, après une étude de dossier, à passer un concours écrit et oral.',
		content:[
			{
				type:'card-items',
				title:'Etude de dossier',
				description: 'Le dossier de candidature comprte les documents suivants : ',
				items :['Photocopies des Attestations de réussite','Photocopies des Relevés des notes des années universitaires','Photocopie de la carte d’identité nationale','Une photo'],
				image:'resources/pictures/Event/dossier.png',
			},
			{
				type:'card',
				title:'Concours Ecrit',
				description: 'Le concours écrit vise à selectionner les candidats ayant les bons acquis de la Programmation Orientée Objet (C++/ JAVA JAVAEE).',
				image:'resources/pictures/Event/Psytest.jpg',
			},
			{
				type:'card',
				title:'Entretien Oral',
				description: 'La deuxième étape du concours consiste à choisir des étudiants motivés, confiants avec une capacité d\'écoute et un bon niveau de communication et , l\'étudiant présente son parcours universitaire et professionnel et répond aux questions du jury.',
				image:'resources/pictures/Event/TechTest.jpg',
			},

		],
	},
	{
		id: 2,
		title:'Compagnes de stages',
		date : 'Octobre',
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
				type:'video',
				description:'',
				videos: ['resources/videos/recrutement2019.mp4'],
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
		date:'Mars',
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
			{
				type:'video',
				description:'',
				videos: ['resources/videos/cérémonie2018.mp4'],
			},
		],
	},
	{
		id:5,
		title: 'Compétitions',
		date:'',
		description: 'Nos étudiants s\'engagent dans des compétions organisés tout au long de la formation MQL, les mqlistes ne s\'arrêtent pas à la participation, mais cherchent les premiers prix' ,
		content: [
			{
				type:'video',
				title:'',
				description:'La compétion INJAZ ALMaghrib est une de ces compétitions, l\'équipe MQL, avec son projet RedHope (une plateforme pour but  d\'encourager le don du sang), a réussi à remporter le premier prix régional et le prix d\'innovation offert par BOEING sur l\'echelle nationale',
				videos: ['resources/videos/injaz2018.mp4'],
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
	{
		id:7,
		title:'Soutenance',
		date:'Juillet',
		description:'Les étudiants du master qualité logiciel après avoir acquis une bonne conaissance métier et des bonnes compétences ainsi que des connaissances sur le monde de l\'entreprise, effectuent un stage pré-embauche dans une multinationale, ce projet est soutenu devant un jury composé généralement du corps professoral du master ',
		content: [
			{
				type:'image-show',
				title:'Galerie',
				description:'',
				images: [
					'resources/pictures/Event/Soutenance-1.jpg',
					'resources/pictures/Event/Soutenance-2.jpg',
					'resources/pictures/Event/Soutenance-3.jpg',
					'resources/pictures/Event/Soutenance-4.jpg',
					'resources/pictures/Event/Soutenance-5.jpg',
					'resources/pictures/Event/Soutenance-6.jpg',
					'resources/pictures/Event/Soutenance-7.jpg',
					'resources/pictures/Event/Soutenance-8.jpg',
					'resources/pictures/Event/Soutenance-9.jpg',
					'resources/pictures/Event/Soutenance-10.jpg',
					'resources/pictures/Event/Soutenance-11.jpg',
					'resources/pictures/Event/Soutenance-12.jpg',
				],
			},
		],
	},

];


