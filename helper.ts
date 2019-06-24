import {Config, MensaMenuEntry} from './types'
import {abortCmd, blacklistDesks} from './constants'
import {KeyboardButton, ReplyKeyboardMarkup} from 'telegram-typings';
import {
  allMensaLocations,
  Harzmensa,
  Heidemensa,
  Mensa_Burg,
  Mensa_Franckesche_Stiftungen,
  Mensa_Neuwerk,
  Mensa_Tulpe,
  MensaLocation,
  Weinbergmensa
} from './enums'
import {promises} from 'fs'

export function getMensaMenuAsMarkdown(mensaMenu: MensaMenuEntry[]): string[] {

  let mds: string[] = []

  for (let i = 0; i < mensaMenu.length; i++) {
    const entry = mensaMenu[i]

    let md = ``

    md += `**${entry.desk}**\n`
    md += `*${entry.title}*\n`

    const additionsText = trimIntermediate(entry.additionsText)
    if (additionsText !== '') {
      md += `  ${additionsText}\n`
    }

    const chooseText = trimIntermediate(entry.chooseText)
    if (chooseText !== '') {
      md += `  ${chooseText}\n`
    }

    md += `${entry.prices.join(' | ')}\n`

    //from https://stackoverflow.com/questions/38685619/how-to-send-an-embedded-image-along-with-text-in-a-message-via-telegram-bot-api/43705283
    //or https://stackoverflow.com/questions/39583130/send-an-image-link-to-telegram-without-display-image-url
    md += `[​​​​​​​​​​​](${entry.imgUrl})\n`
    // md += `[${entry.imgUrl})]\n` //not working
    // md += `\n`

    mds.push(md)

    // md += `<a href="${entry.imgUrl}">&#8205;</a>\n`
  }

  return mds
}

/**
 * trims intermediate whitespaces
 * @param text
 */
function trimIntermediate(text: string): string {
  //rege \ \
  let oldtext = text

  do {
    oldtext = text
    text = text.replace("  ", " ")

  } while (oldtext !== text)

  return text
}


export function filterMensaMenuWithBlacklist(menu: MensaMenuEntry[]): MensaMenuEntry[] {
  //if one blacklist filter matches (some) --> don't take
  return menu.filter(p => !blacklistDesks.some(black => black(p)))
}

/**
 * tries to get the mensa location from the mensa string
 * @param mensaName
 */
export function getMensaFromName(mensaName: string): MensaLocation | Error {

  if (!mensaName) return new Error(`mensaName was empty or falsy`)

  mensaName = mensaName.trim().toLowerCase()

  for (const mensaLocation of allMensaLocations) {

    if (mensaLocation.displayName === mensaName) {
      return mensaLocation
    }

  }

  return new Error(`mensa not found`)
}

export function getChoseMensaButtons(): ReplyKeyboardMarkup {

  const row1: KeyboardButton[] = [
    {
      text: Heidemensa.displayName
    },
    {
      text: Weinbergmensa.displayName
    },
    {
      text: Harzmensa.displayName
    },
  ]

  const row2: KeyboardButton[] = [
    {
      text: Mensa_Tulpe.displayName
    },
    {
      text: Mensa_Burg.displayName
    },
    {
      text: Mensa_Neuwerk.displayName
    },
  ]
  const row3: KeyboardButton[] = [
    {
      text: Mensa_Franckesche_Stiftungen.displayName
    },
    {
      text: `/${abortCmd}`
    }
  ]


  const keyboard: ReplyKeyboardMarkup = {
    keyboard: [
      row1,
      row2,
      row3
    ],
    one_time_keyboard: true
  }

  return keyboard
}


export function delay(ms: number): Promise<void> {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
