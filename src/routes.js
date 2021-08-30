const express = require('express')
const routes = express.Router()
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

routes.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
routes.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

routes.get('/room/:room', RoomController.open)
routes.post('/enter-room', RoomController.enter)
routes.post('/create-room', RoomController.create)

routes.post('/question/:room/:question/:action', QuestionController.index)
routes.post('/question/create/:room', QuestionController.create)

module.exports = routes
