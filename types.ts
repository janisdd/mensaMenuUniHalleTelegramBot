
export interface MensaDateObj {
  /**
   * 1 based
   */
  day: number
  /**
   * 1 based
   */
  month: number
  year: number
  /**
   * only use 0 because we only want one day
   */
  week: 0
}

/**
 * @deprecated only for documentation purposes
 */
export interface MensaPostObj extends MensaDateObj  {



  /**
   * this is set multiple times... e.g
   *
   * slected_locations[]: 17
   * selected_locations[]: 5
   *
   * or
   *
   * selected_locations%5B%5D=17&selected_locations%5B%5D=5
   *
   */
  "selected_locations[]": number
}

export interface MensaMenuEntry {

  /**
   * desk, ausgabe
   */
  desk: string

  title: string | null

  ingredients: string[]

  /**
   * e..g dazu/mit xxxx
   */
  additionsText: string

  /**
   * e.g. wahlbeilagen
   */
  chooseText: string

  /**
   * thumbnail url
   */
  thumbUrl: string | null

  /**
   * medium img url
   */
  imgUrl: string | null

  prices: string[]

}

export type MensaEntryFilter = (menuEntry: MensaMenuEntry) => boolean


/**
 * config for the bot
 */
export interface Config {
  /**
   * the token of the bot
   */
  botToken: string
  /**
   * this is the url of the mensa page
   */
  webUrl: string
  /**
   * this is the direct inline iframe url
   */
  dataUrl: string
}
