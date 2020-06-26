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

var dbStudents = [
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
                    firstName: 'Mouad',
                    lastName: 'YOUSSER',
                },
                {
                    id: 2,
                    firstName: 'Mohamed',
                    lastName: 'DOUHI',
                },
                {
                    id: 3,
                    firstName: 'Mohamed amine',
                    lastName: 'Azarou',
                },
                {
                    id: 4,
                    firstName: 'Ayyoube',
                    lastName: 'CHABIH',
                },
            {
                id: 5,
                firstName: 'Marouane',
                lastName: 'MISDAK',
            },{
                id: 6,
                firstName: 'Fatima',
                lastName: 'ZERKOUN',
            },{
                id: 7,
                firstName: 'Nesrin',
                lastName: 'LAKHAL',
            },{
                id: 8,
                firstName: 'Ismail',
                lastName: 'AIT ALI',
            },{
                id: 9,
                firstName: 'Wafae',
                lastName: 'NABET',
            },{
                id: 10,
                firstName: 'Hatim',
                lastName: 'ESSADEQ',
            },{
                id: 11,
                firstName: 'Daoud',
                lastName: 'WIRZGANE',
            },{
                id: 12,
                firstName: 'Omar',
                lastName: 'ISMAILI ALAOUI',
            },{
                id: 13,
                firstName: 'Salma',
                lastName: 'BOUARAIS',
            },
            {
                id: 14,
                firstName: 'Soufiane',
                lastName: 'DARBOUZ',
            },
            {
                id: 15,
                firstName: 'Khalid',
                lastName: 'CHAHBOUNE',
            },
            {
                id: 16,
                firstName: 'Omar',
                lastName: 'MOUSSAMIH',
            },
            {
                id: 17,
                firstName: 'Hicham',
                lastName: 'HAIDAR',
            },
            {
                id: 18,
                firstName: 'Hafsae',
                lastName: 'KHADDAM ALLAH',
            },
            {
                id: 19,
                firstName: 'Hind',
                lastName: 'AALLOUCH',
            },
            {
                id: 20,
                firstName: 'Nour-imae',
                lastName: 'ZIANI',
            },
            {
                id: 21,
                firstName: 'Meryem',
                lastName: 'RAHMOUNI',
            },
            {
                id: 22,
                firstName: 'Chaimae',
                lastName: 'ZARHOUNI',
            },
            {
                id: 23,
                firstName: 'Mouna',
                lastName: 'BAKHOR',
            },
            {
                id: 24,
                firstName: 'Redoune',
                lastName: 'BAGHDAD',
            },
            {
                id: 25,
                firstName: 'Fatim zahra',
                lastName: 'DRIOUICH',
            },
            {
                id: 26,
                firstName: 'Hala',
                lastName: 'MESTADI',
            },
            {
                id: 27,
                firstName: 'Abdrahim',
                lastName: 'MJIDA',
            },
            {
                id: 28,
                firstName: '',
                lastName: 'Soussi',
            },
            {
                id: 29,
                firstName: 'Mohamed',
                lastName: 'EL YAZIDI',
            },
            {
                id: 30,
                firstName: 'Hajar',
                lastName: 'ZEGHBA',
            },
            {
                id: 31,
                firstName: 'Hicham',
                lastName: 'JAMAI',
            }
        ]

    }
];
