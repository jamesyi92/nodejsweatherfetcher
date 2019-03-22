const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));


// Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// sets up public folder as a static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Jamz Y',
    footerMsg: 'James Yi 2019'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Jamz',
    footerMsg: 'James Yi 2019'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'whatever',
    footerMsg: 'James Yi 2019'
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      error: 'Please provide an address'
    });
  }

  geocode(req.query.address, (err, {lat, long, placeName} = {}) => {

    if(err) {
      return res.send({
        error: err
      });
    }
      
    forecast(lat, long, (err, forecastData) => {
      if(err) {
        return res.send({
          error: err
        });
      }

      res.send({
        forecastMsg: forecastData,
        location: placeName,
        address: req.query.address
      });
    });
  });
});


app.get('/products', (req, res) => {

  if(!req.query.search){
    // make sure to add a return here to prevent more than one http requests at once
    return res.send({
      error: 'Please provide a search term'
    })
  }

  res.send({
    products: []
  });
});

// 404s

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    msg: 'Help article not found',
    footerMsg: 'James Yi 2019'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    msg: 'Page not found',
    footerMsg: 'James Yi 2019'
  });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});