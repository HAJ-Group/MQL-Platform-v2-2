/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------LOADING HEADER CONTENT-------------------------------------------------*/
function getHeaderNavs() {
    /* HEADER --------------------------------------------------------------------------------------------------------*/
    let navElement = buildDIV();
    // DYNAMIC NAVS
    for(let nav of SPAnavs) {
        navElement.appendChild(
            buildLINK('javascript:void(0)', nav.content, cls(['left'], [{name:'name', value:nav.name}]))
        );
    }
    // ABOUT NAV
    navElement.appendChild(buildLINK('javascript:void(0)', [
        buildIMG('resources/pictures/App/Header/about.png', 'about', cls('def-img'))
    ], wrapCOthers('right', [{name: 'onclick', value: 'views.spa.scrollToDown();'}])));

    return navElement;
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------LOADING FOOTER CONTENT-------------------------------------------------*/
function getFooterPartners(max = 4) {
    let service = new PartnerComponentService();
    service.load(dbPartner);
    if(max > service.size()) max = service.size();
    let counter = 0;
    let partnersDiv = buildDIV(null, cls('partenaire'));
    for(let partner of service.db) {
        if(counter++ < max) {
            partnersDiv.appendChild(buildSPAN([
                buildIMG(partner.image, '', wrapIC('partner-' + partner.id, 'img-partenaire', [
                    {name:'onclick', value:'views.spa.showPartner(\'partner-' + partner.id + '\')'},
                ]))
            ]));
        }
    }
    return partnersDiv;
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
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getHomeFormContent() {
    return buildDIV(null, id('HomeForm'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getNewsFormContent() {
    return buildDIV([
        buildSPAN('&times;', cls('close', [{name:'onclick', value:'views.spa.closeFORM(\'NewsForm\')'}])),
        buildDIV([
            buildIMG('resources/pictures/News/News-logo.png', ''),
            buildElement('p', 'NEWS COMPONENT',  cls('form-title')),
            buildElement('input', null, wrapIC('newsTitle', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'News Title...'},
            ])),
            buildElement('textarea', null, wrapIC('newsDescription', 'form-text', [
                {name:'placeholder', value:'News Description...'},
                {name:'rows', value:'5'},
            ])),
            buildElement('p', 'Valider', wrapIC('newsSubmit', 'form-submit', wrap([
                {name:'onclick', value:'views.news.submitData()'},
            ])))
        ], cls('form-content'))
    ], wrapIC('NewsForm', 'modal'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getEventFormContent() {
    return buildDIV([
        buildSPAN('&times;', cls('close', [{name:'onclick', value:'views.spa.closeFORM(\'EventForm\')'}])),
        buildDIV([
            buildIMG('resources/pictures/Event/Event-logo.png', ''),
            buildElement('p', 'EVENT COMPONENT', cls('form-title')),
            buildElement('input', null, wrapIC('eventTitle', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'Event Title...'},
            ])),
            buildElement('textarea', null, wrapIC('eventDescription', 'form-text', [
                {name:'placeholder', value:'Event Description...'},
                {name:'rows', value:'5'},
            ])),
            buildElement('p', 'Valider', wrapIC('eventSubmit', 'form-submit', wrap([
                {name:'onclick', value:'views.event.submitData()'},
            ])))
        ], cls('form-content'))
    ], wrapIC('EventForm', 'modal'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getActivityFormContent() {
    return buildDIV(null, id('ActivityForm'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getPartnerFormContent() {
    return buildDIV([
        buildSPAN('&times;', cls('close', [{name:'onclick', value:'views.spa.closeFORM(\'PartnerForm\')'}])),
        buildDIV([
            buildIMG('resources/pictures/App/icons/partner-icon.png', ''),
            buildElement('p', 'PARTNER COMPONENT', cls('form-title')),
            buildElement('input', null, wrapIC( 'partnerID','form-text', [
                {name:'type', value:'hidden'},
            ])),
            buildElement('input', null, wrapIC('partnerName', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'Partner Name...'},
            ])),
            buildElement('input', null, wrapIC('partnerColor', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'Partner Color...'},
            ])),
            buildElement('input', null, wrapIC('partnerCa', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'Partner Sales...'},
            ])),
            buildElement('textarea', null, wrapIC('partnerDescription', 'form-text', [
                {name:'placeholder', value:'Partner Description...'},
                {name:'rows', value:'5'},
            ])),
            buildElement('input', null, wrapIC('partnerCo', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'MQL Collaborators...'},
            ])),
            buildElement('input', null, wrapIC('partnerWebSite', 'form-text', [
                {name:'type', value:'text'},
                {name:'placeholder', value:'Partner WebSite...'},
            ])),
            buildElement('p', 'Valider', wrapIC('partnerSubmit', 'form-submit', wrap([
                {name:'onclick', value:'views.partner.submitData()'},
            ])))
        ], cls('form-content'))
    ], wrapIC('PartnerForm', 'modal'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getLaureateFormContent() {
    return buildDIV([
        buildDIV([
            buildSPAN('&times;', cls('close', [{name: 'onclick', value: 'views.spa.closeFORM(\'promotion\')'}])),
            buildDIV([
                buildIMG('resources/pictures/Laureate/laureate-logo.png', ''),
                buildElement('p', 'LAUREATE COMPONENT',  cls('form-title')),
                buildElement('input', null, wrapIC('promotionName', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Promotion Name...'},
                ])),
                buildElement('p', 'Valider', wrapIC('promotionSubmit', 'form-submit', wrap([
                    {name: 'onclick', value: 'views.laureate.submitData()'},
                ])))
            ], cls('form-content'))
        ], wrapIC('promotion', 'modal')),
        buildDIV([
            buildSPAN('&times;', cls('close', [{name: 'onclick', value: 'views.spa.closeFORM(\'laureate\')'}])),
            buildDIV([
                buildIMG('resources/pictures/Laureate/laureate-logo.png', ''),
                buildElement('p', 'LAUREATE COMPONENT',  cls('form-title')),
                buildElement('input', null, wrapIC('laureateName', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Name...'},
                ])),
                buildElement('input', null, wrapIC('laureateGender', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Gender M for male, F for female...'},
                ])),
                buildElement('input', null, wrapIC('laureateEmail', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Email...'},
                ])),
                buildElement('input', null, wrapIC('laureateJob', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Job...'},
                ])),
                buildElement('input', null, wrapIC('laureateCity', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate City...'},
                ])),
                buildElement('input', null, wrapIC('laureateStage', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Practical Experience Enterprise...'},
                ])),
                buildElement('input', null, wrapIC('laureateCE', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Laureate Current Work Enterprise...'},
                ])),
                buildElement('input', null, wrapIC('laureateExp', 'form-text', [
                    {name: 'type', value: 'text'},
                    {name: 'placeholder', value: 'Other Experiences: exp1, exp2, ...'},
                ])),
                buildElement('textarea', null, wrapIC('laureateRating', 'form-text', [
                    {name: 'placeholder', value: 'Say something about MQL ? ....'},
                    {name: 'rows', value: '5'},
                ])),
                buildElement('p', 'Valider', wrapIC('laureateSubmit', 'form-submit', wrap([
                    {name: 'onclick', value: 'views.laureate.submitData()'},
                ])))
            ], cls('form-content'))
        ], wrapIC('laureate', 'modal')),
    ], id('LaureateForm'));
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function getAreaFormContent() {
    return buildDIV([
        buildSPAN('X', cls('access-close', [{name:'onclick', value:'views.area.cancel()'}])),
        buildDIV([
            buildElement('h1', 'Administration', cls('access-title')),
            buildSPAN([
               buildIMG('resources/pictures/Area/error.png', '', cls('error-icon')),
               buildSPAN('Error', id('errorMess')),
            ], wrapIC('errorBlock', 'access-error')),
            buildDIV([
                buildElement('input', null, wrapIC('username', 'access-username', [
                    {name:'type', value:'text'},
                    {name:'placeholder', value:'Username...'},
                ])),
                buildElement('input', null, wrapIC('password', 'access-password', [
                    {name:'type', value:'password'},
                    {name:'placeholder', value:'Password...'},
                ])),
                buildElement('button', 'Valider', cls('access-button', [
                    {name:'onclick', value:'views.area.authenticate()'}
                ]))
            ], cls('access-login'))
        ], cls('access-content'))
    ], wrapIC('AreaForm', 'access'));
}
