const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (rep, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (rep, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (rep, res) => {
    res.render('help', {
        helpText: 'Usefulltext',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an addess'
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        msg: 'Article not found!',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        msg: 'Page not found!',
        title: '404',
        name: 'Andrew Mead'
    })
})

app.listen(port ,() => {
    console.log('server is up on port: ' + port)
})
