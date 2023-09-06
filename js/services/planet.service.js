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

// PLANET SERVICE -------------------------------------------------------------------
export const getRandomIsTelluric = () => {
    return between(0, 1) ==  1 ? true : false;
  }
  export const getRandomDistanceFromStar = (isTelluric) => {
    if (isTelluric) { return between(50, 300) / 100; }
    return between(500, 3500) / 100;
  }
  export const getPlanetDensity = (planetMass, planetRadius) => {
    return (planetMass / (4 / 3 * Math.PI * Math.pow(planetRadius, 3)) / 1000000000000);
  }
  export const hasTelluricDensity = (mass, radius) => {
    return (getPlanetDensity(mass, radius) >= TELLURIC_MIN_DENSITY && getPlanetDensity(mass, radius) <= TELLURIC_MAX_DENSITY)
  }
  export const hasGaseousDensity = (mass, radius) => {
    return (getPlanetDensity(mass, radius) >= GASEOUS_MIN_DENSITY && getPlanetDensity(mass, radius) <= GASEOUS_MAX_DENSITY)
  }
  export const getPlanetSurfaceGravity = (planetMass, planetRadius) => {
      return (GRAVITATIONAL_CONSTANT * planetMass) / Math.pow(planetRadius * 1000, 2);
  }
  
  export const getPlanetTemperature = (albedo, distanceFromStar, hasAtmosphere) => {
    if (hasAtmosphere) {
      return (280 * Math.pow(((1 - albedo) / Math.pow(distanceFromStar, 2)), 1 / 4)) + 40;
    }
    return 280 * Math.pow(((1 - albedo) / Math.pow(distanceFromStar, 2)), 1 / 4);
  }
  
  export const getPlanetRating = (surfaceGravity, density, temperature, ratio, hasAtmosphere) => {
    const fixedSurfaceGravity = surfaceGravity / EARTH_SURFACE_GRAVITY;
    const fixedTemperature = temperature - 273.15;
    const isLegendaire =
      fixedSurfaceGravity >= 0.90 && fixedSurfaceGravity <= 1.10
      && density >= 5.10 && density <= 5.55
      && fixedTemperature >= 5 && fixedTemperature <= 35
      && ratio <= 0.20
      && hasAtmosphere;
    const isDiamant =
      fixedSurfaceGravity >= 0.80 && fixedSurfaceGravity <= 1.20
      && density >= 4.70 && density <= 5.60
      && fixedTemperature >= -10 && fixedTemperature <= 45
      && ratio <= 0.50
      && hasAtmosphere;
    const isOr =
      fixedSurfaceGravity >= 0.65 && fixedSurfaceGravity <= 1.30
      && density >= 4.25 && density <= 5.80
      && fixedTemperature >= -30 && fixedTemperature <= 50
      && ratio <= 1
      && hasAtmosphere;
    const isArgent =
      fixedSurfaceGravity >= 0.50 && fixedSurfaceGravity <= 1.45
      && density >= 3.80 && density <= 5.90
      && fixedTemperature >= -50 && fixedTemperature <= 60
      && ratio <= 1.5;
    const isBronze =
      fixedSurfaceGravity >= 0.30 && fixedSurfaceGravity <= 1.60
      && density >= 3.30 && density <= 5.95
      && fixedTemperature >= -70 && fixedTemperature <= 70
      && ratio <= 2;
    
    if (isLegendaire) { return "Légendaire" }
    if (isDiamant) { return "Diamant" }
    if (isOr) { return "Or" }
    if (isArgent) { return "Argent" }
    if (isBronze) { return "Bronze" }
    else {
      return "Basique"
    }
  }