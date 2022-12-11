
const express = require ("express");

const https = require("https");

const app = express ();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function(req , res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/" , function(req , res){

  console.log("Post request is recieved");
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = "7baefc3f4af34131ac8401b6db88420b" ;
  const url  = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units=" + unit;

  https.get(url , function(response){

    console.log(response.statusCode);

    response.on("data" , function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp

      const icon = weatherData.weather[0].icon

      const imageURL =  "http://openweathermap.org/img/wn/" + icon +  "@2x.png"
      console.log(temp);
      const weatherDescription = weatherData.weather[0].description
      console.log(weatherDescription);

      res.write("<p>The weather is currently : "+ weatherDescription + "</p>");

      res.write("<h1> The temperature in "+ query +" is " + temp + " degrees </h1>");

      res.write("<img src=" + imageURL + ">");

      res.send();
    })

  })
})




app.listen(3000 , function(){
  console.log("Server is running on port 3000.");
});
