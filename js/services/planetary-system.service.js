import { between } from "../utils/math.utils.js";
import {
  GRAVITATIONAL_CONSTANT,
  UA,
  EARTH_MASS,
  EARTH_RADIUS,
  EARTH_SURFACE_GRAVITY,
  EARTH_ALBEDO,

  TELLURIC_MIN_MASS,
  TELLURIC_MAX_MASS,
  TELLURIC_MIN_RADIUS,
  TELLURIC_MAX_RADIUS,
  TELLURIC_MIN_DENSITY,
  TELLURIC_MAX_DENSITY,

  GASEOUS_MIN_MASS,
  GASEOUS_MAX_MASS,
  GASEOUS_MIN_RADIUS,
  GASEOUS_MAX_RADIUS,
  GASEOUS_MIN_DENSITY,
  GASEOUS_MAX_DENSITY,
} from '../data/constants.data.js'

// PLANETARY SYSTEM SERVICE -------------------------------------------------------------------
export const getRandomPlanetarySystemName = () => {
  let finalName = "000-000";
  const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < finalName.length; i++) {
    if (finalName[i] === "0") {
      let rndChar = CHARACTERS[between(0, CHARACTERS.length -1)];
      finalName = finalName.replace("0", rndChar);
    }
  }
  return finalName;
}

export const getRandomStarMass = () => {
  return between(50, 250) / 100;
}

export const getRandomPlanetarySystemDistanceFromEarth = (spaceCenterDistance)=>  {
  // al = ly = année lumière | 1 al =  
  // pc = parsec | 1pc =  3,26 al
  // plus proche : Alpha centauri = 4,37 al = 1.34 pc
  // plus éloigné multiplanétaire découvert : OGLE-2012-BLG-0026L, à 13 300 al

  // entre 437 et 1 330 000
  return (between(spaceCenterDistance * 100, 1330000) / 100).toFixed(2);
}

// EXECUTION -------------------------------------------------------------------
/*
const solarSystem = new PlanetarySystem(1, "Système Solaire", 1);
solarSystem.addPlanet(1, 1, "Mercure", 0.47, 3.285e23, 2439.7, 0.12, false);
solarSystem.addPlanet(2, 1, "Vénus",   0.7, 4.867e24, 6051.8, 0.65, true);
solarSystem.addPlanet(3, 1, "Terre",   1, EARTH_MASS, EARTH_RADIUS, EARTH_ALBEDO, true); // terre
solarSystem.addPlanet(4, 1, "Mars",    1.5237, 6.390e23, 3389.5, 0.16, false);
solarSystem.addPlanet(5, 1, "Jupiter", 5, 1.898e27, 69911,  0.52, true);
solarSystem.addPlanet(6, 1, "Saturne", 9.5, 5.683e26, 58232,  0.47, true);
solarSystem.addPlanet(7, 1, "Uranus",  19.2, 8.681e25, 25362,  0.51, true);
solarSystem.addPlanet(8, 1, "Neptune", 30, 1.024e26, 24622,  0.41, true);
solarSystem.logSimple();
*/

export const renderViewForPlanetarySystem = (planetarySystem) => {
  const getPlanetRatingColor = (planetRating) => {
    switch (planetRating) {
      case "Légendaire": return '#9c45ff'
      case "Diamant": return '#abf9ff'
      case "Or": return '#9e7e42'
      case "Argent": return '#a1a1a1'
      case "Bronze": return '#9c785d'
      default: return '#ffffff';
    }
  }
  const displayContainer = document.getElementById('displayContainer');
  displayContainer.innerHTML = ``;
  displayContainer.innerHTML = `
  <h1>Système ${planetarySystem.name}</h1>
  <h4>Distance de la Terre :  ${planetarySystem.distance_from_earth} Années lumières</h4>
  <h2>Masse de ${planetarySystem.name} :<br>${planetarySystem.starMass} <i>M</i><sub>☉</sub> (Masses solaires)</h2>
  <h3>${planetarySystem.planetList.length} planètes</h3>`;
  
  planetarySystem.planetList.forEach(planet => {
    const planetContainer = document.createElement('div');
    planetContainer.setAttribute('class', 'planet-container');

    const planetDisplayContainer = document.createElement('div');
    planetDisplayContainer.setAttribute('class', 'planet-display-container');
    planetDisplayContainer.appendChild(planet.getView());

    const planetInfos = document.createElement('div');
    planetInfos.setAttribute('class', 'planet-infos');
    planetInfos.innerHTML = `
      <span class="planet-name">${planet.name}</span>
      
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Distance à son étoile</span><span class="planet-infos-row-value">${planet.distance_from_star} UA</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Masse</span>
          <span class="planet-infos-row-value">${planet.mass.toPrecision(4)} kg (${(planet.mass / EARTH_MASS).toFixed(2)} Terre${(planet.mass / EARTH_MASS >= 2 ? "s" : "")})</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Rayon</span>
          <span class="planet-infos-row-value">${planet.radius} km (${(planet.radius / EARTH_RADIUS).toFixed(2)} Terre${(planet.radius / EARTH_RADIUS >= 2 ? "s" : "")})</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Densité</span>
          <span class="planet-infos-row-value">${planet.density.toFixed(2)} g/cm³</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Gravité de surface</span>
          <span class="planet-infos-row-value">${planet.surface_gravity.toFixed(2)} m/s² (${(planet.surface_gravity / EARTH_SURFACE_GRAVITY).toFixed(2)} g)</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Inclinaison de l'axe</span>
          <span class="planet-infos-row-value">${planet.angle}°</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Albedo</span>
          <span class="planet-infos-row-value">${planet.albedo.toFixed(2)}</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Atmosphère</span>
          <span class="planet-infos-row-value">${planet.has_atmosphere ? "Oui" : "Non"}</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Température moyenne</span>
          <span class="planet-infos-row-value">${planet.temperature.toFixed(2)} K (${(planet.temperature - 273.15).toFixed(2)} °C)</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Type</span>
          <span class="planet-infos-row-value">${planet.type}</span>
      </div>
      <div class="planet-infos-row">
          <span class="planet-infos-row-label">Ratio d'éloignement de la zone habitable</span>
          <span class="planet-infos-row-value">${(planet.habitable_zone_ratio).toFixed(2)}</span>
      </div>
      <div class="planet-infos-row">
        <span class="planet-infos-row-label">Note de colonisabilité</span>
        <span class="planet-infos-row-value" style="${
          planet.rating != 'Basique'
            ? `
              box-sizing: border-box;
              border-radius: 15px;
              display: flex;
              justify-content: center;
              aligh-items: baseline;
              margin-right: 15%;
              margin-left: 10px;
              color: #000000;
              font-weight: 800;
              padding: 5px 0 8px 0;
              background-color:${getPlanetRatingColor(planet.rating)}`
            : ''
          }">${planet.rating}</span>
      </div>`;
    
    planetContainer.appendChild(planetDisplayContainer);
    planetContainer.appendChild(planetInfos);

    displayContainer.appendChild(planetContainer);
  })
}
