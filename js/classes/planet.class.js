import * as planetService from '../services/planet.service.js';
import * as planetStyleService from '../services/planet-style.service.js';
import * as habitableZoneService from '../services/habitable-zone.service.js';

// PLANET CLASS -------------------------------------------------------------------
export class Planet {
  constructor(id, planetarySystemId, name, planetarySystemHabitableZone, distanceFromStar, mass, radius) {
    this.id = id;
    this.planetary_system_id = planetarySystemId;
    this.name = name;
    this.distance_from_star = distanceFromStar;
    this.mass = mass;
    this.radius = radius;
    this.density = planetService.getPlanetDensity(
        mass, 
        radius
    );
    this.surface_gravity = planetService.getPlanetSurfaceGravity(
        mass, 
        radius
    );
    this.type = 
        planetService.hasTelluricDensity(this.mass, this.radius) 
            ? "Tellurique" 
            : "Gazeuse"
    ;
    this.style = 
        planetService.hasTelluricDensity(this.mass, this.radius) 
        ? planetStyleService.getRandomTelluricPlanetStyle()
        : planetStyleService.getRandomGaseousPlanetStyle()
    ;
    this.angle = this.style.angle;
    this.albedo = this.style.albedo;
    this.has_atmosphere = this.style.has_atmosphere;
    this.temperature = planetService.getPlanetTemperature(
        this.albedo, 
        this.distance_from_star, 
        this.has_atmosphere
    );
    this.habitable_zone_ratio = habitableZoneService.getHabitableZoneRatio(
        planetarySystemHabitableZone.start, 
        planetarySystemHabitableZone.end, 
        this.distance_from_star
    );
    this.rating = planetService.getPlanetRating(
        this.surface_gravity, 
        this.density, 
        this.temperature, 
        this.habitable_zone_ratio, 
        this.has_atmosphere
    );
    this.is_colonized = false;
  }
  
  getView = () => {
    return planetService.hasTelluricDensity(this.mass, this.radius) 
        ? planetStyleService.renderTelluricPlanetView(this.style) 
        : planetStyleService.renderGaseousPlanetView(this.style);
  }
  log = () => {
    console.log(`
----------------------------------------------------
                      ${this.name.toUpperCase()}
----------------------------------------------------
    Distance à son étoile : ${this.distance_from_star} UA
                    Masse : ${this.mass.toPrecision(4)} kg (${(this.mass / EARTH_MASS).toFixed(2)} Terre${(this.mass / EARTH_MASS >= 2 ? "s" : "")})
                    Rayon : ${this.radius} km (${(this.radius / EARTH_RADIUS).toFixed(2)} Terre${(this.radius / EARTH_RADIUS >= 2 ? "s" : "")})
                  Densité : ${this.density.toFixed(2)} g/cm³
       Gravité de surface : ${this.surface_gravity.toFixed(2)} m/s² (${(this.surface_gravity / EARTH_SURFACE_GRAVITY).toFixed(2)} g)
     Inclinaison de l'axe : ${this.angle}
                   Albedo : ${this.albedo}
               Atmosphère : ${this.has_atmosphere ? "Oui" : "Non"}
      Température moyenne : ${this.temperature.toFixed(2)} K (${(this.temperature - 273.15).toFixed(2)} °C)
                     Type : ${this.type}
Ratio hors zone habitable : ${(this.habitable_zone_ratio).toFixed(2)}
                     Note : ${this.rating}
            Est colonisée : ${this.is_colonized ? "Oui" : "Non"}`);
  }
}