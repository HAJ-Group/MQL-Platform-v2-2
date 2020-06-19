/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------LOADING HEADER CONTENT-------------------------------------------------*/
function getHeaderNavs() {
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let navElement = buildDIV();
    // DYNAMIC NAVS
    for(let nav of navs) {
        navElement.appendChild(buildLINK('#' + nav.name, nav.content, cls('left', [
            {name:'onclick', value:'route(\'' + nav.name + '\')'},
            {name:'onmouseover', value:'changePicture(this.name)'},
            {name:'onmouseleave', value:'changePicture(\'' + current_component + '\')'},
            {name:'name', value:nav.name},
        ])));
    }
    // ABOUT NAV
    navElement.appendChild(buildLINK('#footer', [
        buildIMG('resources/pictures/App/Header/about.png', 'about', cls('def-img'))
    ], cls('right')));
    return navElement;
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------LOADING FOOTER CONTENT-------------------------------------------------*/
function getFooterPartners(max = 4) {
    let service = new PartnerComponentService();
    service.load(dbPartner);
    let counter = 0;
    let partnersDiv = buildDIV(null, cls('partenaire'));
    for(let partner of service.db) {
        if(counter++ < max) {
            partnersDiv.appendChild(buildSPAN([
                buildIMG(partner.image, '', wrapIC('partner-' + partner.id, 'img-partenaire', [
                    {name:'onclick', value:'showPartner(\'partner-' + partner.id + '\')'},
                ]))
            ]));
        }
    }
    return partnersDiv;
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------SEARCH BAR CONTENT---------------------------------------------------*/
function getSearchBarContent() {
    return buildDIV([
        buildIMG('resources/pictures/App/icons/search.png', 'search Logo', cls('search-logo')),
        buildElement('input', null, wrapIC('key', 'search-input', [
            {name:'onkeyup', value:'view.filterKey()'},
            {name:'placeholder', value:'Search...'},
            {name:'type', value:'text'},
        ])),
        buildSPAN(null, cls('error-message'))
    ], cls('search-block'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------CONTACT FORM CONTENT---------------------------------------------------*/
function getContactFormContent() {
    return buildDIV([
        buildSPAN('&times;', cls('close-modal-contact', [
            {name:'onclick', value:'$(\'#form-contact-id\').style.display=\'none\''},
            {name:'title', value:'Close Modal'},
        ])),
        buildElement('form', [
            buildDIV([
                buildElement('h3', 'Contactez-nous directement', wrap([{name:'style', value:'text-align: center'}])),
                buildHR(),
                buildElement('label', buildElement('b', 'Prénom', wrap([{name:'for', value:'first-name'}]))),
                buildElement('input', null, wrapICN('first-name', 'zone-text-contact-news', 'first-name', [
                    {name:'placeholder', value:'Prénom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', buildElement('b', 'Nom', wrap([{name:'for', value:'last-name'}]))),
                buildElement('input', null, wrapICN('last-name', 'zone-text-contact-news', 'last-name', [
                    {name:'placeholder', value:'Nom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', buildElement('b', 'Email', wrap([{name:'for', value:'email'}]))),
                buildElement('input', null, wrapICN('email', 'zone-text-contact-news', 'email', [
                    {name:'placeholder', value:'Email...'},
                    {name:'type', value:'email'},
                ])),
                buildElement('label', buildElement('b', 'Sujet', wrap([{name:'for', value:'subject'}]))),
                buildElement('textarea', null, wrapICN('subject', 'zone-text-contact-news', 'subject', [
                    {name:'placeholder', value:'Ecrire ici...'},
                    {name:'type', value:'email'},
                    {name:'style', value:'height:200px'},
                ])),
                buildDIV([
                    buildElement('button', 'Annuler', cls(['button-contact-2', 'cancel-button'], [
                        [{name:'onclick', value:'$(\'#form-contact-id\').style.display=\'none\''}]
                    ])),
                    buildElement('button', 'Envoyer', cls(['button-contact-2', 'submit-button'])),
                ], cls('form-footer')),
            ], cls('contact-container'))
        ], cls('modal-contact-content')),
    ], wrapIC('form-contact-id', 'modal-style'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------NEWS LETTER CONTENT---------------------------------------------------*/
function getNewsLetterContent() {
    return buildDIV([
        buildElement('form', [
            buildSPAN('&times;', cls('close-part', [
                {name:'onclick', value:'$(\'#news-modal-id\').style.display = \'none\''}
            ])),
            buildDIV([
                buildSPAN('NewsLetter')
            ], cls('modal-header')),
            buildDIV([
                buildElement('p', 'Inscrivez-vous pour recevoir les dernières actualités.'),
                buildElement('label', 'Nom', wrap([
                    {name:'for', value:'full-name'},
                    {name:'style', value:'font-size: 18px;'},
                ])),
                buildElement('input', null, wrapICN('full-name', 'zone-text-contact-news', 'full-name', [
                    {name:'placeholder', value:'Nom...'},
                    {name:'type', value:'text'},
                ])),
                buildElement('label', 'Email', wrap([
                    {name:'for', value:'email'},
                    {name:'style', value:'font-size: 18px;'},
                ])),
                buildElement('input', null, wrapICN('email', 'zone-text-contact-news', 'email', [
                    {name:'placeholder', value:'Email...'},
                    {name:'type', value:'email'},
                ])),
            ], cls('modal-body')),
            buildElement('button', 'S\'inscrire', cls('subscribe-button')),
        ], cls('news-modal-content'))
    ], wrapIC('news-modal-id', 'news-modal'));
}

function getContainerContent(containerClass = 'container') {
    return buildDIV([
        buildDIV(
            buildDIV('Navigation', cls(['menuitem', 'wrap-blue']))
            , wrapIC('navigation', 'left-menu')),
        buildDIV(null, wrapIC('main', 'sub-content')),
        buildDIV(null, wrapIC('switcher', 'page_numbers'))
    ], cls(containerClass));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------LOADING COMPONENTS CONTENT-------------------------------------------------*/
function getHomeContent() {
    return buildSPAN('Home Works');
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getNewsContent() {
    return buildDIV([
        buildDIV(null, id('autoBox')),
        buildDIV(null, id('search')),
        getContainerContent(),
    ]);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getEventContent() {
    return buildDIV([
        buildDIV([
            buildIMG('resources/pictures/Event/timeline.png', '', cls('timeline-icon')),
            buildElement('ol', null, wrapCI('timeline-list', 'timeline'))
        ], cls('timeline')),
        buildDIV(null, id('search')),
        getContainerContent(),
    ]);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getActivityContent() {
    let textDescription = 'La formation MQL se déroule en deux ans, répartit en quatres semestres,\n' +
        'dont les trois premiers se déroulent généralement en six de modules reliant entre la théorie et la pratique.\n' +
        'Le dernier semestre est la dernière étape de cette formation, c\'est un projet de fin d\'études effectué au sein d\'une multinationale parmis nos partenaires,\n' +
        'ce qui offre aux étudiants un terrain concret de mise en situation pour son évolution vers un savoir-être et un savoir-faire d’ingénieur d\'études et developpement,\n' +
        'ainsi que valider les acquis sur des problématiques  regroupant les différents centres d’intérêts de la formation.\n' +
        'La formation implique aussi :';
    return buildDIV([
        buildDIV([
            buildDIV([
                buildDIV('Déroulement de cours', cls('title')),
                buildDIV([
                    buildIMG('resources/pictures/Activity/deroulement-cours2.png', '', cls('el-center')),
                    buildElement('p', [
                        textDescription,
                        buildElement('ul', [
                            buildElement('li', 'Learning by doing (Apprentissage par la pratique) : Les étudiants sont amenés à réaliser un ensemble de projets ( JAVA , JAVAEE , WEB , Design Patterns ...)'),
                            buildElement('li', 'Learning by teaching: Les étudiants sont amenés à présenter ( expliquer ) un ensemble de technologies, sujets durant les deux années de formation'),
                        ])
                    ])
                ], cls('details'))
            ], cls('activities-image')),
            buildDIV([
                buildDIV('Semesters', cls('title')),
                buildDIV([
                    buildDIV(null, id('zone')),
                ], cls('details'))
            ], cls('semesters')),
            buildDIV([
                buildDIV('Modèle de Formation', cls('title')),
                buildDIV([
                    buildElement('video', [
                        buildElement('source', null, wrap([{name:'src', value:'resources/videos/formation.mp4'}, {name:'type', value:'video/mp4'}]))
                    ], cls('formation-video', [{name:'autoplay', value:''}, {name:'muted', value:''}, {name:'loop', value:''}]))
                ], cls('details'))
            ], cls('mf'))
        ], cls('container')),
        buildBR(),
    ]);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getPartnerContent() {
    return buildDIV([
        buildDIV(null, cls('sub-content')),
        buildDIV([
            buildDIV([
                buildIMG('resources/pictures/Partner/menu-bg.jpg', '', cls('menu-img')),
                buildElement('h2', 'Companies'),
                buildDIV(null, cls('sep'))
            ], wrapIC('partnersMenu', 'partners-menu')),
            buildDIV(null, wrapIC('partnersContainer', 'partners-container'))
        ], cls('container'))
    ]);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getLaureateContent() {
    return buildDIV([
        buildHR(),
        buildDIV([
            buildIMG('resources/pictures/App/icons/reload.png', '', cls('top-img', [{name:'onclick', value:'view.random()'}]))
        ], cls('titles-laureates')),
        buildDIV(null, wrapIC('list-recommendation', 'list-recommendations')),
        buildBR(),
        buildDIV([
            buildElement('h3', 'Promotions')
        ], cls('titles-laureates')),
        buildDIV(null, cls('search')),
        getContainerContent('promotions-style'),
    ], cls('container'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
function getAreaContent() {
    return buildDIV([
        buildDIV([
            buildDIV([
                buildIMG('resources/pictures/Area/profile.gif', ''),
                buildElement('h1', null, cls('user')),
                buildElement('button', 'Quitter', cls('logout-button', [{name:'onclick', value:'view.logout()'}]))
            ], cls('profile'))
        ], cls('left-menu')),
        buildDIV([
            buildDIV([
                buildIMG('resources/pictures/Area/profile.gif', ''),
                buildDIV([
                    buildElement('h2', null, wrapIC('phone-user', 'user-block')),
                    buildElement('button', 'Quitter', cls('logout-button',  [{name:'onclick', value:'view.logout()'}])),
                ])
            ], cls('phone-profile')),
            buildDIV([
                buildElement('h1', [
                    buildIMG('resources/pictures/Area/manage.png', ''),
                    'Zone de Gestion'
                ], cls('manage-title')),
                buildDIV([
                    buildDIV([
                        buildIMG('resources/pictures/Area/news.jpg', '', [{name:'onclick', value:'route(\'News\')'}])
                    ], cls('manage-card')),
                    buildDIV([
                        buildIMG('resources/pictures/Area/event.jpg', '', [{name:'onclick', value:'route(\'Event\')'}])
                    ], cls('manage-card')),
                ], cls('manage-cards')),
                buildDIV([
                    buildDIV([
                        buildIMG('resources/pictures/Area/laureate.jpg', '', [{name:'onclick', value:'route(\'Laureate\')'}])
                    ], cls('manage-card')),
                    buildDIV([
                        buildIMG('resources/pictures/Area/partner.jpg', '', [{name:'onclick', value:'route(\'Partner\')'}])
                    ], cls('manage-card')),
                ], cls('manage-cards')),
            ], cls('manage-block'))
        ], cls('sub-content'))
    ], wrapIC('restricted', 'container'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
