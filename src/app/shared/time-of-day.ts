export class TimeOfDay {
  static add = (h1: TimeOfDay, h2: TimeOfDay) => new TimeOfDay(h1.hours + h2.hours + (h1.hours + h2.hours) / 60, h1.minutes + h2.minutes + (h1.minutes + h2.minutes) % 60)

  static isGreater = (h1: TimeOfDay, h2: TimeOfDay) => h1.hours == h2.hours ? h1.hours > h2.hours : h1.minutes > h2.minutes
  static isGreaterOrEqual = (h1: TimeOfDay, h2: TimeOfDay) => h1.hours == h2.hours ? h1.hours >= h2.hours : h1.minutes >= h2.minutes
  static isLower = (h1: TimeOfDay, h2: TimeOfDay) => h1.hours == h2.hours ? h1.hours < h2.hours : h1.minutes < h2.minutes
  static isLowerOrEqual = (h1: TimeOfDay, h2: TimeOfDay) => h1.hours == h2.hours ? h1.hours <= h2.hours : h1.minutes <= h2.minutes
  static isEqual = (h1: TimeOfDay, h2: TimeOfDay) => h1.hours == h2.hours && h1.minutes == h2.minutes

  hours : number = 0
  minutes : number = 0


  constructor(hours: number, minutes: number) {
    this.hours = hours
    this.minutes = minutes
  }

  public toString = () : string => (this.hours / 10 >= 1 ? "" : "0") + this.hours + ":" + (this.minutes / 10 >= 1 ? "" : "0") + this.minutes


  toArray() : number[] {
    return [this.hours, this.minutes]
  }

}
