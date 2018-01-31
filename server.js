const express = require('express')
const package = require('./package')
const port = process.env.PORT || 5000
const app = express()

// set up a route to redirect http to https
app.enable('trust proxy');
app.use(function(req, res, next) {
    if (req.secure){
        return next();
    }
    if  (req.headers.host.match(/^localhost[:$]/)) {
        return next();
    }
    console.log(req.headers.host);
    res.redirect("https://" + req.headers.host + req.url);
});

app.get('/status', (req, res) => res.json({version: package.version}))
app.use(express.static('public'))
app.use('/js/jquery', express.static('node_modules/jquery/dist/'))

var server = app.listen(port, () => console.log(package.name + ' listening on port ' + port +  '!'))

module.exports = server
