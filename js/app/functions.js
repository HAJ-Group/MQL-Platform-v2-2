
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

/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
//----------------------------------------------------------------------------------------------------------------------
/**
 *
 * @param arg
 * @returns {string}
 */
function firstLetterUppercase(arg) {
    let ret = arg[0].toUpperCase();
    for(let i=1; i<arg.length; i++) {
        ret += arg[i];
    }
    return ret;
}

function getValueInRowBYId(id, rows) {
    let counter = 0;
    for(let r of rows) {
        counter++;
        for(let item of r) {
            if(item.id === id) return counter;
        }
    }
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
                {name:'onclick', value:'views.spa.popIMG(this.id)'}
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


