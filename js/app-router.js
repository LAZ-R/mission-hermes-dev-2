import * as PAGE_INDEX from './layout/pages/index/index.page.js';
import * as PAGE_CONTROL_CENTERS from './layout/pages/controlCenters/controlCenters.page.js';
import * as PAGE_DATABASE from './layout/pages/database/database.page.js';
import * as PAGE_RUNNING_TASKS from './layout/pages/runningTasks/runningTasks.page.js';
import * as PAGE_ABOUT from './layout/pages/about/about.page.js';
import * as PAGE_SETTINGS from './layout/pages/settings/settings.page.js';
import * as PAGE_JSON_WIZARD from './layout/pages/jsonWizard/jsonWizard.page.js';

// Constants ------------------------------------------------------------------

// Methods --------------------------------------------------------------------

export const pushView = (parentComponent, page) => {
    switch (page) {
        case 'about':
            parentComponent.appendChild(PAGE_ABOUT.renderPage());
            break;
        case 'settings':
            parentComponent.appendChild(PAGE_SETTINGS.renderPage());
            break;
        case 'jsonWizard':
            parentComponent.appendChild(PAGE_JSON_WIZARD.renderPage());
            break;
        case 'controlCenters':
            parentComponent.appendChild(PAGE_CONTROL_CENTERS.renderPage());
            break;
        case 'database':
            parentComponent.appendChild(PAGE_DATABASE.renderPage());
            break;
        case 'runningTasks':
            parentComponent.appendChild(PAGE_RUNNING_TASKS.renderPage());
            break;
        default:
            parentComponent.appendChild(PAGE_INDEX.renderPage());
            break;
    } 
}

// Execution ------------------------------------------------------------------