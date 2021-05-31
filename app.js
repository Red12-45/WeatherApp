const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res)=>{
    const city =  req.body.city;
    const api = "ae7d44920a87282e83642545b6682ed9";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api+"&units=metric";
   https.get(url, (resp)=>{
    let data = '';
    resp.on('data', (chunk) => {
        data += chunk;
      });
      
      resp.on('end', () => {
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        const id  = weather.weather[0].icon
        const icon="http://openweathermap.org/img/wn/" +id+"@2x.png"
        res.write("<h1>Weather Forecast</h1>");
        res.write("<h2>The weather in "+city+ " is " + temp +" Celcius"+"</br>" );
        res.write("<img src= "+icon+" >");
        res.send()
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
   }) 
   
})

app.listen(3000,()=>{
    console.log("Server Started on port 3000");
})