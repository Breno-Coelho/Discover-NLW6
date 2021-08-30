const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`
    Create table rooms (
      id integer primary key,
      pass TEXT
    )`)

    await db.exec(`
    create table questions(
      id integer primary key autoincrement,
      title text,
      read int,
      room int
    )`)

    await db.close()
  }
}

initDb.init()
