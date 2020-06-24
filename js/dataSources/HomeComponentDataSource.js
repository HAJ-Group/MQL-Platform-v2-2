/* Global data source table for HomeComponent */

let dbHomestats1 = [
    {
        type : 'bar',
        labels : ['CAPGEMINI','CGI','CEGEDIM','UMANIS','ATOS','S2M','SGATS','ACCENTURE','SQLi','HPS','LNet Communication','Logic Group','Sopra Steria','BDSI Maroc','FEDASO'],
        dataSet :
            [
                {
                    label: 'Nombre/Société',
                    data:[71,44,7,7,6,3,1,1,1,1,1,1,1,1,1],
                    backgroundColor:'rgb(53, 69, 108)',
                    borderWidth: 1
                }
            ],
        options :
            {
            title: {
                display: true,
                text: 'Insertion Professionnelle entre 2015 et 2019',
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
        type:'pie',
        labels:['Contrat CDI',''],
        dataSet :[
            {
                label: 'Nombre/Société',
                data: [147,13],
                backgroundColor:'rgb(53, 69, 108)',
                borderWidth: 1,
            }
        ],
        options : {
            title: {
                display: true,
                text : 'Pourcentage des contrats CDI',
            },
        }
    },
];

let dbHomeImages = [
    'resources/pictures/Home/presentationimage.png',
    'resources/pictures/App/mqlfam.jpg',
];
