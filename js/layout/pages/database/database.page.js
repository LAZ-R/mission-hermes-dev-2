import * as LAZR from '../../../lazR/lazR.js';
import { setFooterSelectedIcon } from '../../../components/footer/footer.component.js';
import * as HEADER from '../../../components/header/header.component.js';
import { PlanetarySystem } from '../../../classes/planetary-system.class.js';
import * as planetarySystemService from '../../../services/planetary-system.service.js';

export const renderPage = () => {
    const pageTitle = 'Base de données';
    LAZR.DOM.setHTMLTitle(pageTitle);

    const headerTitle = LAZR.DOM.createElement('h1', 'headerTitle', 'header-title', pageTitle);
    HEADER.edit(
        false, 
        headerTitle, 
        false
    );
    const page = LAZR.DOM.createElement('div', 'databasePage', 'page', `<div id="displayContainer" class="display-container"></div><button onclick="randomizePlanet()">Génerer</button>`);
    page.style.padding = '20px var(--horizontal-padding)';
    //document.querySelector(':root').style.setProperty('--phone-footer-height', '0%'); // Pas de footer
    setFooterSelectedIcon('databaseIcon');
    return page;
}

// Randomizer ------------------------------------------------------------------------------------
const randomizePlanet = () => {
    const newPlanetarySystem = new PlanetarySystem(1, null, 1, planetarySystemService.getRandomStarMass());
    newPlanetarySystem.populate();
    //newPlanetarySystem.logFull();
    planetarySystemService.renderViewForPlanetarySystem(newPlanetarySystem);
    //window.scrollTo(0,0)
}
window.randomizePlanet = randomizePlanet;
