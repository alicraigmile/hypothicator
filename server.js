const express = require('express')
const package = require('./package')
const port = process.env.PORT || 5000
const app = express()

app.get('/status', (req, res) => res.json({version: package.version}))
app.use(express.static('public'))
app.use('/js/jquery', express.static('node_modules/jquery/dist/'))

var server = app.listen(port, () => console.log(package.name + ' listening on port ' + port +  '!'))

module.exports = server
