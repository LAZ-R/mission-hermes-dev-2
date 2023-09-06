import * as LAZR from '../../lazR/lazR.js';

export const unselectEverything = () => {
    document.getElementById('missionControlIcon').classList.add('unselected');
    document.getElementById('controlCentersIcon').classList.add('unselected');
    document.getElementById('databaseIcon').classList.add('unselected');
    document.getElementById('runningTasksIcon').classList.add('unselected');
    document.getElementById('settingsIcon').classList.add('unselected');
}

const footerNavigateTo = (URL) => {
    unselectEverything();
    LAZR.ROUTER.navigateTo(URL);
}
window.footerNavigateTo = footerNavigateTo;

export const setFooterSelectedIcon = (selectedIconId) => {
    document.getElementById(selectedIconId).classList.remove('unselected');
}

export const renderView = () => {
    const footer = document.getElementById('footer');

    /* Bouton navigation "Mission control" */

    const missionControlButton = LAZR.DOM.createElement(
        'a', 
        'missionControlButton', 
        'footer__navigation-button', 
        '');
    missionControlButton.setAttribute('onclick', 'footerNavigateTo("./")');
    const missionControlIcon = LAZR.DOM.createRootVariableColoredSVGElement(
        'missionControlIcon', 
        'navigation-button__icon unselected', 
        './medias/images/font-awsome/chart-simple-solid.svg', 
        'Pointe de flèche vers la gauche', 
        '--on-primary');
    missionControlButton.appendChild(missionControlIcon);

    footer.appendChild(missionControlButton);

    /* Bouton navigation "Centres de contrôle" */

    const controlCentersButton = LAZR.DOM.createElement(
        'a', 
        'controlCentersButton', 
        'footer__navigation-button', 
        '');
    controlCentersButton.setAttribute('onclick', 'footerNavigateTo("./?page=controlCenters")');
    const controlCentersIcon = LAZR.DOM.createRootVariableColoredSVGElement(
        'controlCentersIcon', 
        'navigation-button__icon unselected', 
        './medias/images/font-awsome/satellite-dish-solid.svg', 
        'Pointe de flèche vers la gauche', 
        '--on-primary');
    controlCentersButton.appendChild(controlCentersIcon);

    footer.appendChild(controlCentersButton);

    /* Bouton navigation "Base de données" */

    const databaseButton = LAZR.DOM.createElement(
        'a', 
        'databaseButton', 
        'footer__navigation-button', 
        '');
    databaseButton.setAttribute('onclick', 'footerNavigateTo("./?page=database")');
    const databaseIcon = LAZR.DOM.createRootVariableColoredSVGElement(
        'databaseIcon', 
        'navigation-button__icon unselected', 
        './medias/images/font-awsome/database-solid.svg', 
        'Pointe de flèche vers la gauche', 
        '--on-primary');
    databaseButton.appendChild(databaseIcon);

    footer.appendChild(databaseButton);

    /* Bouton navigation "Tâches" */

    const runningTasksButton = LAZR.DOM.createElement(
        'a', 
        'runningTasksButton', 
        'footer__navigation-button', 
        '');
    runningTasksButton.setAttribute('onclick', 'footerNavigateTo("./?page=runningTasks")');
    const runningTasksIcon = LAZR.DOM.createRootVariableColoredSVGElement(
        'runningTasksIcon', 
        'navigation-button__icon unselected', 
        './medias/images/font-awsome/bars-progress-solid.svg', 
        'Pointe de flèche vers la gauche', 
        '--on-primary');
    runningTasksButton.appendChild(runningTasksIcon);

    footer.appendChild(runningTasksButton);

    /* Bouton navigation "Paramètres" */

    const settingsButton = LAZR.DOM.createElement(
        'a', 
        'settingsButton', 
        'footer__navigation-button', 
        '');
    settingsButton.setAttribute('onclick', 'footerNavigateTo("./?page=settings")');
    const settingsIcon = LAZR.DOM.createRootVariableColoredSVGElement(
        'settingsIcon', 
        'navigation-button__icon unselected', 
        './medias/images/font-awsome/gear-solid.svg', 
        'Pointe de flèche vers la gauche', 
        '--on-primary');
    settingsButton.appendChild(settingsIcon);

    footer.appendChild(settingsButton);
    `&copy; ${new Date().getFullYear()} - v${LAZR.APP_DATA.getAppVersionNumber()} - <a href="./?page=about">À propos</a><button onclick="footerNavigateTo('./?page=settings')"></button>`;
}