var _ = require('lodash');
var windDeg = require('./windDegree');

Number.prototype.between = function(a, b, inclusive) {
  var min = Math.min(a, b),
    max = Math.max(a, b);
  return inclusive ? this >= min && this <= max : this > min && this < max;
}

var applyFilters = function(req, data) {

  let min_day = req.query.min_day;
  let max_day = req.query.max_day;
  let min_morn = req.query.min_morn;
  let max_morn = req.query.max_morn;
  let min_eve = req.query.min_eve;
  let max_eve = req.query.max_eve;
  let min_night = req.query.min_night;
  let max_night = req.query.max_night;
  let min_speed = req.query.min_speed;
  let max_speed = req.query.max_speed;
  let min_pressure = req.query.min_pressure;
  let max_pressure = req.query.max_pressure;
  let min_humidity = req.query.min_humidity;
  let max_humidity = req.query.max_humidity;
  let min_clouds = req.query.min_clouds;
  let max_clouds = req.query.max_clouds;
  let min_rain = req.query.min_rain;
  let max_rain = req.query.max_rain;
  let min_snow = req.query.min_snow;
  let max_snow = req.query.max_snow;
  var deg = req.query.deg.split(',');
  let wTypes = req.query.wTypes.split(',');

  // pressure
  data = _.filter(data, function(x) {
    if (_.inRange(x['pressure'], min_pressure, max_pressure)) {
      return x['pressure'];
    }
  });

  // morning temp
  data = _.filter(data, function(x) {
    if (_.inRange(x.temp['morn'], min_morn, max_morn)) {
      return x.temp['morn'];
    }
  });

  // day temp
  data = _.filter(data, function(x) {
    if (_.inRange(x.temp['day'], min_day, max_day)) {
      return x.temp['day'];
    }
  });

  // eve temp
  data = _.filter(data, function(x) {
    if (_.inRange(x.temp['eve'], min_eve, max_eve)) {
      return x.temp['eve'];
    }
  });

  // night temp
  data = _.filter(data, function(x) {
    if (_.inRange(x.temp['night'], min_night, max_night)) {
      return x.temp['night'];
    }
  });

  // speed
  data = _.filter(data, function(x) {
    if (_.inRange(x['speed'], min_speed, max_speed)) {
      return x['speed'];
    }
  });


  // rain 
  data = _.filter(data, function(x) {
    if (min_rain == 0 && (!x['rain'])) {
      return x;
    }
    else
    if (x.rain && _.inRange(x['rain'], min_rain, max_rain)) {
      return x['rain'];
    }
  });

  // snow 
  data = _.filter(data, function(x) {
    if (min_snow == 0 && !x['snow']) {
      return x;
    }
    else
    if (x.snow && _.inRange(x['snow'], min_snow, max_snow)) {
      return x['snow'];
    }
  });

  // humidity
  data = _.filter(data, function(x) {
    if (x['humidity'] == 0 && (min_humidity == 0 || max_humidity == 0)) {
      return x;
    }
    else
    if (x['humidity'].between(min_humidity, max_humidity, true)) {
      return x['humidity'];
    }
  });

  // clouds
  data = _.filter(data, function(x) {
    if (x['clouds'] == 0 && (min_clouds == 0 || max_clouds == 0)) {
      return x;
    }
    else
    if (x['clouds'].between(min_clouds, max_clouds, true)) {
      return x['clouds'];
    }
  });

  // deg
  var degRanges = windDeg.returnDegree(deg);
  var arr1;
  var filteredArray1 = [];
  if (degRanges != undefined && degRanges.length > 0) {
    degRanges.forEach(function(x) {
      let min = x[0];
      let max = x[1];
      if (min === -360 && max === 360) {
        filteredArray1 = data;
      }
      else {
        arr1 = _.filter(data, function(x) {
          if (max < min) {
            var rangeCheck = x['deg'] + 360;
            max = max + 360;
            if (_.inRange(rangeCheck, min, max)) {
              return x['deg'];
            }
          }
          else {
            if (_.inRange(x['deg'], min, max)) {
              return x['deg'];
            }
          }
        });
        // Mapping the combined data to new Array
        _.map(arr1, function(y) {
          filteredArray1.push(y);
        });
      }
    });
    data = filteredArray1;
  }

  // wTypes
  var arr;
  var filteredArray = [];
  if (wTypes != undefined && wTypes.length > 0) {
    wTypes.forEach(function(x) {
      if (x !== '') {
        arr = _.filter(data, { weather: [{ main: x }] });
        _.map(arr, function(y) {
          filteredArray.push(y);
        });
      }
      else {
        filteredArray = data;
      }
    });
    data = filteredArray;
  }
  else {
    data = data;
  }

  return data;
};

exports.applyFilters = applyFilters;
