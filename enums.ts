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
  buttonName: string
  /**
   * name for output
   */
  prettyName: string
}

export const Harzmensa: MensaLocation = {
  id: 3,
  name: 'Harzmensa',
  buttonName: 'harz',
  prettyName: 'Harzmensa',
}

export const Mensa_Neuwerk: MensaLocation = {
  id: 9,
  name: 'Mensa_Neuwerk',
  buttonName: 'neuwerk',
  prettyName: 'Mensa Neuwerk',
}

export const Weinbergmensa: MensaLocation = {
  id: 5,
  name: 'Weinbergmensa',
  buttonName: 'weinberg',
  prettyName: 'Weinbergmensa',
}

export const Heidemensa: MensaLocation = {
  id: 17,
  name: 'Heidemensa',
  buttonName: 'heide',
  prettyName: 'Heidemensa',
}

export const Mensa_Burg: MensaLocation = {
  id: 12,
  name: 'Mensa_Burg',
  buttonName: 'burg',
  prettyName: 'Mensa Burg',
}

export const Mensa_Franckesche_Stiftungen: MensaLocation = {
  id: 14,
  name: 'Mensa_Franckesche_Stiftungen',
  buttonName: 'franckesche stiftungen',
  prettyName: 'Mensa Franckesche Stiftungen',
}

//Mittagessen: grün, Abendessen: rot)
export const Mensa_Tulpe: MensaLocation = {
  id: 10,
  name: 'Mensa_Tulpe',
  buttonName: 'tulpe',
  prettyName: 'Mensa Tulpe',
}

export const allMensaLocations: MensaLocation[] = [

  // {
  //   id: 8,
  //   name:'Mensa_Bernburg',
  //   displayName:'Mensa_Bernburg'
  // },
  // {
  //   id: 13,
  //   name:'Mensa_Dessau',
  //   displayName:'Mensa_Dessau'
  // },
  // {
  //   id: 7,
  //   name:'Mensa_Köthen',
  //   displayName:'Mensa_Köthen'
  // },
  Harzmensa,
  Mensa_Neuwerk,
  Weinbergmensa,
  Heidemensa,
  Mensa_Burg,
  Mensa_Franckesche_Stiftungen,
  Mensa_Tulpe
]


export interface Zusatz {
  id: string
  text: string
}

export const zusatz_mit_Farbstoff: Zusatz = {
  id: '1',
  text: 'mit Farbstoff',
}
export const zusatz_mit_Konservierungsstoff: Zusatz = {
  id: '2',
  text: 'mit Konservierungsstoff',
}
export const zusatz_mit_Antioxidationsmittel: Zusatz = {
  id: '3',
  text: 'mit Antioxidationsmittel',
}
export const zusatz_mit_Geschmacksverstärker: Zusatz = {
  id: '4',
  text: 'mit Geschmacksverstärker',
}
export const zusatz_geschwefelt: Zusatz = {
  id: '5',
  text: 'geschwefelt',
}
export const zusatz_geschwärzt: Zusatz = {
  id: '6',
  text: 'geschwärzt',
}
export const zusatz_mit_Phosphat: Zusatz = {
  id: '7',
  text: 'mit Phosphat',
}
export const zusatz_gewachst: Zusatz = {
  id: '8',
  text: 'gewachst',
}
export const zusatz_mit_Azofarbstoff: Zusatz = {
  id: '9',
  text: 'mit Azofarbstoff(en)',
}
export const zusatz_chininhaltig: Zusatz = {
  id: '10',
  text: 'chininhaltig',
}
export const zusatz_koffeinhaltig: Zusatz = {
  id: '11',
  text: 'koffeinhaltig',
}
export const zusatz_alkoholhaltig: Zusatz = {
  id: '12',
  text: 'alkoholhaltig',
}
export const zusatz_mit_Süßungsmittel: Zusatz = {
  id: '15',
  text: 'mit Süßungsmittel(n)',
}
export const zusatz_enthält_eine_Phenylalaninquelle: Zusatz = {
  id: '16',
  text: 'enthält eine Phenylalaninquelle',
}
export const zusatz_kakaohaltige_Fettglasur: Zusatz = {
  id: '60',
  text: 'kakaohaltige Fettglasur',
}
export const zusatz_aus_Fleischstücke_zusammengefügt: Zusatz = {
  id: '61',
  text: 'aus Fleischstücken zusammengefügt',
}
export const zusatz_aus_Fischstücke_zusammengefügt: Zusatz = {
  id: '62',
  text: 'aus Fischstücken zusammengefügt',
}
export const zusatz_mit_Gelatine: Zusatz = {
  id: '65',
  text: 'mit Gelatine',
}
export const zusatz_mit_mikrobiellem_Lab: Zusatz = {
  id: '66',
  text: 'mit mikrobiellem Lab',
}
export const zusatz_mit_tierischem_Lab: Zusatz = {
  id: '67',
  text: 'mit tierischem Lab',
}
export const zusatz_mit_Karmin_E_120: Zusatz = {
  id: '68',
  text: 'mit Karmin E120',
}
export const zusatz_enthält_glutenhaltige_Getreide: Zusatz = {
  id: 'A',
  text: 'enthält glutenhaltige Getreide',
}
export const zusatz_Weizen: Zusatz = {
  id: 'A1',
  text: 'Weizen',
}
export const zusatz_Roggen: Zusatz = {
  id: 'A2',
  text: 'Roggen',
}
export const zusatz_Hafer: Zusatz = {
  id: 'A3',
  text: 'Hafer',
}
export const zusatz_Gerste: Zusatz = {
  id: 'A4',
  text: 'Gerste',
}
export const zusatz_Dinkel: Zusatz = {
  id: 'A5',
  text: 'Dinkel',
}
export const zusatz_enthält_Krebstiere: Zusatz = {
  id: 'B',
  text: 'enthält Krebstiere',
}
export const zusatz_enthält_Ei: Zusatz = {
  id: 'C',
  text: 'enthält Ei',
}
export const zusatz_enthält_Erdnüsse: Zusatz = {
  id: 'D',
  text: 'enthält Erdnüsse',
}
export const zusatz_enthält_Soja: Zusatz = {
  id: 'E',
  text: 'enthält Soja',
}
export const zusatz_enthält_Milch: Zusatz = {
  id: 'F',
  text: 'enthält Milch (Laktose)',
}
export const zusatz_enthhält_Schalenfrüchte: Zusatz = {
  id: 'G',
  text: 'enthält Schalenfrüchte',
}
export const zusatz_Haselnuss: Zusatz = {
  id: 'G1',
  text: 'Haselnuss',
}
export const zusatz_Mandeln: Zusatz = {
  id: 'G2',
  text: 'Mandeln',
}
export const zusatz_Wallnuss: Zusatz = {
  id: 'G3',
  text: 'Wallnuss',
}
export const zusatz_Cashewkerne: Zusatz = {
  id: 'G4',
  text: 'Cashewkerne',
}
export const zusatz_Pecannüsse: Zusatz = {
  id: 'G5',
  text: 'Pecanüsse',
}
export const zusatz_Pistazien: Zusatz = {
  id: 'G6',
  text: 'Pistazien',
}
export const zusatz_Macademianuss: Zusatz = {
  id: 'G7',
  text: 'Macademianuss',
}
export const zusatz_enthält_Sellerie: Zusatz = {
  id: 'H',
  text: 'enthält Sellerie',
}
export const zusatz_enthält_Senf: Zusatz = {
  id: 'I',
  text: 'enthält Senf',
}
export const zusatz_enthält_Sesam: Zusatz = {
  id: 'J',
  text: 'enthält Sesam',
}
export const zusatz_enthält_SO2_Sulfit: Zusatz = {
  id: 'K',
  text: 'enthält SO2 / Sulfit',
}
export const zusatz_enthält_Lupine: Zusatz = {
  id: 'L',
  text: 'enthält Lupine',
}
export const zusatz_enthält_Weichtiere: Zusatz = {
  id: 'M',
  text: 'enthält Weichtiere',
}
export const zusatz_enthält_Fisch: Zusatz = {
  id: 'N',
  text: 'enthält Fisch',
}
export const zusatz_Schweinefleisch: Zusatz = {
  id: '45',
  text: 'Schweinefleisch',
}
export const zusatz_Rindfleisch: Zusatz = {
  id: '46',
  text: 'Rindfleisch',
}
export const zusatz_Geflügel: Zusatz = {
  id: '47',
  text: 'Geflügel',
}
export const zusatz_Fisch: Zusatz = {
  id: '48',
  text: 'Fisch',
}
export const zusatz_Wild: Zusatz = {
  id: '49',
  text: 'Wild',
}
export const zusatz_Fleischlos: Zusatz = {
  id: '50',
  text: 'Fleischlos',
}
export const zusatz_Vegetarisch: Zusatz = {
  id: '51',
  text: 'Vegetarisch',
}
export const zusatz_Vegan: Zusatz = {
  id: '52',
  text: 'Vegan',
}
export const zusatz_Sprintmenü: Zusatz = {
  id: '53',
  text: 'Sprintmenü',
}
export const zusatz_mensaVital: Zusatz = {
  id: '54',
  text: 'mensaVital',
}
export const zusatz_BIO_Essen: Zusatz = {
  id: '55',
  text: 'BIO-Essen',
}
export const zusatz_Lamm: Zusatz = {
  id: '56',
  text: 'Lamm',
}


export const allZusätze = [
  zusatz_mit_Farbstoff,
  zusatz_mit_Konservierungsstoff,
  zusatz_mit_Antioxidationsmittel,
  zusatz_mit_Geschmacksverstärker,
  zusatz_geschwefelt,
  zusatz_geschwärzt,
  zusatz_mit_Phosphat,
  zusatz_gewachst,
  zusatz_mit_Azofarbstoff,
  zusatz_chininhaltig,
  zusatz_koffeinhaltig,
  zusatz_alkoholhaltig,
  zusatz_mit_Süßungsmittel,
  zusatz_enthält_eine_Phenylalaninquelle,
  zusatz_kakaohaltige_Fettglasur,
  zusatz_aus_Fleischstücke_zusammengefügt,
  zusatz_aus_Fischstücke_zusammengefügt,
  zusatz_mit_Gelatine,
  zusatz_mit_mikrobiellem_Lab,
  zusatz_mit_tierischem_Lab,
  zusatz_mit_Karmin_E_120,
  zusatz_enthält_glutenhaltige_Getreide,
  zusatz_Weizen,
  zusatz_Roggen,
  zusatz_Hafer,
  zusatz_Gerste,
  zusatz_Dinkel,
  zusatz_enthält_Krebstiere,
  zusatz_enthält_Ei,
  zusatz_enthält_Erdnüsse,
  zusatz_enthält_Soja,
  zusatz_enthält_Milch,
  zusatz_enthhält_Schalenfrüchte,
  zusatz_Haselnuss,
  zusatz_Mandeln,
  zusatz_Wallnuss,
  zusatz_Cashewkerne,
  zusatz_Pecannüsse,
  zusatz_Pistazien,
  zusatz_Macademianuss,
  zusatz_enthält_Sellerie,
  zusatz_enthält_Senf,
  zusatz_enthält_Sesam,
  zusatz_enthält_SO2_Sulfit,
  zusatz_enthält_Lupine,
  zusatz_enthält_Weichtiere,
  zusatz_enthält_Fisch,
  zusatz_Schweinefleisch,
  zusatz_Rindfleisch,
  zusatz_Geflügel,
  zusatz_Fisch,
  zusatz_Wild,
  zusatz_Fleischlos,
  zusatz_Vegetarisch,
  zusatz_Vegan,
  zusatz_Sprintmenü,
  zusatz_mensaVital,
  zusatz_BIO_Essen,
  zusatz_Lamm,
]


allZusätze.forEach(p => {
  if (p.text.includes('_')) {
    console.log(`[ERROR] zusatz text cannot contain markdown entity character: ${p.id} - ${p.text}`)
  }
})


