/*--------------------------------------------------------------------------------------------------------------------*/
/*Default class*/
function SPAComponent(service) {
    this.service = service;
    let current_component = 'Home';
}
SPAComponent.prototype.initComponent = function(component) {
    if(component === '') {
        if(sessionStorage.getItem('component') !== null) {
            component = sessionStorage.getItem('component');
        } else {
            component = 'Home';
        }
    } else {
        sessionStorage.setItem('component', component);
    }
    current_component = component;
    // Primary initialization
    let current_element = $('+' + current_component)[0];
    if(current_component === 'Home') $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/homeactive.png');
    else $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/home.png');
    for(let c of this.service.db) {
        let element = $('+' + c.name)[0];
        element.classList.remove('active');
        element.setAttribute('onclick', 'views.spa.route(this.name)');
        element.setAttribute('onmouseover', 'views.spa.changePicture(this.name)');
        element.setAttribute('onmouseleave', 'views.spa.changePicture(\'' + current_component + '\')');
    }
    current_element.classList.add('active');
    current_element.removeAttribute('onclick');
    current_element.removeAttribute('onmouseover');
    this.changePicture(current_component);
    this.scrollToTop();
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
    for(let c of navs) {
        let element = $('#' + c.name + 'Component');
        element.appendChild(window['get' + c.name + 'FormContent']());
    }
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.loadComponents = function() {
    for(let i = (navs.length - 1); i >= 0; i--) {
        window[navs[i].name + 'Main']();
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
    $('#' + current_component + 'UpperArea').style.display = 'block';
    $('#' + current_component + 'Component').style.display = 'block';
    if(current_component === 'News' || current_component === 'Event' || current_component === 'Laureate') {
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
    $('#' + current_component + 'Main').innerHTML = '<div>' +
        '<img alt="" class="mini-logo" src="resources/pictures/Area/error.png">' +
        '</div>';
    $('#' + current_component + 'Navigation').innerHTML = null;
    $('#' + current_component + 'switcher').innerHTML = null;
};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Building title configuration (icon + show and hide button)
 * @param source
 * @param editable
 * @param component
 */
SPAComponent.prototype.addTitleIcon = function(source, editable=false, component) {
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
            // ADD EDIT AND DELETE ICONS
            title.appendChild(buildIMG('resources/pictures/App/icons/edit.png', '', wrapICN('', 'sh-icon', component + '-edit-icon', [
                {name:'onclick', value:'views.' + component + '.editData(' + i + ')'}
            ])));
            title.appendChild(buildIMG('resources/pictures/App/icons/delete.png', '', wrapICN('', 'sh-icon', component + '-delete-icon', [
                {name:'onclick', value:'views.' + component + '.deleteData(' + i + ')'}
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
    if(current_component !== 'Partner') {
        this.route('Partner');
    }
    views.partner.showPartner(id, true);
};
/*--------------------------------------------------------------------------------------------------------------------*/
SPAComponent.prototype.search = function() {
    if(current_component === 'News') {
        views.news.filterKey();
    }
    if(current_component === 'Event') {
        views.event.filterKey();
    }
    if(current_component === 'Laureate') {
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
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * scrolling to top
 */
SPAComponent.prototype.topFunction =function() {
    let timeout;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        window.scrollBy(0,-50);
        timeout = setTimeout('views.spa.topFunction()', 8);
    } else {
        clearTimeout(timeout);
    }
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
    console.log('test');
    $('#all-' + component).style.display = 'block';
    let targets = $('.wrap-red');
    for (let target of targets){
        target.classList.remove('wrap-red');
    }
    $('#nav-' + component + '-' + id).classList.add('wrap-red');
};
function mainSPA() {
    let service = new SPAComponentService();
    service.load(SPAnavs);
    views['spa'] = new SPAComponent(service);
    views.spa.load();
    views.spa.route();
}
