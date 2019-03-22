const request = require('request');


const geocode = (address, cb) => {

  const mapBoxApiData = {
    token: 'pk.eyJ1IjoianlpMTk5MiIsImEiOiJjanRoaWh1YmQxenhxNDVtdWloam93cjc4In0.dKHAo-xF0D-Jo21EyNFqrw',
    location: address
  };

  const {location, token} = mapBoxApiData;

  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}&limit=1`;


  request({ url: mapBoxUrl, json: true }, (err, { body }) => {
    if(err) {
      cb('Unable to connect');
    } else if(body.features.length === 0) {
      cb('Unable to find location');
    } else {
      cb(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        placeName:body.features[0].place_name
      });
    }
  });

}


module.exports = geocode;