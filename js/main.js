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
let views = {};
//----------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function HomeMain() {
    let service = new HomeComponentService();
    service.loadAllData(dbHomestats1, dbStudents[0].data, dbStudents[1].data, dbProfessors);
    views['home'] = new HomeComponent(service);
    views['home'].printStats();
    views.home.startPresenter();
    views.home.printProfessors();
    views.home.printStudents();
    views.home.printProfessors();
    views.home.fillNews();
    views.home.printNews();
    views.home.setNewsRoutes();
    // stays last
    views.spa.addTitleIcon('resources/pictures/Home/title-logo.png', false, 'home');
    views.spa.detect_subContent_trigger_left_bar('home');
    //createBook(dbHomeImages);
}
/*--------------------------------------------------------------------------------------------------------------------*/
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function NewsMain() {
    let service = new NewsComponentService();
    service.load(dbNews);
    views['news'] = new NewsComponent(service);
    try {
        views.news.fillAutoBox();
        views.news.fillNavigation();
        views.news.fillMain();
        views.news.fillSwitcher();
    } catch (e) {
        if(confirm('None News is found! Add new one ?')) {
            views.news.addData();
        } else {
            views.spa.route('Home');
        }
    }
    // stays last
    views.news.autoBoxLoader();
    views.spa.addTitleIcon('resources/pictures/News/News-logo.png', true, 'news');
    views.spa.detect_subContent_trigger_left_bar('news');
    views.news.trigger();
    if(window.innerWidth > 700) {
        try {
            views.news.selectNews(service.get(0).id);
            views.spa.markAsSelected(service.get(0).id, 'news');
        } catch (e) {}
    }
}
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function EventMain() {
    let service = new EventComponentService();
    service.load(dbEvent);
    views['event'] = new EventComponent(service);
    try {
        views.event.fillTimeline();
        views.event.fillNavigation();
        views.event.fillMain();
        views.event.fillSwitcher();
    } catch (e) {
        if(confirm('None Event is found! Add new one ?')) {
            views.event.addData();
        } else {
            views.spa.route('Home');
        }
    }
    // Stays last
    views.spa.addTitleIcon('resources/pictures/Event/Event-logo.png', true, 'event');
    views.spa.detect_subContent_trigger_left_bar('event');
    if(window.innerWidth > 700) {
        try {
            views.event.selectEvent(service.get(0).id);
            views.spa.markAsSelected(service.get(0).id, 'event');
        } catch (e) {}
    }
}
/**-------------------------------------------------------------------------------------------------------------------*/
function ActivityMain() {
    let service = new ActivityComponentService();
    service.load(dbActivity);
    views['activity'] = new ActivityComponent(service);
    views.activity.printSemesters();
    collapse();
    views.spa.addTitleIcon('resources/pictures/Activity/Activity-logo.png', false, 'activity');
    //views.activity.printActivityList(); Uncomment to print data in table member
}
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */
function PartnerMain() {
    let service = new PartnerComponentService();
    service.load(dbPartner);
    views['partner'] = new PartnerComponent(service);
    try {
        views.partner.fillPartnersMenu();
        views.partner.fillPartners();
        views.partner.hideAll();
    } catch (e) {
        if(confirm('None Partner is found! Add new one ?')) {
            views.partner.addData();
        } else {
            views.spa.route('Home');
        }
    }
    // Stays Last
}
/* Main Function */
function LaureateMain() {
    let service = new LaureateComponentService();
    service.loadPromotion(dbPromotion);
    service.loadspecial(dbPromotion);
    views['laureate'] = new LaureateComponent(service);
    try {
        views.laureate.fillNavigation();
        views.laureate.fillMain();
        views.laureate.random();
        views.laureate.fillSwitcher();
    } catch (e) {
        if(confirm('None Promotion is found! Add new one ?')) {
            views.laureate.addData();
        } else {
            views.spa.route('Home');
        }
    }
    // stays last
    views.spa.addTitleIcon('resources/pictures/Laureate/Laureate-logo.png', true, 'laureate');
    views.spa.detect_subContent_trigger_left_bar('laureate');
    if(window.innerWidth > 700) {
        try {
            views.laureate.selectPromotion(service.get(0).id);
            views.spa.markAsSelected(service.get(0).id, 'laureate');
        } catch (e) {}
    }
}
/**-------------------------------------------------------------------------------------------------------------------*/
function AreaMain() {
    let service = new AreaComponentService();
    service.load(dbArea);
    views['area'] = new AreaComponent(service);
    //views.area.printAreaList(); Uncomment to print data in table member
    if(sessionStorage.getItem('ACCESS') !== null){
        views.area.loadData();
    } else views.area.promptLogin();
}

/*--------------------------------------------------------------------------------------------------------------------*/
function mainSPA() {
    let service = new SPAComponentService();
    service.load(SPAnavs);
    views['spa'] = new SPAComponent(service);
    views.spa.load();
    views.spa.route();
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
