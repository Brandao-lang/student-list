const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'ff9a15375c654859b093a0682d3ce6d3',
    captureUncaught: true,
    captureUnhandleRejections: true
})

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served succesfully')
})

const port = process.env.PORT || 4444


app.listen(port, () => {
    console.log(`running on port: ${port}`)
})