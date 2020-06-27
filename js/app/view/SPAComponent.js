/*--------------------------------------------------------------------------------------------------------------------*/
let current_page_number = 1;
let phone_menu_toggled = false;
let current_component = 'Home';
/*Default class*/
function SPAComponent(service) {
    this.service = service;
    this.current_component = 'Home';
    this.current_theme = themes[0];
    if(localStorage.getItem('theme') !== null) this.current_theme = localStorage.getItem('theme');
}
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.initComponent = function(component) {
    let firstRoute = false;
    if(component === '') {
        firstRoute = true;
        if(sessionStorage.getItem('component') !== null) {
            component = sessionStorage.getItem('component');
        } else {
            component = 'Home';
        }
    } else {
        sessionStorage.setItem('component', component);
    }
    this.current_component = component;
    // Primary initialization
    let current_element = $('+' + this.current_component)[0];
    if(this.current_component === 'Home') $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/homeactive.png');
    else $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/home.png');
    for(let c of this.service.db) {
        let element = $('+' + c.name)[0];
        element.classList.remove('active');
        if(screen.width>700)        element.setAttribute('onclick', 'views.spa.route(this.name); views.spa.downFunction(350);');
        else         element.setAttribute('onclick', 'views.spa.route(this.name)');
        element.setAttribute('onmouseover', 'views.spa.changePicture(\'' + this.current_theme + c.name + '\')');
        element.setAttribute('onmouseleave', 'views.spa.changePicture(\'' + this.current_theme + this.current_component + '\')');
    }
    current_element.classList.add('active');
    current_element.removeAttribute('onclick');
    current_element.removeAttribute('onmouseover');
    this.changePicture(this.current_theme + this.current_component);
    this.scrollToTop();
    if(window.innerWidth <= 700 && !firstRoute) this.showMenu();
    let searchInput = $('#key');
    searchInput.value = '';
};
SPAComponent.prototype.loadHeaderNavs = function() {
    let headerElement = $('.topnav')[0];
    headerElement.innerHTML = '';
    headerElement.appendChild(getHeaderNavs());
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.loadFooterPartners = function() {
    let footerElement = $('.partenaire')[0];
    footerElement.innerHTML = '';
    footerElement.appendChild(getFooterPartners());
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.loadForms = function() {
    for(let c of this.service.db) {
        let element = $('#' + c.name + 'Component');
        element.appendChild(window['get' + c.name + 'FormContent']());
    }
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.loadComponents = function() {
    for(let i = (this.service.db.length - 1); i >= 0; i--) {
        window[this.service.db[i].name + 'Main']();
    }
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.load = function() {
    // Loading Header Content
    this.loadHeaderNavs();
    // Loading Footer Content
    this.loadFooterPartners();
    // Loading Components Form Contents
    this.loadForms();
    // Loading Components Content
    this.loadComponents();
    //Loading Theme
    this.loadThemes();
    // Start
    $('#loader').style.display = 'none';
    $('.content')[0].style.display = 'block';
};
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load current target component
 */
SPAComponent.prototype.switchComponent = function() {
    for(let c of this.service.db) {
        $('#' + c.name + 'UpperArea').style.display = 'none';
        $('#' + c.name + 'Component').style.display = 'none';
        $('#search').style.display = 'none';
    }
    $('#' + this.current_component + 'UpperArea').style.display = 'block';
    $('#' + this.current_component + 'Component').style.display = 'block';
    if(this.current_component === 'News' || this.current_component === 'Event' || this.current_component === 'Laureate') {
        $('#search').style.display = 'block';
    }
};
/*--------------------------------------------------------------------------------------------------------------------*/
/* Action Functions */
/**
 * Change title image
 * @param element
 */
SPAComponent.prototype.changePicture = function(element) {
    let image = $('#title-image');
    let source = element + '.jpg';
    image.setAttribute('src', 'resources/pictures/App/Header/' + source);
    image.setAttribute('class', 'def-img');
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Showing/hiding phone version menu
 */
SPAComponent.prototype.showMenu = function() {
    function toggle(media) {
        let menu = $('.topnav')[0];
        if (media.matches) { // If media query matches
            if(phone_menu_toggled) menu.style.display = 'block';
            if(!phone_menu_toggled) menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
    phone_menu_toggled = !phone_menu_toggled;
    let media = window.matchMedia("(max-width: 600px)");
    toggle(media);
    media.addListener(toggle);
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.showEmptyErrorResult = function() {
    $('#' + this.current_component + 'Main').innerHTML = '<div>' +
        '<img alt="" class="mini-logo" src="resources/pictures/Area/error.png">' +
        '</div>';
    $('#' + this.current_component + 'Navigation').innerHTML = null;
    $('#' + this.current_component + 'switcher').innerHTML = null;
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Building title configuration (icon + show and hide button)
 * @param source
 * @param editable
 * @param component
 * @param id
 */
SPAComponent.prototype.addTitleIcon = function(source, editable=false, component, id = null) {
    let titles = $('.' + component + '-title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '';
        title.appendChild(buildDIV([
            buildIMG(source, 'title', cls('title-logo')),
            text
        ], cls('title-content')));
        title.appendChild(buildIMG('resources/pictures/App/icons/minus-icon.png', '', wrapICN('', 'sh-icon', component + '-sh-icon', [
            {name:'onclick', value:'views.spa.hide('+i+', \'' + component + '-details\')'}
        ])));
        title.appendChild(buildSPAN(null, cls(['sh-sep', component + '-sh-sep'])));
        if(editable && sessionStorage.getItem('ACCESS') !== null) {
            let index = i;
            if(id !== null) {
                index = getRowIndex(id, views[component].service.db);
            }
            // ADD EDIT AND DELETE ICONS
            title.appendChild(buildIMG('resources/pictures/App/icons/edit.png', '', wrapICN('', 'sh-icon', component + '-edit-icon', [
                {name:'onclick', value:'views.' + component + '.editData(' + index + ')'}
            ])));
            title.appendChild(buildIMG('resources/pictures/App/icons/delete.png', '', wrapICN('', 'sh-icon', component + '-delete-icon', [
                {name:'onclick', value:'views.' + component + '.deleteData(' + index + ')'}
            ])));
        }
        i++;
    }
    if(editable && sessionStorage.getItem('ACCESS') !== null) {
        // ADD NEW ICON BLOCK
        let saver = $('#' + firstLetterUppercase(component) + 'Main');
        let content = saver.innerHTML;
        saver.innerHTML = '';
        saver.appendChild(buildDIV([
            buildIMG('resources/pictures/App/icons/new-icon.png', '', cls(['new-icon', component + '-new-icon'], [
                {name:'onclick', value:'views.' + component + '.addData()'}
            ]))
        ], cls('new-block')));
        saver.innerHTML += content;
    }
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method show details block
 * @param id
 * @param def_element
 * @param def_display
 */
SPAComponent.prototype.show = function(id, def_element = 'details', def_display = 'block') {
    let icon = $('+' + def_element.split('-')[0] + '-sh-icon')[id];
    let sep = $('.' + def_element.split('-')[0] + '-sh-sep')[id];
    icon.setAttribute('src','resources/pictures/App/icons/minus-icon.png');
    icon.setAttribute('onclick','views.spa.hide('+id+', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = def_display;
    sep.style.display='none';
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+' + def_element.split('-')[0] + '-edit-icon')[id];
        let delt = $('+' + def_element.split('-')[0] + '-delete-icon')[id];
        edit.style.display = 'block';
        delt.style.display = 'block';
    }
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method hide details block
 * @param id
 * @param def_element
 * @param def_display
 */
SPAComponent.prototype.hide = function(id, def_element = 'details', def_display = 'block') {
    let icon = $('+' + def_element.split('-')[0] + '-sh-icon')[id];
    let sep = $('.' + def_element.split('-')[0] + '-sh-sep')[id];
    icon.setAttribute('src','resources/pictures/App/icons/plus-icon.png');
    icon.setAttribute('onclick','views.spa.show(' + id + ', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = 'none';
    sep.style.display = def_display;
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+' + def_element.split('-')[0] + '-edit-icon')[id];
        let delt = $('+' + def_element.split('-')[0] + '-delete-icon')[id];
        edit.style.display = 'none';
        delt.style.display = 'none';
    }
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Auto-add detection on left-menu bar for auto hovering on target article
 */
SPAComponent.prototype.detect_subContent_trigger_left_bar = function(component = '') {
    let element = $('#' + firstLetterUppercase(component) + 'Main');
    for(let child of element.childNodes) {
        if(child.innerHTML !== undefined) {
            child.setAttribute('onmouseover', 'views.spa.lightNav(this.id)');
            child.setAttribute('onmouseleave', 'views.spa.offLight(this.id)');
        }
    }
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
SPAComponent.prototype.lightNav = function(id) {
    try {
        $('#nav-' + id).classList.add('wrap-red');

    } catch (e) {}
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
SPAComponent.prototype.offLight = function (id) {
    try {
        $('#nav-' + id).classList.remove('wrap-red');
    } catch (e) {}
};
SPAComponent.prototype.route = function (component = '') {
    this.setTheme();
    this.initComponent(component);
    this.switchComponent();

};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
SPAComponent.prototype.closeSPLASH = function() {
    let modal = $('#splash');
    modal.style.display = 'none';
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
SPAComponent.prototype.popSPLASH = function (){
    let modal = $('#splash');
    modal.style.display = 'block';
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
SPAComponent.prototype.closeIMG = function() {
    let modal = $('#myModal');
    modal.style.display = 'none';
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
SPAComponent.prototype.popIMG = function(id) {
    let modal = $('#myModal');
    let img = $('#' + id);
    let modalImg = $('#modal_img');
    modal.style.display = 'block';
    modalImg.src = img.src;
    $('#caption').innerHTML = img.alt;
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close Form
 */
SPAComponent.prototype.closeFORM =  function(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'none';
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.showPartner = function(id) {
    if(this.current_component !== 'Partner') {
        this.route('Partner');
    }
    views.partner.showPartner(id, true);
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.search = function() {
    if(this.current_component === 'News') {
        views.news.filterKey();
    }
    if(this.current_component === 'Event') {
        views.event.filterKey();
    }
    if(this.current_component === 'Laureate') {
        views.laureate.filterKey();
    }
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * A function to test if the right icon will be displayed or not
 */
SPAComponent.prototype.scrollToTop = function(){
    let button = $("#scroll-top");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction()
    };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
        if(window.innerWidth < 700){
            button.style.display = "none";
        }
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.scrollToDown = function() {
    window.scrollTo(0, document.body.scrollHeight);
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * scrolling to top
 */
SPAComponent.prototype.topFunction =function(pixels=0,y_pixels=-50) {
    let timeout;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        window.scrollTo(pixels,y_pixels);
        timeout = setTimeout('views.spa.topFunction(pixels,y_pixels)', 8);
    } else {
        clearTimeout(timeout);
    }
};
/**
 * scrolling to down
 */
SPAComponent.prototype.downFunction =function(pixels) {
    let timeout;
    let body = document.body,
        html = document.documentElement;

    let height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    if(pixels === 0){
        pixels = height;
    }
    window.scrollTo(0,pixels);
    timeout = setTimeout('views.spa.downFunction(0,pixels)', 10);
    clearTimeout(timeout);
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display form
 */
SPAComponent.prototype.popFORM = function(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'block';
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.markAsSelected = function(id, component) {
    $('#all-' + component).style.display = 'block';
    let targets = $('.nav-' + component);
    for (let target of targets){
        target.classList.remove('wrap-red');
    }
    $('#nav-' + component + '-' + id).classList.add('wrap-red');
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.addNavigationPageNavigators = function (block, page_size, component) {
    block.appendChild(buildHR());
    let previous = buildElement('Button', 'Précédent', wrapCI(['page-navigator', 'blue-bg', 'disabled-page-navigator'],'prev-page-navigator' ,[
            {name:'onclick', value:'views.' + component + '.navigate(' + (current_page_number - 1) + ');'},
            {name:'disabled', value:''},
        ]));
    let next = buildElement('Button', 'Suivant', wrapCI(['page-navigator', 'blue-bg', 'disabled-page-navigator'],'next-page-navigator' ,[
            {name:'onclick', value:'views.' + component + '.navigate(' + (current_page_number + 1) + ');'},
            {name:'disabled', value:''},
        ]));
    // Test if there is more than one page
    if(page_size > 1) {
        if(current_page_number === 1) {
            next.removeAttribute('disabled');
            next.classList.remove('disabled-page-navigator');
        }
        if(current_page_number === page_size) {
            previous.removeAttribute('disabled');
            previous.classList.remove('disabled-page-navigator');
        }
        if(current_page_number > 1 && current_page_number < page_size) {
            next.removeAttribute('disabled');
            next.classList.remove('disabled-page-navigator');
            previous.removeAttribute('disabled');
            previous.classList.remove('disabled-page-navigator');
        }
    }
    block.appendChild(buildDIV([previous, next], cls('page-navigator-container')));
};
/* Theme Management --------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.loadThemes = function() {
    let container = $('#themeContainer');
    for(let theme of themes) {
        container.appendChild(buildDIV([
            buildIMG('resources/pictures/App/' + theme + '-theme.jpg', ''),
            buildSPAN(theme + ' Theme')
        ], wrapIC(theme, 'theme-item', [
            {name:'onclick', value:'views.spa.themeIndexer(\'' + theme + '\')'}
        ])));
    }
    this.setTheme();
    let current_element = $('#' + this.current_theme);
    current_element.style.backgroundColor = 'rgb(216, 49, 57)';
    current_element.style.color = 'white';
    current_element.style.opacity = '0.8';
    current_element.removeAttribute('onclick');
};
/* Theme Management --------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.themeIndexer = function (index) {
    localStorage.setItem('theme', index);
    location.reload();
};
SPAComponent.prototype.setTheme = function () {
    // Content Background
    $('.content')[0].classList.add(this.current_theme + '-bgC');
    $('.content')[0].classList.add(this.current_theme + '-text');
    // Header
    let navC = $('.topnav')[0];
    let navs = navC.getElementsByTagName('a');
    for(let n of navs) {
        n.classList.add(this.current_theme + '-bgC');
        n.classList.add(this.current_theme + '-nav-text');
    }
    // Search
    $('#key').classList.add(this.current_theme + '-Search-Focus');
    // Container
    $('.container')[0].classList.add(this.current_theme + '-bgC');
    $('.container')[0].classList.add(this.current_theme + '-text');
    $('.container-bg')[0].classList.add(this.current_theme + '-Pattern');
    //Left Menu
    let leftMenu = $('.left-menu');
    for(let l of leftMenu) {
        l.classList.add(this.current_theme + '-bgC');
        l.classList.add(this.current_theme + '-text');
        l.classList.add(this.current_theme + '-left-menu-border');
    }
    // Sub Content
    let subcontent = $('.sub-content');
    for(let s of subcontent) {
        s.classList.add(this.current_theme + '-bgC');
        s.classList.add(this.current_theme + '-text');
    }
    // form content
    let formContents = $('.form-content');
    for(let f of formContents) {
        f.classList.add(this.current_theme + '-bgC');
        f.classList.add(this.current_theme + '-text');
    }
    // Footer
    $('.partenaire')[0].classList.add(this.current_theme + '-bgC');
    // AutoBox
    let autoboxImg = $('.autoBox-image');
    for(let a of autoboxImg) {
        a.classList.add(this.current_theme + '-bgC');
    }
    let autoboxTxt = $('.autoBox-text');
    for(let a of autoboxTxt) {
        a.classList.add(this.current_theme + '-bgC');
        a.classList.add(this.current_theme + '-text');
    }
    // Timeline
    let timelineDesc = $('.timeline-description');
    for(let t of timelineDesc) {
        t.classList.add(this.current_theme + '-bgC');
        t.classList.add(this.current_theme + '-text');
    }
    let timelineTitle = $('.branch-title');
    for(let t of timelineTitle) {
        t.classList.add(this.current_theme + '-text');
    }
    // Partners Menu
    $('.partner-menu-title')[0].classList.add(this.current_theme + '-nav-text');
    let partners = $('.partner');
    for(let p of partners) {
        p.classList.add(this.current_theme + '-bgC');
        p.classList.add(this.current_theme + '-nav-text');
    }
    // List recommendations
    $('.list-recommendations')[0].classList.add(this.current_theme + '-bgC');
    $('.list-recommendations')[0].classList.add(this.current_theme + '-text');
    // Home Blocks
    let homeBlocks = $('.home-card');
    for(let h of homeBlocks) {
        h.classList.add(this.current_theme + '-bgC');
        h.classList.add(this.current_theme + '-text');
    }
    // Tree Model
    let activeBranch = $('.branch-active');
    for(let b of activeBranch) {
        b.classList.add(this.current_theme + '-bgC');
        b.classList.add(this.current_theme + '-text');
    }
    let contentBranch = $('.branch-content');
    for(let b of contentBranch) {
        b.classList.add(this.current_theme + '-bgC');
        b.classList.add(this.current_theme + '-text');
    }
    // Activity
    let semesterDesc = $('.semester-description');
    for(let s of semesterDesc) {
        s.classList.add(this.current_theme + '-bgC');
        s.classList.add(this.current_theme + '-text');
    }
    let semesterCards = $('.card');
    for(let c of semesterCards) {
        c.classList.add(this.current_theme + '-bgC');
        c.classList.add(this.current_theme + '-text');
    }
    let cardsContainer = $('.cards-container');
    for(let c of cardsContainer) {
        c.classList.add(this.current_theme + '-bgC2');
    }
    // Theme
    let themeItems = $('.theme-item');
    for(let t of themeItems) {
        t.classList.add(this.current_theme + '-bgC');
        t.classList.add(this.current_theme + '-nav-text');
    }
    // Professors
    $('.professors-container')[0].classList.add(this.current_theme + '-bgC2');
    let professorContainer = $('.professor-container');
    for(let c of professorContainer) {
        c.classList.add(this.current_theme + '-bgC');
        c.classList.add(this.current_theme + '-text');
    }
    let professorName = $('.professor-name');
    for(let p of professorName) {
        p.classList.add(this.current_theme + '-nav-text')
    }
    $('.charts-block')[0].classList.add(this.current_theme + '-bgC2');
};



