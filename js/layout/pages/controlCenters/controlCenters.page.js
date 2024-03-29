import * as LAZR from '../../../lazR/lazR.js';
import { setFooterSelectedIcon } from '../../../components/footer/footer.component.js';
import * as HEADER from '../../../components/header/header.component.js';

export const renderPage = () => {
    const pageTitle = 'Centres de contrôle';
    LAZR.DOM.setHTMLTitle(pageTitle);

    const headerTitle = LAZR.DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
    HEADER.edit(
        false, 
        headerTitle, 
        false
    );

    const page = LAZR.DOM.createElement('div', 'indexPage', 'page', `TODO: faire page "Centres de contrôle"`);
    page.style.padding = '20px var(--horizontal-padding)';
    //document.querySelector(':root').style.setProperty('--phone-footer-height', '0%'); // Pas de footer
    setFooterSelectedIcon('controlCentersIcon');
    return page;
}


