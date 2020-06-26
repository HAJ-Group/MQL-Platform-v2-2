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
            }
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
            }
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
                }
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
        promotion: 'Promotion 2020-2021',
        data: [
                {
                    id: 1,
                    firstName: 'jaouad',
                    lastName: 'ait assou',
                },
                {
                    id: 2,
                    firstName: 'ale',
                    lastName: 'ennouinou',
                },
                {
                    id: 3,
                    firstName: 'hamza',
                    lastName: 'ismaili alaoui',
                },
                {
                    id: 4,
                    firstName: 'bla bla',
                    lastName: 'bla bla bla',
                },
                {
                    id: 5,
                    firstName: 'jaouad',
                    lastName: 'ait assou',
                },
                {
                    id: 6,
                    firstName: 'alae',
                    lastName: 'ennouinou',
                },
                {
                    id: 7,
                    firstName: 'hamza',
                    lastName: 'ismaili alaoui',
                },
                {
                    id: 8,
                    firstName: 'bla bla',
                    lastName: 'bla bla bla',
                },
        ]

    },
    {
        name: 'M2',
        promotion: 'Promotion 2019-2020',
        data: [
                {
                    id: 1,
                    firstName: 'm21',
                    lastName: 'm21 m21',
                },
                {
                    id: 2,
                    firstName: 'm22',
                    lastName: 'm22 m22',
                },
                {
                    id: 3,
                    firstName: 'm23',
                    lastName: 'm23 m23',
                },
                {
                    id: 4,
                    firstName: 'm24',
                    lastName: 'm24 m24',
                },
        ]

    }
];
