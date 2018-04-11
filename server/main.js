const express = require('express')
const userRoute = require('./routes/user')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const mongoose = require('./db/connect')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

userRoute(app)

app.listen(3000)
