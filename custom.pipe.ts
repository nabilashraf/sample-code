import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';


//  Convert Wind Degree to Directions

@Pipe({
  name: 'toDirections'
})
export class windPipe implements PipeTransform {
  transform(value : any, lang?: string) : any {
    if(_.inRange(value,11.25,33.75)){
      return value = 'NNE';
    }else
    if(_.inRange(value,33.75,56.25)){
      return value = 'NE';
    }else
    if(_.inRange(value,56.25,78.75)){
      return value = 'ENE';
    }else
    if(_.inRange(value,78.75,101.25)){
      return value = 'E';
    }else
    if(_.inRange(value,101.25,123.75)){
      return value = 'ESE';
    }else
    if(_.inRange(value,123.75,146.25)){
      return value = 'SE';
    }else
    if(_.inRange(value,146.25,168.75)){
      return value = 'SSE';
    }else
    if(_.inRange(value,168.75,191.25)){
      return value = 'S';
    }else
    if(_.inRange(value,191.25,213.75)){
      return value = 'SSW';
    }else
    if(_.inRange(value,213.75,236.25)){
      return value = 'S';
    }else
    if(_.inRange(value,236.25,258.75)){
      return value = 'WSW';
    }else
    if(_.inRange(value,258.75,281.25)){
        return value = 'W';
    }else
    if(_.inRange(value,281.25,303.75)){
      return value = 'WNW';
    }else
    if(_.inRange(value,303.75,326.25)){
      return value = 'NW';
    }else
    if(_.inRange(value,326.25,348.75)){
      return value = 'NNW';
    }else
    if(_.inRange(value,348.75,360) || _.inRange(value,0,11.25))
    {
      return value = 'N';
    }
  }
}


// Lanuage translation of Weather Conditions from 'en' to 'de'

@Pipe({
  name: 'conditions'
})

export class weatherPipe implements PipeTransform{
  transform(value: any, lang?: any): any {
    switch (lang) {
      case 'de':
        switch(value){
          case 'Clear':
            return value='Sonnig';
          case 'Snow':
            return value = 'Schnee';
          case 'Drizzle':
            return value = 'Nieselregen';
          case 'Thunderstorm':
            return value = 'Gewitter';
          case 'Clouds':
            return value = 'Bewölkt';
          case 'Rain':
            return value = 'Regen';
        }
      case 'en':
        return value;
    }
  }
}


// Conversion of temperature units (Imperial to Metric System and vice versa)

@Pipe({
  name: 'toCelsius'
})
export class celsiusPipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch (unit) {
      case 'imperial':
        return value = 1.8*(value-273.15)+32;
      case 'metric':
        return value = value - 273.15;
    }
  }
}

// Conversion of pressure units (Imperial to Metric and vice versa)

@Pipe({
  name: 'pressure'
})
export class pressurePipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch (unit) {
      case 'imperial':
        return value = value / 33.864;
      case 'metric':
        return value;
    }
  }
}

// Conversion of rain units (Imperial to Metric and vice versa)


@Pipe({
  name: 'rain'
})
export class rainPipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch (unit) {
      case 'imperial':
        return value = value / 25.4;
      case 'metric':
        return value;
    }
  }
}


// Conversion of snow units (Imperial to Metric and vice versa)

@Pipe({
  name: 'snow'
})
export class snowPipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch (unit) {
      case 'imperial':
        return value = value / 2.54;
      case 'metric':
        return value;
    }
  }
}


// Conversion of speed units (Imperial to Metric and vice versa)

@Pipe({
  name: 'toKmH'
})
export class speedPipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch (unit) {
      case 'imperial':
        return value = value * 2.24;
      case 'metric':
        return value = value * 3.6;
    }
  }
}

// Conversion of distance units (Imperial to Metric and vice versa)


@Pipe({
  name: 'toMile'
})
export class milePipe implements PipeTransform {
  transform(value: any, unit?: any): any {
    switch(unit){
      case 'imperial':
        return value = Number(value / 1.853).toFixed(2);
      case 'metric':
        return value;
    }
  }
}

// Conversion of date to UTC format from ISO String (English/German Locale)


@Pipe({
  name: 'toUTCDate'
})
export class datePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    let d = new Date(value * 1000);
    switch (args) {
      case 'en':
        return value = d.toLocaleDateString('en-US', options);
      case 'de':
        return value = d.toLocaleDateString('de-DE', options);
    }
  }
}


// Custom pipe to evaluate zero values for certain properties (rain/snow) for each city

@Pipe({
  name: 'emptyValue'
})
export class zeroPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(!value){
      return value = 0;
    }else{
      return value;
    }
  }
}

// Custom pipe to use material arrow icons based on boolean values

@Pipe({
  name: 'iconText'
})
export class iconPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(value == 1){
      return value = 'up';
    }else{
      return value = 'down';
    }
  }
}

// Custom sort for cities.

@Pipe({
  name: 'sortCity'
})
export class sortPipe implements PipeTransform {
  transform(value:any, property?: any,order?: any): any {
    let arr = [];
    let sorted = [];
    let sortedArray = [];
    let objProp = '';
    if (property.includes('distance') || property.includes('name')) {
      return value = _.orderBy(value, [property], [order]);
    }
    else {
      _.forEach(value, function (forecast) {
        let ascending = function () {
          let minValue = _.minBy(forecast.data, function (o) {
            if (property.includes('temp')) {
              objProp = property.split('.')[1];
              return o['temp'][objProp];
            }
            else if (property === 'snow' || property === 'rain') {
              if(o[property] === undefined){
                 return 1;
              }else{
                return o[property];
              }
            }
            else {
              return o[property];
            }
          });
          if (property.includes('temp')) {
            arr.push({ 'city': forecast['city']['name'], 'propValue': minValue['temp'][objProp] });
          }
          else if(property == 'snow' || property == 'rain'){
            if(minValue[property] == undefined){
              arr.push({ 'city': forecast['city']['name'], 'propValue': 0 });
            }else{
              arr.push({ 'city': forecast['city']['name'], 'propValue': minValue[property] });
            }
          }
          else {
            arr.push({ 'city': forecast['city']['name'], 'propValue': minValue[property] });
          }
          sorted = _.orderBy(arr,  ['propValue', 'city'],  ['asc',  'asc']);
        }
        let descending = function () {
          let maxValue = _.maxBy(forecast.data, function (o) {
            if (property.includes('temp')) {
              objProp = property.split('.')[1];
              return o['temp'][objProp];
            }
            else if (property == 'snow' || property == 'rain') {
              if (o[property] == undefined) {
                return 0;
              } else {
                return o[property];
              }
            }
            else {
              return o[property];
            }
          });
          if (property.includes('temp')) {
            arr.push({ 'city': forecast['city']['name'], 'propValue': maxValue['temp'][objProp] });
          }
          else if (property == 'snow' || property == 'rain') {
            if (!maxValue[property]) {
              arr.push({ 'city': forecast['city']['name'], 'propValue': 0.0 });
            } else {
              arr.push({ 'city': forecast['city']['name'], 'propValue': maxValue[property] });
            }
          }
          else {
            arr.push({ 'city': forecast['city']['name'], 'propValue': maxValue[property] });
          }
          sorted = _.orderBy(arr, ['propValue', 'city'], ['desc', 'asc']);
        }
        switch (order) {
          case 'asc':
            ascending();
            break;
          case 'desc':
            descending();
            break;
          default:
            ascending();
        }
      });
      _.forEach(sorted, function (obj) {
        sortedArray.push(value[value.findIndex(x => x['city']['name'] === obj['city'])]);
      });
      return value = sortedArray;
    }
  }
}

// Custom properties to calculate max/min of Speed,Clouds, Day Temperature and Rain for each individual city

@Pipe({
  name: 'extraProperties'
})
export class extraPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let newArr = _.forEach(value, function (forecast) {
      forecast.maxSpeed = _.maxBy(forecast.data, 'speed')['speed'];
      forecast.minSpeed = _.minBy(forecast.data, 'speed')['speed'];
      forecast.minClouds = _.minBy(forecast.data,'clouds')['clouds'];
      forecast.maxClouds = _.maxBy(forecast.data, 'clouds')['clouds'];
      forecast.minTemp = _.minBy(forecast.data, 'temp["day"]')['temp']['day'];
      forecast.maxTemp = _.maxBy(forecast.data, 'temp["day"]')['temp']['day'];
      if((_.minBy(forecast.data,'rain')) !== undefined)
      {
        if(_.minBy(forecast.data,'rain')['rain'] == _.maxBy(forecast.data,'rain')['rain']){
          forecast.minRain = 0;
        }else{
          forecast.minRain = _.minBy(forecast.data,'rain')['rain']
        }
      }else{
        forecast.minRain = 0;
      }
      if((_.maxBy(forecast.data,'rain')) !== undefined)
      {
        forecast.maxRain = _.maxBy(forecast.data,'rain')['rain']
      }else{
        forecast.maxRain = 0;
      }
    })
    return value = newArr;
  }
}










