const express = require('express')
const package = require('./package')
const port = process.env.PORT || 5000
const app = express()

const isLocalhost =  function(host) {
    return host.match(/^localhost[:$]/) || 
           host.match(/^127\.0\.0\.1[:$]/);
}

// set up a route to redirect http to https
app.enable('trust proxy');
app.use(function(req, res, next) {
    var noNeedToRedirect = req.secure || isLocalhost(req.headers.host)

    if (noNeedToRedirect){
        return next()
    }
    res.redirect("https://" + req.headers.host + req.url)
})

app.get('/status', (req, res) => res.json({version: package.version}))
app.use(express.static('public'))
app.use('/js/jquery', express.static('node_modules/jquery/dist/'))

var server = app.listen(port, () => console.log(package.name + ' listening on port ' + port +  '!'))

module.exports = server
