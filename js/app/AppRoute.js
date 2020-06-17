/**
 * Main app routing function
 * @param component
 */
function route(component = '') {
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
    load();
    window[current_component + 'Main']();
}


