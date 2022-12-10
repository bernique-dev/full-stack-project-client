export class Translation {
  translatedName: string = ""
  translatedDescription: string = ""

  constructor(translatedName: string, translatedDescription: string) {
    this.translatedName = translatedName
    this.translatedDescription = translatedDescription
  }

  isSendable() : boolean {
    return this.translatedName.length > 0
  }
}

