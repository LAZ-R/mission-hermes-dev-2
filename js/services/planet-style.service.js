import { between, getRandomAngle } from "../utils/math.utils.js";

// Color values -----------------------------------------------------------------------------------

// TELLURIC Specific ----------------------------------------------------------
const getRandomRGBSubValue = () => { return between(50, 125); }

const getRandomRGBValue = () => {
    const value1 = getRandomRGBSubValue();
    const value2 = getRandomRGBSubValue();
    const value3 = getRandomRGBSubValue();
    const luminosity = (value1 + value2 + value3) / 765;
    return {
        value: `rgb(${value1}, ${value2}, ${value3})`,
        luminosity: luminosity
    };
}

// GASEOUS Specific -----------------------------------------------------------
const GASEOUS_BASE_HSL_COLORS = [
    { hue:  17, saturation: 63, luminosity: 72 },
    { hue:  38, saturation: 63, luminosity: 72 },
    { hue: 173, saturation: 63, luminosity: 72 },
    { hue: 190, saturation: 63, luminosity: 72 },
    { hue: 221, saturation: 63, luminosity: 72 },
    { hue: 248, saturation: 63, luminosity: 72 },
];

const getRandomGaseousBaseHSLColor = () => {
    return GASEOUS_BASE_HSL_COLORS[between(0, GASEOUS_BASE_HSL_COLORS.length - 1)];
}

const getHSLRandomVariationFromHSLInput = (HSLJson, isRingValue) => {
    let hue = HSLJson.hue;
    hue = between(hue - hue / 10, hue + hue / 10);
    if (hue < 0) { hue = hue + 360 };
    if (hue > 360) { hue = hue - 360 };
  
    let saturation = HSLJson.saturation;
    saturation = isRingValue ? between(15, 40) : between(10, 100);
  
    let luminosity = HSLJson.luminosity;
    luminosity = isRingValue ? between(50, 80) : between(20, 90);
  
    return {
        hue: hue,
        saturation: saturation,
        luminosity: luminosity
    }
}

const getRGBValueFromHSL = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => { return (n + h / 30) % 12; }
    const a = s * Math.min(l, 1 - l);
    const f = (n) => { return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); }

    const value1 = 255 * f(0);
    const value2 = 255 * f(8);
    const value3 = 255 * f(4);
    const luminosity = (value1 + value2 + value3) / 765;

    return {
        value: `rgb(${value1}, ${value2}, ${value3})`,
        luminosity: luminosity
    };
};

// ALL ------------------------------------------------------------------------
const getRandomGradientValues = (isTelluric, HSLBaseColor) => {
    const valuesNumber = between(isTelluric ? 2 : 3, isTelluric ? 3 : 15);

    let percentage = 0;
    let values = '';
    let luminosity = 0;
  
    for (let i = 0 ; i < valuesNumber ; i++) {
        let randomRGBValue = { value : '', luminosity : 0 };
        if (isTelluric) {
            randomRGBValue = getRandomRGBValue();
        } else {
            const randomHSLValue = getHSLRandomVariationFromHSLInput(HSLBaseColor, false);
            randomRGBValue = getRGBValueFromHSL(randomHSLValue.hue,randomHSLValue.saturation, randomHSLValue.luminosity);
        }
        luminosity += randomRGBValue.luminosity;
        let value = `, ${randomRGBValue.value} ${percentage}%`
        values += value;
      
        if (i == 0) {
            percentage = between(2, 33);
        } else if (i == valuesNumber - 2) {
            percentage = 100;
        } else {
            percentage = between(percentage + percentage / 10, 100);
        }
    }

    return {
        values: values,
        albedo : luminosity / valuesNumber
    };
}

const getRandomGradient = (angle, isTelluric, HSLBaseColor) => {
    const randomRGBValues = getRandomGradientValues(isTelluric, HSLBaseColor);
    return {
        value : `linear-gradient(${angle}deg${randomRGBValues.values})`,
        albedo : randomRGBValues.albedo
    }
}

// Styles Randomizers -----------------------------------------------------------------------------

// TELLURIC -------------------------------------------------------------------
export const getRandomTelluricPlanetStyle = () => {
    const angle = getRandomAngle();
    const randomGradient = getRandomGradient(angle, true);

    let telluricPlanetStyle =  {
        has_atmosphere: between(0, 1) == 1 ? true : false,
        planet_surface_gradient: randomGradient.value,
        planet_texture: {
            background_size: between(100, 500),
            background_position_x: between(0, 100), 
            background_position_y: between(0, 100),
            transform: `rotatez(${between(0, 360)}deg)`,
            opacity: between(20, 80) / 100
        },
        albedo: randomGradient.albedo,
        angle: angle
    }
    
    return telluricPlanetStyle;
}

// GASEOUS --------------------------------------------------------------------
export const getRandomGaseousPlanetStyle = () => {
    const angle = getRandomAngle();
    const randomGaseousHSLBaseColor = getRandomGaseousBaseHSLColor();
    const gaseousPlanetSurfaceGradient = getRandomGradient(angle, false, randomGaseousHSLBaseColor);
    const ringsColor = getHSLRandomVariationFromHSLInput(randomGaseousHSLBaseColor, true);
    const ringsRandomGradientColor = getRGBValueFromHSL(ringsColor.hue, ringsColor.saturation, ringsColor.luminosity).value.slice(0, -1);

    return {
        has_atmosphere: between(0, 2) >= 1 ? true : false,
        planet_surface_gradient: gaseousPlanetSurfaceGradient.value,        
        rings: {
            angle: angle,
            gradient: `radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 40%, ${ringsRandomGradientColor}, ${between(60, 95) / 100}) ${between(40, 90)}%, rgba(255, 255, 255, 0) 100%)`,
            transform: `rotatex(87deg) scale(${between(200, 300) / 100})`,
            opacity: between(10, 70) / 100
        },
        albedo : gaseousPlanetSurfaceGradient.albedo,
        angle: angle
    }
}

// Views Renderers --------------------------------------------------------------------------------

// TELLURIC -------------------------------------------------------------------
export const renderTelluricPlanetView = (telluricPlanetStyle) => {
    const planetDiv = document.createElement('div');
    planetDiv.setAttribute('class', 'planet');

    const planetSurfaceGradient = document.createElement('div');
    planetSurfaceGradient.setAttribute('id', 'planetSurfaceGradient');
    planetSurfaceGradient.setAttribute('class', 'telluric-planet-surface-gradient');
    planetSurfaceGradient.style.background = telluricPlanetStyle.planet_surface_gradient;
    planetDiv.appendChild(planetSurfaceGradient);

    const planetTexture = document.createElement('div');
    planetTexture.setAttribute('id', 'planetTexture');
    planetTexture.setAttribute('class', 'planet-texture');
    planetTexture.style.backgroundImage = 'url("../medias/images/telluric_texture.png")';
    planetTexture.style.backgroundSize = `${telluricPlanetStyle.planet_texture.background_size}%`;
    planetTexture.style.backgroundPositionX = `${telluricPlanetStyle.planet_texture.background_position_x}%`;
    planetTexture.style.backgroundPositionY = `${telluricPlanetStyle.planet_texture.background_position_y}%`;
    planetTexture.style.transform = `${telluricPlanetStyle.planet_texture.transform}`;
    planetTexture.style.opacity = telluricPlanetStyle.planet_texture.opacity;
    planetDiv.appendChild(planetTexture);

    const planetShadow = document.createElement('div');
    planetShadow.setAttribute('id', 'planetShadow');
    planetShadow.setAttribute('class', 'planet-shadow');
    planetDiv.appendChild(planetShadow);

    if (telluricPlanetStyle.has_atmosphere) {
        const planetAtmosphere = document.createElement('div');
        planetAtmosphere.setAttribute('id', 'planetAtmosphere');
        planetAtmosphere.setAttribute('class', 'planet-atmosphere');
        planetDiv.appendChild(planetAtmosphere);
    }

    return planetDiv;
}

// GASEOUS --------------------------------------------------------------------
export const renderGaseousPlanetView = (gaseousPlanetStyle) => {
    const planetDiv = document.createElement('div');
    planetDiv.setAttribute('class', 'planet');

    const planetSurfaceGradient = document.createElement('div');
    planetSurfaceGradient.setAttribute('id', 'gaseousPlanetSurfaceGradient');
    planetSurfaceGradient.setAttribute('class', 'gaseous-planet-surface-gradient');
    planetSurfaceGradient.style.background = gaseousPlanetStyle.planet_surface_gradient;
    planetDiv.appendChild(planetSurfaceGradient);

    const planetShadow = document.createElement('div');
    planetShadow.setAttribute('id', 'planetShadow');
    planetShadow.setAttribute('class', 'planet-shadow');
    planetDiv.appendChild(planetShadow);

    if (gaseousPlanetStyle.has_atmosphere) {
        const planetAtmosphere = document.createElement('div');
        planetAtmosphere.setAttribute('id', 'planetAtmosphere');
        planetAtmosphere.setAttribute('class', 'planet-atmosphere');
        planetDiv.appendChild(planetAtmosphere);
    }
    const planetRingsContainer = document.createElement('div');
    planetRingsContainer.setAttribute('id', 'planetRingsContainer');
    planetRingsContainer.setAttribute('class', 'planet-rings-container');

    const planetRings = document.createElement('div');
    planetRings.setAttribute('id', 'planetRings');
    planetRings.setAttribute('class', 'planet-rings');
    planetRings.style.background = gaseousPlanetStyle.rings.gradient;
    planetRings.style.transform = gaseousPlanetStyle.rings.transform;
    planetRings.style.opacity = gaseousPlanetStyle.rings.opacity;
    planetRingsContainer.appendChild(planetRings);
    
    planetRingsContainer.style.transform = `rotatez(${gaseousPlanetStyle.rings.angle}deg`;
    planetDiv.appendChild(planetRingsContainer);

    return planetDiv;
}