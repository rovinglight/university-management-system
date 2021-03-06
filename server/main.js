const express = require('express')
const userRoute = require('./routes/user')
const sgroupRoute = require('./routes/sgroup')
const competitionRoute = require('./routes/competition')
const schemaRoute = require('./routes/schema')
const approvalRoute =  require('./routes/approval')
const questionRoute = require('./routes/question')
const projectRoute = require('./routes/project')
const userController = require('./controllers/userController')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const mongoose = require('./db/connect')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(userController.attachUserInfo)

userRoute(app)
sgroupRoute(app)
competitionRoute(app)
schemaRoute(app)
approvalRoute(app)
questionRoute(app)
projectRoute(app)

app.listen(3000)

app.mongoose = mongoose

module.exports = app
