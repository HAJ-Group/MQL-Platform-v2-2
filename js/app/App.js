/**
 * Main app routing function
 * @param component
 */
function route(component = '') {
    initComponent(component);
    switchComponent();
}

function init() {
    load();
    route();
}


