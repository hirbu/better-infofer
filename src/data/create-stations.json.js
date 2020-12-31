const axios = require("axios");
const fs = require("fs");

// source: https://gist.github.com/GuillaumeJasmin/9119436
// eslint-disable-next-line no-extend-native
String.prototype.extract = function (prefix, suffix) {
  var s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  } else {
    return "";
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    } else {
      return "";
    }
  }
  return s;
};

const clear = (str) => {
  return str
    .toLowerCase()
    .replaceAll("ă", "a")
    .replaceAll("â", "a")
    .replaceAll("î", "i")
    .replaceAll("ș", "s")
    .replaceAll("ț", "t");
};

axios.get("https://www.infofer.ro/index.php/ro/").then((response) => {
  const html = response.data;
  const rawData = html.extract("<script>var availableStations = ", "</script>");
  const jsonData = JSON.parse(rawData);

  const finalData = jsonData.map((station) => [
    station.name,
    clear(station.name),
  ]);

  fs.writeFile("./src/data/stations.json", JSON.stringify(finalData), () => {
    console.log("'stations.json' created");
  });
});
