import { between } from "../utils/math.utils.js";
import { Planet } from "./planet.class.js";
import { HabitableZone } from "./habitable-zone.class.js";
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

import * as planetarySystemService from '../services/planetary-system.service.js';
import * as planetService from '../services/planet.service.js';

// PLANETARY SYSTEM CLASS -------------------------------------------------------------------
export class PlanetarySystem {
  constructor(id, name, spaceCenterId, starMass) {
    this.id = id;
    this.name = name != null ? name : planetarySystemService.getRandomPlanetarySystemName();
    this.space_center_id = spaceCenterId;
    this.distance_from_earth = planetarySystemService.getRandomPlanetarySystemDistanceFromEarth(/* get space center distance */ 5);
    this.starMass = starMass;
    this.habitableZone = new HabitableZone(this.starMass);
    this.planetList = [];
  }
    
  addRandomTelluricPlanet = () => {
    const distanceFromStar = planetService.getRandomDistanceFromStar(true);
    
    let randomMass = 0.1;
    let randomRadius = 0.1;
    while (!planetService.hasTelluricDensity(randomMass, randomRadius)) {
      randomMass = between(TELLURIC_MIN_MASS, TELLURIC_MAX_MASS);
      randomRadius = between(TELLURIC_MIN_RADIUS, TELLURIC_MAX_RADIUS);
    }

    let planet = new Planet(
      1, 
      this.id, 
      "", 
      this.habitableZone, 
      distanceFromStar, 
      randomMass, 
      randomRadius
    );
    this.planetList.push(planet);
  }
  
  addRandomGaseousPlanet = () => {
    const distanceFromStar = planetService.getRandomDistanceFromStar(false);
    
    let randomMass = 0.1;
    let randomRadius = 0.1;
    while (!planetService.hasGaseousDensity(randomMass, randomRadius)) {
      randomMass = between(GASEOUS_MIN_MASS, GASEOUS_MAX_MASS);
      randomRadius = between(GASEOUS_MIN_RADIUS, GASEOUS_MAX_RADIUS);
    }

    let planet = new Planet(
      1, 
      this.id, 
      "", 
      this.habitableZone, 
      distanceFromStar, 
      randomMass, 
      randomRadius);
    this.planetList.push(planet);
  }
  
  /* addPlanet = (id, planetarySystemId, name, distanceFromStar, mass, radius, albedo, hasAtmosphere) => {
    this.planetList.push(new Planet(id, planetarySystemId, name, this.habitableZone, distanceFromStar, mass, radius, albedo, hasAtmosphere));
  } */
  
  populate = () => {
    const numberOfTelluricPlanets = between(2, 4);
    const numberOfGaseousPlanets = between(1, 4);
    for (let i = 0 ; i < numberOfTelluricPlanets; i++) { this.addRandomTelluricPlanet(); }
    for (let i = 0 ; i < numberOfGaseousPlanets; i++) { this.addRandomGaseousPlanet(); }
    this.planetList = this.planetList.sort(this.comparePlanetsDistance);
    this.planetList.forEach((planet, index) => {
      planet.id = `${this.name}.${planet.type == "Tellurique" ? "T" : "G"}${index + 1}`;
      planet.name = `${this.name}.${planet.type == "Tellurique" ? "T" : "G"}${index + 1}`;
    })
  }

  comparePlanetsDistance = (a, b) => {
    if ( a.distance_from_star < b.distance_from_star ){
      return -1;
    }
    if ( a.distance_from_star > b.distance_from_star ){
      return 1;
    }
    return 0;
  }
  
  logSimple = () => {
    console.log(`
      ----------------------------------------------------
                  ${this.name.toUpperCase()}
      ----------------------------------------------------
      Masse étoile : ${this.starMass} masses solaires
      Liste des planètes :`
    );
    this.planetList.forEach(planet => {
      console.log(`${planet.name} - ${planet.rating}`)
    })
  }
        
  logFull = () => {
    console.log(`
      ----------------------------------------------------
                  ${this.name.toUpperCase()}
      ----------------------------------------------------
      Masse étoile : ${this.starMass} masses solaires
      Liste des planètes :`
    );
    this.planetList.forEach(planet => {
      planet.log();
    })
  }
}