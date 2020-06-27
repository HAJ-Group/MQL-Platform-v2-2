/* Global data source table for HomeComponent */
let dbHomestats1 = [
    {
        type : 'bar',
        labels : ['2009','2011','2012','2013','2014','2015','2016','2017'],
        dataSet : [
            {
                label:'Nombre d\'étudiants',
                data:[20,39,26,32,40,30,36,34],
            },
            {
                label:'Insertion en stage',
                data:[5,15,10,15,23,30,33,33],
                backgroundColor:'rgb(216, 49, 57)',
            },
            {
                label:'Insertion Définitive',
                data:[4,13,9,12,22,27,32,31],
                backgroundColor:'rgb(53, 69, 108)',
            }
        ],
        options : {
            title: {
                display: true,
                text: 'Insertion en stage et définitive par rapport au nombre des étudiatns',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    },
    {
        type : 'bar',
        labels : ['2009','2011','2012','2013','2014','2015','2016','2017'],
        dataSet : [
            {
                label:'Pourcentage d\'insertion en stage des étudiants',
                data:[25,38,38,46,57,100,91,97],
                backgroundColor:'rgb(216, 49, 57)',
            },
            {
                label:'Pourcentage d\'insertion définitive des étudiants',
                data:[20,33,34,37,55,90,89,92],
                backgroundColor:'rgb(53, 69, 108)',
            }
        ],
        options : {
            title: {
                display: true,
                text: 'Insertion définitive par rapport à l\'insertion en stage et le nombre des étudiatns',
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            maintainAspectRatio: false,
        }
    },
    {
        type : 'bar',
        labels : ['CAPGEMINI','CGI','CEGEDIM','UMANIS','ATOS','S2M','SGATS','ACCENTURE','SQLi','HPS','LNet Communication','Logic Group','Sopra Steria','BDSI Maroc','FEDASO'],
        dataSet :
            [
                {
                    label: 'Nombre d\'étudiants/Société',
                    data:[71,44,7,7,6,3,1,1,1,1,1,1,1,1,1],
                    backgroundColor:'rgb(53, 69, 108)',
                    borderWidth: 1
                }
            ],
        options :
            {
                title: {
                    display: true,
                    text: 'Insertion Professionnelle avec nos partenaires entre 2015 et 2019',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                maintainAspectRatio: false,
            }
    },
    {
        type:'pie',
        labels:['Contrat CDI','-'],
        dataSet :[
            {
                data: [147,13],
                backgroundColor:['rgb(53, 69, 108)','rgb(216, 49, 57'],
                borderWidth: 1,
            }
        ],
        options : {
            title: {
                display: true,
                text : 'Pourcentage des contrats CDI sur un total de 160 étudiants (2009-2017)',
            },
            maintainAspectRatio: false,
        }
    },
];

let dbHomeImages = [
    'resources/pictures/Home/presentationimage.png',
    'resources/pictures/App/mqlfam.jpg',
];

let dbStudents = [
    {
        name:'M1',
        promotion: 'Promotion 2019-2021',
        data: [
                {
                    id: 1,
                    firstName: 'Ayoub',
                    lastName: 'ACHDA',
                },
                {
                    id: 2,
                    firstName: 'Jaouad',
                    lastName: 'AIT ASSOU',
                },
                {
                    id: 3,
                    firstName: 'Hamza',
                    lastName: 'AOURASS',
                },
                {
                    id: 4,
                    firstName: 'Ilyass',
                    lastName: 'AYACH',
                },
                {
                    id: 5,
                    firstName: 'Oumaima',
                    lastName: 'BENCHENNOUF',
                },
                {
                    id: 6,
                    firstName: 'Ismail',
                    lastName: 'BENHALLAM',
                },
                {
                    id: 7,
                    firstName: 'Yahya',
                    lastName: 'BERBECHE',
                },
                {
                    id: 8,
                    firstName: 'Ibtissam',
                    lastName: 'BOURKHA',
                },{
                    id: 9,
                    firstName: 'Noha',
                    lastName: 'BOUSSOUF',
                },
                {
                    id: 10,
                    firstName: 'Mohammed',
                    lastName: 'CHAHBOUN',
                },
                {
                    id: 11,
                    firstName: 'Moustafa',
                    lastName: 'CHARIF',
                },{
                    id: 12,
                    firstName: 'Hafsa',
                    lastName: 'CHINI',
                },
                {
                    id: 13,
                    firstName: 'Ilham',
                    lastName: 'CHOUKRI',
                },
                {
                    id: 14,
                    firstName: 'Douae',
                    lastName: 'CHTIOUI',
                },{
                    id: 15,
                    firstName: 'Oumaima',
                    lastName: 'EL FEZAZI',
                },
                {
                    id: 16,
                    firstName: 'Houssam',
                    lastName: 'EL HAMZI',
                },
                {
                    id: 17,
                    firstName: 'Ahmed',
                    lastName: 'EL MOUTAOUAKKEL',
                },{
                    id: 18,
                    firstName: 'Hamza',
                    lastName: 'ISMAILI ALAOUI',
                },
                {
                    id: 19,
                    firstName: 'Alaeddine',
                    lastName: 'ENNOUINOU',
                },
                {
                    id: 20,
                    firstName: 'Rhita',
                    lastName: 'ES-SAFI',
                },{
                    id: 21,
                    firstName: 'Hamid',
                    lastName: 'FADILI',
                },
                {
                    id: 22,
                    firstName: 'Mohamed',
                    lastName: 'FAZAZI',
                },
                {
                    id: 23,
                    firstName: 'Chaimae',
                    lastName: 'HACHDI',
                },{
                    id: 24,
                    firstName: 'Maroua',
                    lastName: 'JALIL',
                },
                {
                    id: 25,
                    firstName: 'Mohamed Reda',
                    lastName: 'LAAMIME',
                },
                {
                    id: 26,
                    firstName: 'Soufiane',
                    lastName: 'MAKHLOUF',
                },{
                    id: 27,
                    firstName: 'Said',
                    lastName: 'MARHRANI',
                },
                {
                    id: 28,
                    firstName: 'Hamza',
                    lastName: 'MEKAOUI',
                },
                {
                    id: 29,
                    firstName: 'Youssra',
                    lastName: 'MEKKAOUI',
                },
                {
                    id: 30,
                    firstName: 'Khadija',
                    lastName: 'OUCHRIH',
                },
                {
                    id: 31,
                    firstName: 'Abdessamade',
                    lastName: 'OUKIRCHE',
                },
                {
                    id: 32,
                    firstName: 'Imane',
                    lastName: 'SLASSI',
                },
        ]

    },
    {
        name: 'M2',
        promotion: 'Promotion 2018-2020',
        data: [
                {
                    id: 1,
                    firstName: 'Marouane',
                    lastName: 'MISDAK',
                    internship: 'Capgemeni casa'
                },
                {
                    id: 2,
                    firstName: 'Hatim',
                    lastName: 'ESSADEQ',
                    internship: 'Capgemeni Casa'
                },
                {
                    id: 3,
                    firstName: 'Nesrin',
                    lastName: 'LAKHAL',
                    internship: 'Capgemeni Rabat'
                },
                {
                    id: 4,
                    firstName: 'Ismail',
                    lastName: 'AIT ALI',
                    internship: 'Capgemeni Rabat'
                },
                {
                    id: 6,
                    firstName: 'Omar',
                    lastName: 'ISMAILI ALAOUI',
                    internship: 'Capgemeni Rabat'
                },
                {
                    id: 7,
                    firstName: 'Mohamed',
                    lastName: 'EL YAZIDI',
                    internship: 'Capgemeni'
                },
                {
                    id: 8,
                    firstName: 'Omar',
                    lastName: 'MOUSSAMIH',
                    internship: 'Umanis'
                },
                {
                    id: 9,
                    firstName: 'Hafsae',
                    lastName: 'KHADDAM ALLAH',
                    internship: 'Umanis'
                },
                {
                    id: 10,
                    firstName: 'Meryem',
                    lastName: 'RAHMOUNI',
                    internship: 'ATOS'
                },
                {
                    id: 11,
                    firstName: 'Chaimae',
                    lastName: 'ZARHOUNI',
                    internship: 'ATOS'
                },
                {
                    id: 12,
                    firstName: 'Mouna',
                    lastName: 'BAKHOR',
                    internship: 'ATOS'
                },
                {
                    id: 13,
                    firstName: 'Khalid',
                    lastName: 'CHAHBOUNE',
                    internship: 'CGI Fès'
                },
                {
                    id: 14,
                    firstName: 'Hicham',
                    lastName: 'HAIDAR',
                    internship: 'CGI Fès'
                },
                {
                    id: 15,
                    firstName: 'Fatima',
                    lastName: 'ZERKOUN',
                    internship: 'CGI Fès'
                },
                {
                    id: 16,
                    firstName: 'Salma',
                    lastName: 'BOUARAIS',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 17,
                    firstName: 'Soufiane',
                    lastName: 'DARBOUZ',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 18,
                    firstName: 'Redoune',
                    lastName: 'BAGHDAD',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 19,
                    firstName: 'Mouad',
                    lastName: 'YOUSSER',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 20,
                    firstName: 'Mohamed',
                    lastName: 'DOUHI',
                    internship: 'SQLi (Oujda)'
                },
                {
                    id: 21,
                    firstName: 'Mohamed amine',
                    lastName: 'Azarou',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 22,
                    firstName: 'Ayyoube',
                    lastName: 'CHABIH',
                    internship: 'SQLi (Rabat)'
                },
                {
                    id: 23,
                    firstName: 'Hala',
                    lastName: 'MESTADI',
                    internship: 'SQLi'
                },
                {
                    id: 24,
                    firstName: 'Hajar',
                    lastName: 'ZEGHBA',
                    internship: 'CEGEDIM'
                },
                {
                    id: 25,
                    firstName: 'Nour-imae',
                    lastName: 'ZIANI',
                    internship: 'CEGEDIM'
                },

                {
                    id: 26,
                    firstName: 'Wafae',
                    lastName: 'NABET',
                    internship: 'CEGEDIM'
                },
                {
                    id: 27,
                    firstName: 'Daoud',
                    lastName: 'WIRZGANE',
                    internship: 'intelcia'
                },
                {
                    id: 28,
                    firstName: '',
                    lastName: 'Soussi',
                    internship: 'intelcia'
                },
                {
                    id: 29,
                    firstName: 'Hicham',
                    lastName: 'JAMAI',
                    internship: 'intelcia'
                },
                {
                    id: 30,
                    firstName: 'Hind',
                    lastName: 'AALLOUCH',
                    internship: 'Smile'
                },
                {
                    id: 31,
                    firstName: 'Fatim zahra',
                    lastName: 'DRIOUICH',
                    internship: 'DXC'
                },
                {
                    id: 32,
                    firstName: 'Abdrahim',
                    lastName: 'MJIDA',
                    internship: 'Colas digital solutions'
                }
        ]
    }
];

let dbProfessors = [
    {
        id: 1,
        firstName: 'Ahmed',
        lastName: 'ZINEDINE',
        photo: '',
        course: 'Technologie XML',
        courseImage: 'resources/pictures/Home/xml.png'
    },
    {
        id: 2,
        firstName: 'Omar',
        lastName: 'BEKKALI',
        photo: '',
        course: 'Bases de données ORACLE',
        courseImage: 'resources/pictures/Home/oracle.png'
    },
    {
        id: 3,
        firstName: 'Mohamed',
        lastName: 'LAMRINI',
        photo: '',
        course: 'Gestion du projets',
        courseImage: 'resources/pictures/Home/gestion-projet.png'
    },
    {
        id: 4,
        firstName: 'Ahmed',
        lastName: 'AZOUGH',
        photo: '',
        course: 'Génie logiciel et UML',
        courseImage: 'resources/pictures/Home/uml.png'
    }
]
