// export enum MensaUniHalleLocations {
//   Harzmensa = 3,
//   // Mensa_Bernburg = 8,
//   // Mensa_Dessau = 13,
//   // Mensa_Köthen = 7,
//   Mensa_Neuwerk = 9,
//   Weinbergmensa = 5,
//
//   Heidemensa = 17,
//   Mensa_Burg = 12,
//   Mensa_Franckesche_Stiftungen = 14,
//   // Mensa_Merseburg = 16,
//   /**
//    * (Mittagessen: grün, Abendessen: rot)
//    */
//   Mensa_Tulpe = 10
// }


export interface MensaLocation {
  id: number
  /**
   * internal name
   */
  name: string
  /**
   * name for buttons
   */
  displayName: string
  /**
   * name for output
   */
  prettyName: string
}

export const Harzmensa: MensaLocation = {
  id: 3,
  name: 'Harzmensa',
  displayName: 'harz',
  prettyName: 'Harzmensa',
}

export const Mensa_Neuwerk: MensaLocation = {
  id: 9,
  name: 'Mensa_Neuwerk',
  displayName: 'neuwerk',
  prettyName: 'Mensa Neuwerk',
}

export const Weinbergmensa: MensaLocation = {
  id: 5,
  name: 'Weinbergmensa',
  displayName: 'weinberg',
  prettyName: 'Weinbergmensa',
}

export const Heidemensa: MensaLocation = {
  id: 17,
  name: 'Heidemensa',
  displayName: 'heide',
  prettyName: 'Heidemensa',
}

export const Mensa_Burg: MensaLocation = {
  id: 12,
  name: 'Mensa_Burg',
  displayName: 'burg',
  prettyName: 'Mensa Burg',
}

export const Mensa_Franckesche_Stiftungen: MensaLocation = {
  id: 14,
  name: 'Mensa_Franckesche_Stiftungen',
  displayName: 'franckesche stiftungen',
  prettyName: 'Mensa Franckesche Stiftungen',
}

//Mittagessen: grün, Abendessen: rot)
export const Mensa_Tulpe: MensaLocation = {
  id: 10,
  name: 'Mensa_Tulpe',
  displayName: 'tulpe',
  prettyName: 'Mensa Tulpe',
}

export const allMensaLocations: MensaLocation[] = [

  // {
  //   id: 8,
  //   name: 'Mensa_Bernburg',
  //   displayName: 'Mensa_Bernburg'
  // },
  // {
  //   id: 13,
  //   name: 'Mensa_Dessau',
  //   displayName: 'Mensa_Dessau'
  // },
  // {
  //   id: 7,
  //   name: 'Mensa_Köthen',
  //   displayName: 'Mensa_Köthen'
  // },
  Harzmensa,
  Mensa_Neuwerk,
  Weinbergmensa,
  Heidemensa,
  Mensa_Burg,
  Mensa_Franckesche_Stiftungen,
  Mensa_Tulpe
]


