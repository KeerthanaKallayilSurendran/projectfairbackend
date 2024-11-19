// steps to define express server
// adds .env file contents into process.env
require('dotenv').config()
const express = require('express')
// to share data to another app
const cors = require('cors')
// just call the express variable to create a server
const pfServer = express()
// router file
const router = require('./routes/router')
// import dbconnection file
require('./database/dbConnection')

// use cors in our server app
pfServer.use(cors())

// parse json data from client request json() is predefined method in express
pfServer.use(express.json())

// use router after using cors and parse otherwise the route is not woring
pfServer.use(router)

// uploads folder use as public to get the images in the browser
pfServer.use('/uploads', express.static('./uploads'))

// create port for server application
const PORT = 3000 || process.env.PORT

// run server app in secified port
pfServer.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT} and waiting for client request`);
})

pfServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style='color:Green'>Server Started and waiting for client request</h1>`)
})

