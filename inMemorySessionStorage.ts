import {ContextMessageUpdate} from 'telegraf'

export interface InMemorySessionStorageEntry {

  /**
   * days to add when getting mensa menu
   */
  daysToAdd: number | null
}


//see https://github.com/telegraf/telegraf/blob/develop/session.js
export interface InMemorySessionStorageMap {

  [userIdAndChatId: string]: InMemorySessionStorageEntry

}


export class InMemorySessionStorage {
  private constructor() {
  }


  static storage: InMemorySessionStorageMap = {}


  public static clearAll() {
    InMemorySessionStorage.storage = {}
  }


  private static ensureEntry(ctx: ContextMessageUpdate): InMemorySessionStorageEntry | null {

    if (!(ctx.from && ctx.chat)) return null

    let entry = InMemorySessionStorage.storage[`${ctx.from.id}:${ctx.chat.id}`]

    if (entry) return entry

    entry = {
      daysToAdd: null
    }

    InMemorySessionStorage.storage[`${ctx.from.id}:${ctx.chat.id}`] = entry

    //default values
    return entry
  }

  public static clearDaysToAdd(ctx: ContextMessageUpdate): boolean {

    if (!(ctx.from && ctx.chat)) return false

    const entry = InMemorySessionStorage.storage[`${ctx.from.id}:${ctx.chat.id}`]

    if (!entry) return true

    delete InMemorySessionStorage.storage[`${ctx.from.id}:${ctx.chat.id}`]

    return true
  }

  public static putDaysToAdd(ctx: ContextMessageUpdate, daysToAdd: number): boolean {

    if (!(ctx.from && ctx.chat)) {
      return false
    }

    const entry = InMemorySessionStorage.ensureEntry(ctx)

    if (!entry) return false

    entry.daysToAdd = daysToAdd

    return true
  }


  public static getDaysToAdd(ctx: ContextMessageUpdate): number | null {

    const entry = InMemorySessionStorage.ensureEntry(ctx)

    if (!entry) return null

    return entry.daysToAdd
  }


}
