/**
 * Main app routing function
 * @param component
 */
function route(component = '') {
    initComponent(component);
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
        $('#loader').style.display = 'none';
    } catch (e) {}
}


