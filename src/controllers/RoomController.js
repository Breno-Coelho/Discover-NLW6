const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    let roomId = ''
    const pass = req.body.password

    for (var i = 0; i < 6; i++) {
      roomId += Math.floor(Math.random() * 10).toString()
    }

    await db.run(
      `insert into rooms (id, pass) values(${Number(roomId)}, ${pass}) `
    )

    await db.close()

    res.redirect(`/room/${roomId}`)
  }
}
