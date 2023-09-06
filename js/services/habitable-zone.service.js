// HABITABLE ZONE SERVICE -------------------------------------------------------------------
export const getHabitableZoneRatio = (starHZStart, starHZEnd, planetDistanceFromStar) => {
  if (planetDistanceFromStar < starHZStart) {
    // Before HZ
    const depassement = starHZStart - planetDistanceFromStar;
    return  depassement / starHZStart;
  } else if (planetDistanceFromStar >= starHZStart && planetDistanceFromStar <= starHZEnd) {
    // indide HZ
    return 0;
  } else {
    // After HZ
    const depassement = planetDistanceFromStar - starHZEnd;
    return depassement / starHZEnd;
  }
}