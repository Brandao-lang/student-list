const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'ff9a15375c654859b093a0682d3ce6d3',
    captureUncaught: true,
    captureUnhandleRejections: true
})

const app = express()
app.use(express.json())
let students = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served succesfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex((studentName) => {
        studentName === name
    })

    if (index === -1 && name !== '') {
        students.push(name)
        rollbar.log('student added successfully', {author: 'Elijah', type: 'manual'})
        res.status(200).send(students)
    } else if (name === '') {
        rollbar.error(`no name given`)
        res.status(400).send('must provide a name')
    } else {
        rollbar.error('student already exists')
        res.status(400).send('that student already exists')
    } 

    // students.push(name)
    // rollbar.log('student added successfully', {author: 'Elijah', type: 'manual'})
    // res.status(200).send(students)
})

const port = process.env.PORT || 4444

app.use(rollbar.errorHandler())


app.listen(port, () => {
    console.log(`running on port: ${port}`)
})