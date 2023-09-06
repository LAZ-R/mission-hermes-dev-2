
// HABITABLE ZONE CLASS -------------------------------------------------------------------
export class HabitableZone {
  constructor(starMass) {
    this.center = this.getCenter(starMass);
    this.theoricalWidth = this.getWidth(starMass);
    this.start = (this.center - this.theoricalWidth / 2) + (this.theoricalWidth / 3);
    this.end = (this.center + this.theoricalWidth / 2) + (this.theoricalWidth / 4);
  }
  
  getCenter = (starMass) => { return Math.sqrt(starMass / 1); }
  getWidth = (starMass) => { return starMass * 1.1; }
}