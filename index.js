
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const router = require('./routes/router')
require('./dbConnections/connection')

const tmServer = express()

tmServer.use(cors())
tmServer.use(express.json())
tmServer.use(router)

const PORT = 3000 || process.env.PORT
tmServer.listen(PORT, () => {
    console.log('Server running');
})

// tmServer.get('/', (req, res) => {
//     res.status(200).send("success")
// })
