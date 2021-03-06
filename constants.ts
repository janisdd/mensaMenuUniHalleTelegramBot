import { Config, MensaEntryFilter, MensaMenuEntry } from './types'
import { ContextMessageUpdate } from 'telegraf'
import * as fs from 'fs'



/**
 * reads the config in the current dir
 */
export function readConfig(): Config {

  let data: Config

  try {
    const text = fs.readFileSync('config.json', { encoding: 'utf-8' })
    data = JSON.parse(text)

    if (!data.botToken || data.botToken.length !== 45) {
      throw new Error('botToken needs to be 45 characters long')
    }

    if (!data.webUrl) {
      throw new Error('webUrl needs to be set')
    }

    // with the / we get another page....
    if (data.webUrl.endsWith('/')) {
      data.webUrl = data.webUrl.substr(0, data.webUrl.length-1)
    }

    if (!data.dataUrl) {
      throw new Error('dataUrl needs to be set')
    }

    // with the / we get another page....
    if (data.dataUrl.endsWith('/')) {
      data.dataUrl = data.dataUrl.substr(0, data.dataUrl.length-1)
    }

    // if (data.logging === undefined) {
    //   throw new Error('logging needs to be set')
    // }

  } catch (err) {
    throw err
  }


  return data
}


export const appConfig = readConfig()

export const botName = `Mensa Uni Halle Bot v1.0.1`

export const abortCmd = 'abbrechen'
export const abortText = 'Abgeborchen'

export const unexpectedFewMenuItemsCountExclusive = 4 //if we have less than this...
export const unexpectedFewMenuItems = `Es wurden weniger als ${unexpectedFewMenuItemsCountExclusive} Gerichte abgerufen... Möglicherweise konnten die Daten nicht vollständig abgerufen werden, da das Html der Mensa Seite vermutlich ungültig war. Hier ist der Link, damit du die Gerichte manuell einsehen kannst `

export const aboutText = `${botName}

Erstellt von Janis Dähne

Benutzte Frameworks/Tools: 

- telegraf.js [https://github.com/telegraf/telegraf]
- axios [https://github.com/axios/axios]
- html-entities [https://github.com/mdevils/node-html-entities]
- xmldom [https://github.com/jindw/xmldom]
- xpath [https://github.com/goto100/xpath] _changed to support only html_
- momentjs [https://github.com/moment/moment]

Repo: [https://github.com/janisdd/mensaMenuUniHalleTelegramBot]

_Daten werden von der Url_ [${appConfig.webUrl}] _bzw._ [${appConfig.dataUrl}] _bezogen_

_Hinweise_: 
- Wenn 3 oder weniger Gerichte angezeigt werden, kann es sein, dass die Daten nicht richtig abgerufen wurden. Das liegt daran, dass die Seite der Mensa manchmal kein gültiges Html ist (öffnende Tags wurden vergessen). Ist das der Fall, so wird der Link zur Seite als separate Nachricht ausgegeben.
- All Aufrufe werden u.U. geloggt (userId, Vor- und Nachname) und für /m, /m1, ... wird temporär die userId und die chatId gespeichert
`


export const helpText =
  ` --- ${botName} Usage ---
  
\`/m\` - gibt das Menü von heute zurück

\`/m1\` - gibt das Menü von morgen zurück
\`/m2\` - gibt das Menü in 2 Tagen zurück
\`/m3\` - gibt das Menü in 3 Tagen zurück

\`/${abortCmd}\` - bricht einen der \`/m\` Befehle ab

\`/help\` - zeigt diese Hilfe an


_Daten werden von der Url_ [${appConfig.webUrl}] _bzw._ [${appConfig.dataUrl}] _bezogen_

_Hinweise_:
- Wenn 3 oder weniger Gerichte angezeigt werden, kann es sein, dass die Daten nicht richtig abgerufen wurden. Das liegt daran, dass die Seite der Mensa manchmal kein gültiges Html ist (öffnende Tags wurden vergessen). Ist das der Fall, so wird der Link zur Seite als separate Nachricht ausgegeben.
- All Aufrufe werden u.U. geloggt (userId, Vor- und Nachname) und für /m, /m1, ... wird temporär die userId und die chatId gespeichert

Erstellt von Janis Dähne
`


// @ts-ignore
export const startHandlermarkdown = (ctx: ContextMessageUpdate) => `Hi ${ctx.chat.first_name} ${ctx.chat.last_name}, das ist der **Mensa Uni Halle** Bot

Hier ist die Hilfe:

${helpText}
`


/**
 * mensa menu entries with desk property equal to this will be ignored!!
 * these are always static...
 * @see MensaMenuEntry.desk
 *
 * we don't use xpath here because only some might occur e.g. only salate depending on the chosen mensa
 * we could inject this array in xpath but it'S easier to just throw the obj with these desk props away...
 */
export const blacklistDesks: MensaEntryFilter[] = [
  (entry) => entry.desk.toLowerCase().includes('desserts'),
  (entry) => entry.desk.toLowerCase().includes('salate')
]

