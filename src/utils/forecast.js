const request = require('request');



const forecast = (lat, long, cb) => {

  const weatherApiData = {
    ApiKey: '16fe78b4d62a4b49d178596c9ea16d17',
    language: 'en',
    unit: 'si'
  }

  const {ApiKey, language, unit} = weatherApiData;

  const darkSkyUrl = `https://api.darksky.net/forecast/${ApiKey}/${lat},${long}?units=${unit}&lang=${language}`;


  request({url: darkSkyUrl, json: true}, (err, { body }) => {

    if(err) {
      cb('Network problem with the service', undefined);
    } else if(body.error) {
      cb('Please enter the correct coordinates', undefined);
    } else {
      const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability}% chance of rain. The wind bearing is ${body.currently.windBearing}`;
      cb(undefined, data);
    }

  });

}


module.exports = forecast;