var _ = require('lodash');
var returnDegree = function (degNames) {
  var deg = [];
  var degArr = [];
  // Switch Statements for appropriate deg
  _.forEach(degNames, function (degName) {
    switch (degName) {
      case "n":
        deg = [348.75, 11.25];
        break;
      case "nne":
        deg = [11.25, 33.75];
        break;
      case "ne":
        deg = [33.75, 56.25];
        break;
      case "ene":
        deg = [56.25, 78.75];
        break;
      case "e":
        deg = [78.75, 101.25];
        break;
      case "ese":
        deg = [101.25, 123.75];
        break;
      case "se":
        deg = [123.75, 146.25];
        break;
      case "sse":
        deg = [146.25, 168.75];
        break;
      case "s":
        deg = [168.75, 191.25];
        break;
      case "ssw":
        deg = [191.25, 213.75];
        break;
      case "sw":
        deg = [213.75, 236.25];
        break;
      case "wsw":
        deg = [236.25, 258.75];
        break;
      case "w":
        deg = [258.75, 281.25];
        break;
      case "wnw":
        deg = [281.25, 303.75];
        break;
      case "nw":
        deg = [303.75, 326.25];
        break;
      case "nnw":
        deg = [326.25, 348.75]
        break;
      default:
        deg = [-360, 360];
        break;
    }
    degArr.push(deg);
  });
  return degArr;
};
 
exports.returnDegree = returnDegree;
                                  