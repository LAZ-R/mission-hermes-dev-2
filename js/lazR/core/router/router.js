import * as APP_ROUTER from '../../../app-router.js';
import * as HEADER from '../../../components/header/header.component.js';
import * as FOOTER from '../../../components/footer/footer.component.js';
import * as DOM from '../DOM/DOM.js'

const getPageRegex = /(?<=page=)\w+/g;

/**
 * Changement d'état du "potentiel de clic"
 */
document.onmouseover = () => {
    //le pointeur de l'utilisateur est dans la page.
    window.innerDocClick = true;
}

/**
 * Changement d'état du "potentiel de clic"
 */
document.onmouseleave = () => {
    //le pointeur de l'utilisateur a quitté la page.
    window.innerDocClick = false;
}

let historyArray = [];
let stack = 0;

export const getStack = () => {
    return stack;
}

/**
 * Méthode utilisée pour naviguer au sein de l'application
 * @param {string} URL 
 */
export const navigateTo = (URL) => {
    if ( // Si
        !( // N'est pas
            (window.location.hash.length == 0 && URL == './') // le hash a une longueur de 0 et l'URL de navigation vaut './'
            || window.location.hash == '#' + URL // l'URL ne navigation est l'URL actuelle
        )
    ) {
        window.innerDocClick = true;
        historyArray.push(window.location.hash);
        window.location.hash = URL; // changement d'URL effectué
        // le reste se déroule sur la fonction onHashChange()
    }

    // Sinon l'utilisateur essaye de naviguer sur la page sur laquelle il se trouve
}
window.navigateTo = navigateTo;

/**
 * Méthode automatique, déclenchée au changement du hash de l'URL 
 */
window.onhashchange = () => {

    //console.log("c'est du hash change");

    // Navigation in focus, toujours en avant
    if (window.innerDocClick) {

        //console.log("c'est de la navigation in focus");

        window.innerDocClick = false; // pk ?

        let pageArray = window.location.hash.match(getPageRegex); // on récupère l'URL
        if (pageArray != null) { // si l'URL n'est pas nulle
            const page = pageArray[0];
            navigateForward(page); // on navigue vers cette page
        } else {
            navigateForward(null); // sinon on navigue vers null
        } 

    // Navigation out focus, toujours en arrière
    } else {

        HEADER.hideEverything()
        FOOTER.unselectEverything();

        if (window.location.hash == '') {
            // BACK TO ROOT STACK
            navigateBackward(true);
            setTimeout(() => {
                const logo = DOM.createRootVariableColoredSVGElement('headerLogo', 'header-logo', './medias/images/text-only-logo.svg', 'logo appli', '--on-primary')
                HEADER.edit(
                    false, 
                    logo, 
                    false
                );
                FOOTER.setFooterSelectedIcon('missionControlIcon');
            }, 200);
        } else {
            window.location.hash = historyArray[historyArray.length-1];
            if (window.location.hash == '#./') {
                // BACK TO HOME BUT IS NOT ROOT STACK
                navigateBackward(false);
                setTimeout(() => {
                    const logo = DOM.createRootVariableColoredSVGElement('headerLogo', 'header-logo', './medias/images/text-only-logo.svg', 'logo appli', '--on-primary')
                    HEADER.edit(
                        false, 
                        logo, 
                        false
                    );
                    FOOTER.setFooterSelectedIcon('missionControlIcon');
                }, 200);
                
            } else {
                // BACK TO ANOTHER PAGE
                let pageArray = window.location.hash.match(getPageRegex);
                const page = pageArray[0];
                navigateBackward(false);
                setTimeout(() => {
                    let pageTitle;
                    let headerTitle;

                    switch (page) {
                        case 'controlCenters':
                            pageTitle = 'Centres de contrôle';
                            headerTitle = DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
                            HEADER.edit(
                                false, 
                                headerTitle, 
                                false
                            );
                            FOOTER.setFooterSelectedIcon('controlCentersIcon');
                            break;
                        case 'database':
                            pageTitle = 'Base de données';
                            headerTitle = DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
                            HEADER.edit(
                                false, 
                                headerTitle, 
                                false
                            );
                            FOOTER.setFooterSelectedIcon('databaseIcon');
                            break;
                        case 'runningTasks':
                            pageTitle = 'Tâches en cours';
                            headerTitle = DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
                            HEADER.edit(
                                false, 
                                headerTitle, 
                                false
                            );
                            FOOTER.setFooterSelectedIcon('runningTasksIcon');
                            break;
                        case 'settings':
                            pageTitle = 'Paramètres';
                            headerTitle = DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
                            HEADER.edit(
                                false, 
                                headerTitle, 
                                true
                            );
                            FOOTER.setFooterSelectedIcon('settingsIcon');
                            break;
                        default:
                            break;
                    }
                }, 200);
            }
        }
        historyArray.pop();
        //console.log(historyArray);
    }
}

export const navigateForward = (page) => {
    let currentMain = document.getElementById('main');
    currentMain.style.opacity = 0;
    currentMain.setAttribute('id', `oldMain${stack}`);
    HEADER.hideEverything();

    setTimeout(() => {
        currentMain.classList.remove('sliding-page');
        currentMain.classList.remove('pseudo-main');
        currentMain.classList.add('hidden-old-main');

        stack += 1;

        const newMain = document.createElement('div');
        newMain.style.opacity = 0;
        newMain.setAttribute('id', 'main');
        newMain.setAttribute('class', 'sliding-page');
        APP_ROUTER.pushView(newMain, page);

        const layoutSpacer = document.getElementById('layoutSpacer');
        document.getElementById('body').insertBefore(newMain, layoutSpacer);
        
        //setTimeout(() => {
            //newMain.style.top = 'var(--header-height)';
            setTimeout(() => {
                newMain.style.opacity = 1;
                
            }, 200);
        //}, 20);
    }, 200);
}

export const navigateBackward = (isRootPage) => {
    let currentMain = document.getElementById('main');
    currentMain.style.opacity = 0;
    currentMain.setAttribute('id', '');

    setTimeout(() => {
        document.querySelector(':root').style.setProperty('--phone-footer-height', '9%');
        document.querySelector(':root').style.setProperty('--phone-main-height', '84%');
        let oldMain = document.getElementById(`oldMain${stack - 1}`);
        if (oldMain != null) {
            oldMain.setAttribute('id', 'main');
            oldMain.classList.remove('hidden-old-main');

            if (isRootPage) {
                //oldMain.classList.add('pseudo-main');
                historyArray = [];
            }

            oldMain.classList.add('sliding-page');

            setTimeout(() => {
                currentMain.remove();
                oldMain.style.opacity = 1;
            }, 200);

            stack -= 1
        }
    }, 200);

    
}