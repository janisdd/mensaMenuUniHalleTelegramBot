import {MensaDateObj, MensaMenuEntry} from './types'
import axios, {AxiosRequestConfig} from 'axios'
import xmldom from 'xmldom'
import xpath from 'xpath'
import {getMensaFromName} from './helper'
import {allMensaLocations} from './enums'
import {appConfig} from './constants'
import moment = require('moment')

const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities();

export async function getMensaMenuHtml(mensa: string, dateString?: string): Promise<MensaMenuEntry[] | Error> {

  mensa = mensa.toLowerCase()

  const mensaLocation = allMensaLocations.find(p => p.displayName.toLowerCase() === mensa)

  if (!mensaLocation) {
    return new Error('mensa not found')
  }

  const urlData = getMensaPostUrl(mensa, dateString)

  if (urlData instanceof Error) return urlData

  const reqConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    responseType: 'arraybuffer' //see https://github.com/axios/axios/issues/332
  }


  const res = await axios.post(appConfig.dataUrl, urlData, reqConfig)

  if (res.status !== 200) {
    return new Error('mensa http return code was != 200')
  }


  const htmlString = entities.decode(res.data.toString('latin1'))

  let document: Document //= res.data as any as Document

  let mensaMenu: MensaMenuEntry[] = []

  try {

    document = new xmldom.DOMParser({
                                      errorHandler: (level, msg) => {
                                      },
                                      locator: {}
                                    }).parseFromString(htmlString, 'text/html')

    const numTr = xpath.evaluate("count(//table[@class='speiseplan']//tr)", document, null,
                                 xpath.XPathResult.NUMBER_TYPE,
                                 null
    ).numberValue

    if (numTr === 4) {
      //empty menu
      return []
    }


    const cells = xpath.evaluate("//table[@class='speiseplan']//tr[position()>3]//td[@class='cell'][position()>1]",
                                 document, null, xpath.XPathResult.ANY_TYPE, null
    )

    let node: Node

    let currentMenuEntry: MensaMenuEntry | null = emptyMensaMenyEntry()

    let colIndex = 0

    while (!!(node = cells.iterateNext())) { //xpath gives us undefined instead of null (browser gives null)

      if (colIndex === 0) {
        //first cell
        const desk = xpath.evaluate(".//span[1]/text()", node, null, xpath.XPathResult.STRING_TYPE, null).stringValue
        currentMenuEntry.desk = desk.trim()

        const title = xpath.evaluate(".//span[2]/text()", node, null, xpath.XPathResult.STRING_TYPE, null).stringValue
        currentMenuEntry.title = title.trim()

        const additions = xpath.evaluate(".//span[last()-1]/text()", node, null, xpath.XPathResult.STRING_TYPE,
                                         null
        ).stringValue
        currentMenuEntry.additionsText = additions.trim()

        const choose = xpath.evaluate(".//span[last()-0]/text()", node, null, xpath.XPathResult.STRING_TYPE,
                                      null
        ).stringValue
        currentMenuEntry.chooseText = choose.trim()

        const ingredientsIter = xpath.evaluate(".//span[position()>2 and position()<last()-1]/text()", node, null,
                                               xpath.XPathResult.ANY_TYPE, null
        )

        let valNode: Node

        while (!!(valNode = ingredientsIter.iterateNext())) {

          if (valNode.nodeValue === null) continue

          currentMenuEntry.ingredients.push(valNode.nodeValue)
        }

      } else if (colIndex === 1) {

        //second cell (img)

        const thumbUrl = xpath.evaluate("./img/@src", node, null, xpath.XPathResult.STRING_TYPE, null).stringValue
        currentMenuEntry.thumbUrl = thumbUrl
        currentMenuEntry.imgUrl = thumbUrl.replace('thumb', 'medium')


      } else if (colIndex === 2 || colIndex === 3 || colIndex === 4) {

        const priceString = xpath.evaluate("./text()", node, null, xpath.XPathResult.STRING_TYPE, null).stringValue
        currentMenuEntry.prices.push(priceString)

      }

      if (colIndex === 4) {
        mensaMenu.push(currentMenuEntry)
        currentMenuEntry = emptyMensaMenyEntry()
        colIndex = -1
      }

      colIndex++
    }


  } catch (err) {
    return err
  }

  return mensaMenu
}

function emptyMensaMenyEntry(): MensaMenuEntry {
  return {
    additionsText: '',
    desk: '',
    thumbUrl: null,
    imgUrl: null,
    ingredients: [],
    prices: [],
    title: null,
    chooseText: ''
  }
}


/**
 * gets the mensa post url
 * @param mensa
 * @param dateString
 */
function getMensaPostUrl(mensa: string, dateString?: string): string | Error {

  const location = getMensaFromName(mensa)

  if (location instanceof Error) return location

  const dataObj = getPostDateString(dateString)

  const url = jsonToUrl(dataObj)

  const locations = `${encodeURIComponent('selected_locations[]')}=${encodeURIComponent(location.id.toString())}`

  return `${url}&${locations}`
}

/**
 * converts the json to application/x-www-form-urlencoded string
 * @param json
 */
function jsonToUrl(json: any): string {

  const keys = Object.keys(json)
  let url = ''

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    const val = json[key]

    if (i != 0) {
      url += `&`
    }

    url += `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
  }

  return url
}


/**
 * returns the date obj with the relative date applied (defaults to 0)
 * @param date the relative date to add
 */
function getPostDateString(date?: string): MensaDateObj {

  const daysToAdd = processDateString(date)

  const today = moment()

  // const year = today.getFullYear()
  // const day = today.getDate()
  // const month = today.getMonth() + 1

  today.add(daysToAdd, 'day')


  return {
    day: today.date(),
    week: 0,
    year: today.year(),
    month: today.month()+1,
  }
}

/**
 * processes the date string and returns the relative days to add
 * @param dateString
 */
function processDateString(dateString?: string): number {
  if (dateString === undefined) return 0

  dateString = dateString.toLowerCase()

  if (dateString === 'now' || dateString === 'today' || dateString === '0' || dateString === "'+0") return 0


  if (dateString === 'tomorrow' || dateString === '+1' || dateString === '1') return 1

  if (dateString === '+2' || dateString === '2') return 2

  if (dateString === '+3' || dateString === '3') return 3

  // if (dateString === '+4' || dateString === '4') return 4
  //
  // if (dateString === '+5' || dateString === '5') return 5

  return 0
}
