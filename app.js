const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //console.log("post request received");

  const query = req.body.cityName;
  const apiKey = "1f1a4fd678dc5bf644df941f24239a69";
  const unit = "metric";

  var url =
    "https://api.openweathermap.org/data/2.5/weather?appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log("statusCode:", response.statusCode);

    // response.on('data', (d) => {
    //     console.log(d); //returns hexadecimal code (not json)
    //   });

    // response.on('data', (d) => {
    //     process.stdout.write(d); //return raw format ,flattened as a string minimum space taken.

    //   });

    // json can be converted to raw using stringify function.

    response.on("data", (d) => {
      const weatherData = JSON.parse(d);
      const cityName = weatherData.name;
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imgURL =
        "      https://openweathermap.org/img/wn/" + icon + "@2x.png";
      //      console.log(temp);

      const description_ = weatherData.weather[0].description;
      //      console.log(description_); //return json format (as a js object)

      //we can have only one res.send but multiple res.write..

      res.write(
        "<p><h2>The temperature in " +
          cityName +
          " is " +
          temp +
          " degrees Celsius.</h2>The description of the weather is " +
          description_ +
          ".<br>Thank you.</p>"
      );

      res.write("<h2> description : " + description_ + ".</h2>");
      res.write("<img src= " + imgURL + ">");
      res.send();
    });
  });
  //res.send("server is up & running! welcome to the weather project");
});

app.listen(3000, function () {
  console.log("server running for the weather project on port 3000.");
});

/*

  */
