import {abortCmd, abortText, aboutText, appConfig, helpText, startHandlermarkdown, unexpectedFewMenuItems, unexpectedFewMenuItemsCountExclusive} from './constants'
import {
  delay,
  filterMensaMenuWithBlacklist,
  getChoseMensaButtons, getDatePlusDaysToAddString,
  getMensaFromButtonName,
  getMensaMenuAsMarkdown, logIf,
} from './helper'
import {getMensaMenuHtml, _getMensaMenuFromHtml, getMensaPostUrl} from './mensaDataHelper'
import {InMemorySessionStorage} from './inMemorySessionStorage'
import { Heidemensa } from './enums';
import moment = require('moment');


const Telegraf = require('telegraf') as import("telegraf").TelegrafConstructor

const bot = new Telegraf(appConfig.botToken)


bot.start((ctx) => {

  if (!ctx.chat) return

  ctx.replyWithMarkdown(startHandlermarkdown(ctx))
})

bot.help((x) => {

  logIf(x, `help`)

  x.replyWithMarkdown(helpText, {
    disable_web_page_preview: true
  })
})

export interface MensaCommand {
  cmd: string
  daysToAdd: number
}

const commands: MensaCommand[] = [
  {
    cmd: 'm',
    daysToAdd: 0
  },
  {
    cmd: 'm1',
    daysToAdd: 1
  },
  {
    cmd: 'm2',
    daysToAdd: 2
  },
  {
    cmd: 'm3',
    daysToAdd: 3
  }
]

for (let i = 0; i < commands.length; i++) {
  const command = commands[i]

  bot.command(command.cmd, async (x) => {

    InMemorySessionStorage.putDaysToAdd(x, command.daysToAdd)

    const daysToAddString = command.daysToAdd === 0
                            ? ' heute'
                            : command.daysToAdd === 1
                              ? ` morgen`
                              : ` in ${command.daysToAdd} Tagen`

    logIf(x, `m${command.daysToAdd}`)

    x.reply(`Mensa wählen - ${daysToAddString} (${getDatePlusDaysToAddString(command.daysToAdd)})`, {
      reply_markup: getChoseMensaButtons(),
    })
  })
}

//abort command ... can be used after /m2 to reset the saved daysToAdd
bot.command(abortCmd, (x) => {

  InMemorySessionStorage.clearDaysToAdd(x)

  if (!abortText) return

  logIf(x, abortCmd)

  x.reply(abortText, {
    reply_markup: {
      remove_keyboard: true,
    }
  })

})


//catch all messages... we need daysToAdd and message must be a valid mensa name then we get mensa menu
//  else we just pass through the message (to next)
bot.on('message', async (x, next) => {

  if (!x.message || !x.message.text) {

    if (next) next()

    return
  }


  const mensa = getMensaFromButtonName(x.message.text)

  if (!(mensa instanceof Error)) {

    const daysToAdd = InMemorySessionStorage.getDaysToAdd(x)

    //if daysToAdd is null then this is not a proper command...pass to next

    if (daysToAdd !== null) {

      InMemorySessionStorage.clearDaysToAdd(x)

      let menu = await getMensaMenuHtml(mensa.buttonName, daysToAdd.toString())

      if (menu instanceof Error) {
        x.reply(`Error: ${menu.message}`, {
          reply_markup: {
            remove_keyboard: true
          }
        })
        return
      }

      menu = filterMensaMenuWithBlacklist(menu)
      const markdownMenus = getMensaMenuAsMarkdown(menu)

      if (x.chat) {

        const daysToAddString = daysToAdd === 0
                                ? ' heute'
                                : daysToAdd === 1
                                  ? ` morgen`
                                  : ` in ${daysToAdd} Tagen`

        await x.telegram.sendMessage(x.chat.id,
                                     `${mensa.prettyName} - Menü _${daysToAddString}_ (${getDatePlusDaysToAddString(daysToAdd)})`, {
                                       // parse_mode: 'HTML',
                                       parse_mode: 'Markdown',
                                       disable_web_page_preview: true,
                                       reply_markup: {
                                         remove_keyboard: true
                                       }
                                     }
        )

        for (const markdownMenu of markdownMenus) {

          //sometimes not all imgs are loaded... maybe delay helps?
          await delay(200)

          await x.telegram.sendMessage(x.chat.id, markdownMenu, {
            // parse_mode: 'HTML',
            parse_mode: 'Markdown',
            disable_web_page_preview: false,
            disable_notification: true
          })
        }

        if (markdownMenus.length < unexpectedFewMenuItemsCountExclusive) {
          //probably there was some issue with the html (missing tags) thus the xpath returned unepected results

          let mensaDirectLink = getMensaPostUrl(mensa.buttonName, daysToAdd.toString())
          let replyText = unexpectedFewMenuItems

          if (mensaDirectLink instanceof Error) {
            console.warn(`could not get mensa direct link with params: ${mensa.name}, date: ${daysToAdd.toString()}, today: ${moment().format()}`)

            replyText += `${appConfig.dataUrl} (konnte den direkten Link nicht erstellen, daher der allgemeine Link)`
          }
          else {
            replyText +=  `${appConfig.dataUrl}?${mensaDirectLink}`
          }

          await x.telegram.sendMessage(x.chat.id, replyText, {
            disable_notification: false
          })

        }

      }
    }

  }

  //call next method in chain if any e.g. on /abort next could be bot.command("abort" ...)
  if (next) next()
})

bot.command('about', (x) => {

  logIf(x, 'about')

  x.replyWithMarkdown(aboutText, {
    disable_web_page_preview: true
  })
})

bot.command('chatid', (x) => {
  if (!x.chat) return
  x.reply(`chatId: ${x.chat.id}`)
})

// bot.command('test', (x) => {
  
//   let mensaDirectLink = getMensaPostUrl(Heidemensa.buttonName, "1")
//   let replyText = unexpectedFewMenuItems + `${appConfig.dataUrl}${mensaDirectLink}`
//   x.reply(replyText)
// })

bot.launch()
console.log('--- mensa uni halle telegram bot started --- ')
console.log('with config (cleaned urls): ')
console.log(JSON.stringify(appConfig, ((key, value) => key === 'botToken' ? '[hidden]' : value), '\t'))


// async function main () {
  // const mensa = Heidemensa
  // let menu = await getMensaMenuHtml(mensa.displayName, `0`)

  // if (menu instanceof Error) return

  // menu = filterMensaMenuWithBlacklist(menu)
  // const markdownMenus = getMensaMenuAsMarkdown(menu)

// }

// main()


