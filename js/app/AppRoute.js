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
    initializer = setInterval(run, 10);
}

/**
 * RUN COMPONENT ACTION FUNCTION
 */
function run() {
    try {
        window[current_component + 'Main']();
        clearInterval(initializer);
    } catch (e) {}
}


