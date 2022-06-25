const express = require('express')
const path = require('path')
const app = express()
const schedule = require('node-schedule');
const polling = require('./Firebase/UpdateUsers');

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

const rule = new schedule.RecurrenceRule();
rule.hour = 1;
rule.minute = 45;
rule.tz = "America/New_York";

schedule.scheduleJob(rule, async () => {
  console.log("Polling");
  await polling();
})

init();
module.exports = app
