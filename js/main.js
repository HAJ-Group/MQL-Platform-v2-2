/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*                                *   _            ______      _______    _______   *   _______   _________
              |\    /|     /\     |  |  \   |     |           |          |  ____/   |  |       |      |
              | \  / |    /  \    |  |   \  |      \_____     |          |  \       |  |_______|      |
              |  \/  |   /____\   |  |    \ |            \    |          |   \      |  |              |
              |      |  /      \  |  |     \|      ______|    |_______   |    \     |  |              |
*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*Global Variables*/
let current_component;
let initializer;
let phone_menu_toggled = false;
let info = null;
let view;
let service;
let current_page_number = 1;
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------DEPENDENCIES LOADING FUNCTIONS-----------------------------------------------*/
function loadComponentStyle() {
    $('#component-style').setAttribute('href', 'components/' + current_component + 'Component/css/' + current_component + 'Component.css');
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------MAIN LOADING FUNCTIONS-----------------------------------------------*/
function loadHeader() {
    let headerElement = $('.topnav')[0];
    headerElement.innerHTML = '';
    headerElement.appendChild(getHeaderContent());
}
/*--------------------------------------------------------------------------------------------------------------------*/
function loadFooter() {
    let footerElement = $('.partenaire')[0];
    footerElement.innerHTML = '';
    footerElement.appendChild(getFooterContent());
}
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load current target component
 */
function loadComponent() {
    let container = $('#body');
    container.innerHTML = '';
    container.setAttribute('include', 'components/' + current_component + 'Component/' + current_component + 'Component.html');
    inject();
}
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load target component
 */
function load() {
    loadComponentStyle();
    // Loading Header Content
    loadHeader();
    // Loading Footer Content
    loadFooter();
    // Loading Component Content
    loadComponent();
    // Primary initialization
    let current_element = $('+' + current_component)[0];
    if(current_component === 'Home') $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/homeactive.png');
    else $('#home-logo').
    setAttribute('src', 'resources/pictures/App/Header/home.png');
    current_element.classList.add('active');
    current_element.setAttribute('onclick', '');
    current_element.setAttribute('onmouseover', '');
    changePicture(current_component);
    scrollToTop();
    loadContactForm();
    loadNewsLetter();
    closeModal();
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/* Action Functions */
/**
 * Change title image
 * @param element
 */
function changePicture(element) {
    let image = $('#title-image');
    let source = element + '.jpg';
    image.setAttribute('src', 'resources/pictures/App/Header/' + source);
    image.setAttribute('class', 'def-img');
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Showing/hiding phone version menu
 */
function showMenu() {
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
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function showEmptyErrorResult() {
    $('#main').innerHTML = '<div>' +
        '<img alt="" class="mini-logo" src="resources/pictures/Area/error.png">' +
        '</div>';
    $('#navigation').innerHTML = null;
    $('#switcher').innerHTML = null;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Building title configuration (icon + show and hide button)
 * @param source
 * @param editable
 */
function addTitleIcon(source, editable=false) {
    let titles = $('.title');
    let i=0;
    for (let title of titles) {
        let text = title.textContent;
        title.innerHTML = '';
        title.appendChild(buildDIV([
            buildIMG(source, 'title', cls('title-logo')),
            text
        ], cls('title-content')));
        title.appendChild(buildIMG('resources/pictures/App/icons/minus-icon.png', '', wrapICN('', 'sh-icon', 'sh-icon', [
            {name:'onclick', value:'hide('+i+')'}
        ])));
        title.appendChild(buildSPAN(null, cls('sh-sep')));
        if(editable && sessionStorage.getItem('ACCESS') !== null) {
            // ADD EDIT AND DELETE ICONS
            title.appendChild(buildIMG('resources/pictures/App/icons/edit.png', '', wrapICN('', 'sh-icon', 'edit-icon', [
                {name:'onclick', value:'view.editData(' + i + ')'}
            ])));
            title.appendChild(buildIMG('resources/pictures/App/icons/delete.png', '', wrapICN('', 'sh-icon', 'delete-icon', [
                {name:'onclick', value:'view.deleteData(' + i + ')'}
            ])));
        }
        i++;
    }
    if(editable && sessionStorage.getItem('ACCESS') !== null) {
        // ADD NEW ICON BLOCK
        let saver = $('.sub-content')[0];
        let content = saver.innerHTML;
        saver.innerHTML = '';
        saver.appendChild(buildDIV([
            buildIMG('resources/pictures/App/icons/new-icon.png', '', cls('new-icon', [
                {name:'onclick', value:'view.addData()'}
            ]))
        ], cls('new-block')));
        saver.innerHTML += content;
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method show details block
 * @param id
 * @param def_element
 * @param def_display
 */
function show(id, def_element = 'details', def_display = 'block') {
    let icon = $('+sh-icon')[id];
    let sep = $('.sh-sep')[id];
    icon.setAttribute('src','resources/pictures/App/icons/minus-icon.png');
    icon.setAttribute('onclick','hide('+id+', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = def_display;
    sep.style.display='none';
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+edit-icon')[id];
        let delt = $('+delete-icon')[id];
        edit.style.display = 'block';
        delt.style.display = 'block';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Action method hide details block
 * @param id
 * @param def_element
 * @param def_display
 */
function hide(id, def_element = 'details', def_display = 'block') {
    let icon = $('+sh-icon')[id];
    let sep = $('.sh-sep')[id];
    icon.setAttribute('src','resources/pictures/App/icons/plus-icon.png');
    icon.setAttribute('onclick','show(' + id + ', \'' + def_element + '\', \'' + def_display + '\')');
    let element = $('.' + def_element)[id];
    element.style.display = 'none';
    sep.style.display = def_display;
    // HIDE EDIT AND DELETE IF EXISTS
    if(sessionStorage.getItem('ACCESS') !== null) {
        let edit = $('+edit-icon')[id];
        let delt = $('+delete-icon')[id];
        edit.style.display = 'none';
        delt.style.display = 'none';
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Auto-add detection on left-menu bar for auto hovering on target article
 */
function detect_subContent_trigger_left_bar() {
    let element0 = $('.left-menu')[0];
    for(let child of element0.childNodes) {
        if(child.innerHTML !== undefined && child instanceof HTMLDivElement) {
            let target = child.firstChild;
            if(target.innerHTML !== undefined) {
                target.setAttribute('id', 'nav' + target.getAttribute('href').
                substr(target.getAttribute('href').indexOf('#') + 1));
            }
        }
    }
    let element = $('.sub-content')[0];
    for(let child of element.childNodes) {
        if(child.innerHTML !== undefined) {
            child.setAttribute('onmouseover', 'lightNav(this.id)');
            child.setAttribute('onmouseleave', 'offLight(this.id)')
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function lightNav(id) {
    try {
        $('#nav' + id).classList.add('wrap-red');
    } catch (e) {}
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/***
 * Lighting with navigation bar (left-menu) instant hovering works with auto detection
 * @param id
 */
function offLight(id) {
    try {
        $('#nav' + id).classList.remove('wrap-red');
    } catch (e) {}
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Split an array into n arrays
 * @param array
 * @param n
 * @returns {[]}
 */
function split(array, n) {
    let ret = [];
    for (let i = 0; i < array.length; i += n){
        ret.push(array.slice(i, i + n));
    }
    return ret;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
function closeSPLASH() {
    let modal = $('#splash');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
function popSPLASH() {
    let modal = $('#splash');
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close popped image
 */
function closeIMG() {
    let modal = $('#myModal');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display image
 */
function popIMG(id) {
    let modal = $('#myModal');
    let img = $('#' + id);
    let modalImg = $('#modal_img');
    modal.style.display = 'block';
    modalImg.src = img.src;
    $('#caption').innerHTML = img.alt;
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close TextBox
 */
function closeTB() {
    let modal = $('#TextBox');
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display textbox
 */
function popTB(icon, text) {
    let modal = $('#TextBox');
    let el_icon = $('#BoxIcon');
    let el_text = $('#BoxText');
    el_icon.src = icon;
    el_text.innerHTML = text;
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Close Form
 */
function closeFORM(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'none';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Display form
 */
function popFORM(target_block = 'form') {
    let modal = $('#' + target_block);
    modal.style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Global uses for functions bellow
 * @type {number}
 */
let current_img = 1;
let images_size = 0;
/**
 * Create book of images using a base data table
 * @param images
 * @param default_element_id
 */
function createBook(images=[], default_element_id = 'book') {
    current_img = 1;
    images_size = images.length;
    let element = $('#' + default_element_id);
    element.appendChild(buildDIV('<', cls('arrow-left', [
        {name:'onclick', value:'target(\''+ default_element_id + '\',--current_img)'},
    ])));
    for(let i = 1; i<=images.length; i++) {
        element.appendChild(buildIMG(images[i-1], 'MQL PLATFORM',
            wrapIC(default_element_id + '-img' + i, default_element_id + '-img', [
                {name:'onclick', value:'popIMG(this.id)'}
            ])));
    }
    element.appendChild(buildDIV('>', cls('arrow-right', [
        {name:'onclick', value:'target(\''+ default_element_id + '\',++current_img)'},
    ])));
    $( '.' + default_element_id + '-img')[current_img - 1].style.display = 'block';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Target function for image switching
 */
function target(target_element) {
    if(current_img < 1 ){
        current_img = images_size;
        target(target_element);
    }
    else if(current_img > images_size){
        current_img = 1;
        target(target_element);
    }
    else {
        try{
            for(let i=0; i<images_size; i++) {
                $( '.' + target_element + '-img')[i].style.display = 'none';
            }
            $( '.' + target_element + '-img')[current_img - 1].style.display = 'block';
        } catch (e) {}
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * A function to test if the right icon will be displayed or not
 */
function scrollToTop(){
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
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * scrolling to top
 */
function topFunction() {
    let timeout;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        window.scrollBy(0,-50);
        timeout = setTimeout('topFunction()', 8);
    } else {
        clearTimeout(timeout);
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function formattedDate(d = new Date) {
    let month = String(d.getMonth() + 1);
    let day = String(d.getDate());
    const year = String(d.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${day}-${month}-${year}`;
}
function transformDate(date, sep = '-') {
    let tmp = date.split(sep);
    return tmp[1] + sep + tmp[0] + sep + tmp[2];
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Wait Xms before executing next line
 * @param ms
 */
function wait(ms){
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load the content of the form contact
 */
function loadContactForm() {
    let form = $('#form-contact');
    form.innerHTML = '';
    form.appendChild(getContactFormContent());
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Load the content of the NewsLetter
 */
function loadNewsLetter() {
    let newsLetter = $('#news-cont');
    newsLetter.innerHTML = '';
    newsLetter.appendChild(getNewsLetterContent());
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 * Responsible for enabling listeners for contact-form and news-letter on click !
 */
function closeModal() {
    // Get the modal
    let modal = $('#form-contact-id');
    // When the user clicks anywhere outside of the modal, close it
    let newsModal = $('#news-modal-id');
    // Get the button that opens the modal
    let btn = $("#news-button");
    // showing and hiding newsLetter blocks
    // When the user clicks the button, open the modal
    btn.onclick = function() {
        newsModal.style.display = "block";
        btn.style.display = 'none';
    };
    // Get the <span> element that closes the modal
    let span =$(".close-part")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        newsModal.style.display = "none";
        if(window.innerWidth > 1300){
            btn.style.display = 'flex';
        }
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === newsModal) {
            newsModal.style.display = "none";
            if(window.innerWidth > 1300){
                btn.style.display = 'flex';
            }
        }
        else if(event.target === modal){
            modal.style.display = "none";
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/**
 *
 * @param target_block
 * @param target_function
 * @param target_key
 * @param isClass
 */
function setKeysAction(target_block,target_function,target_key='Enter',isClass=false) {
    let block = isClass? $(target_block)[0] : $(target_block);
    try{
        block.addEventListener('keypress',function (event) {
            let key = event.key;
            if(key===target_key) target_function();
        });
    } catch (e) {
        setKeysAction(target_block,target_function,target_key,true);
    }
}

/**
 *
 * @param text
 * @param maxChar
 * @returns {string}
 */
function textShortener(text, maxChar = 40) {
    let ret = '';
    for(let i = 0; i< maxChar; i++) {
        ret += text[i];
    }
    return ret + '...';
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
// AUTO BOX SCRIPTS
let current_autobox_item;
let item_size;
let auto_slider;
/*--------------------------------------------------------------------------------------------------------------------*/
function autoBoxLoader() {
    try {
        let items = $('.autoBox-item');
        if(items.length > 0) {
            let random = Math.floor(Math.random() * items.length);
            items[random].style.display = 'block';
            current_autobox_item = random;
            item_size = items.length;
        }
        function handler() {
            showABI(Math.floor(Math.random() * items.length));
        }
        auto_slider = setInterval(handler, 10000);
    } catch (e) {
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function showABI(index) {
    if(current_component === 'News') {
        let items = $('.autoBox-item');
        if(item_size > 0) {
            for(let item of items) item.style.display = 'none';
        }
        items[index].style.display = 'block';
        current_autobox_item = index;
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function nextABI() {
    if(current_autobox_item === (item_size - 1)) {
        showABI(0);
    }
    else {
        showABI(++current_autobox_item);
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function previousABI() {
    if(current_autobox_item === 0) {
        showABI(item_size - 1);
    }
    else {
        showABI(--current_autobox_item);
    }
}
/*--------------------------------------------------------------------------------------------------------------------*/
function pauseABI() {
    console.log('pausing');
    clearInterval(auto_slider);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function resumeABI() {
    console.log('resuming');
    function handler() {
        showABI(Math.floor(Math.random() * item_size));
    }
    auto_slider = setInterval(handler, 10000);
}
/*--------------------------------------------------------------------------------------------------------------------*/
function showPartner(id) {
    console.log(current_component);
    if(current_component !== 'Partner') {
        info = id;
        route('Partner');
    } else {
        $('#menu-' + id).click();
    }

}
function showNews(id) {
    route('News');
    location.href = '#' + id;
}
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
function inject() {
    let z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("include");
                    inject();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*                                *   _            ______      _______    _______   *   _______   _________
              |\    /|     /\     |  |  \   |     |           |          |  ____/   |  |       |      |
              | \  / |    /  \    |  |   \  |      \_____     |          |  \       |  |_______|      |
              |  \/  |   /____\   |  |    \ |            \    |          |   \      |  |              |
              |      |  /      \  |  |     \|      ______|    |_______   |    \     |  |              |
*/
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/

