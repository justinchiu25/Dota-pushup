const express = require('express')
const path = require('path')
const app = express()

// logging middleware

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '../../public/index.html')))
app.use('/api', require('./api')) // include our routes!


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
const PORT = 4000;
const init = () => {
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))
}

init();
module.exports = app
