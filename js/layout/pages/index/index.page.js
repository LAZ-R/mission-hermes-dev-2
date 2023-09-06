import * as LAZR from '../../../lazR/lazR.js';
import * as HEADER from '../../../components/header/header.component.js';
import { setFooterSelectedIcon } from '../../../components/footer/footer.component.js';

export const renderHeader = () => {
    const pageTitle = LAZR.APP_DATA.getAppName();
    LAZR.DOM.setHTMLTitle(pageTitle);

    const logo = LAZR.DOM.createRootVariableColoredSVGElement('headerLogo', 'header-logo', './medias/images/text-only-logo.svg', 'logo appli', '--on-primary')
    HEADER.edit(
        false, 
        logo, 
        false
    );
}

export const renderPage = () => {
    renderHeader();
    const page = LAZR.DOM.createElement('div', 'indexPage', 'page', `TODO: faire page "Mission Control"`);
    page.style.padding = '20px var(--horizontal-padding)';
    //document.querySelector(':root').style.setProperty('--phone-footer-height', '0%'); // Pas de footer
    setFooterSelectedIcon('missionControlIcon');
    return page;
}


