const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId = ''
    let roomExistId = true

    while (roomExistId) {
      for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }

      //await db.all(`Select r.id from rooms r where r.id = ${roomId}`)

      const roomsId = await db.all(`Select id from rooms`)

      roomExistId = roomsId.some(roomExist => roomExist === roomId)

      if (!roomExistId) {
        await db.run(
          `insert into rooms (id, pass) values(${Number(roomId)}, ${pass}) `
        )
      }
    }
    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const roomId = req.params.room
    const db = await Database()
    let isQuestions = true

    const questions = await db.all(
      `select * from questions where room = ${roomId} and read = 0`
    )

    const questionsRead = await db.all(
      `select * from questions where room = ${roomId} and read = 1`
    )

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isQuestions = false
      }
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isQuestions: isQuestions
    })
  },

  enter(req, res) {
    const roomId = req.body.roomId

    res.redirect(`/room/${roomId}`)
  }
}
