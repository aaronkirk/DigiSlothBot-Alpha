const express = require("express");
const tmi = require("tmi.js");
const app = express();

// Glitch expects a web server so we're starting express to take care of that.
// The page shows the same information as the readme and includes the remix button.
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

let listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// Setting options for our bot, disable debug output once your up and running.
let options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [ process.env.TARGETCHANNEL ]
};

// Set up our new TMI client and connect to the server.
let client = new tmi.client(options);
client.connect();

// We have debug enabled now but if not we want some sort of confirmation
// we've connected to the server.
client.on("connected", (address, port) => {
  console.log(`Connected to ${address}:${port}`);
});

// This simple bot will simply monitor chat logging for instances of '!twitter' or '!github'.
//
client.on("chat", (channel, user, message, self) => {
  switch (message) {
    case "!twitter":
      client.action(
        process.env.TARGETCHANNEL,
        `${user["display-name"]} you can find it at twitter.com/aaronkirk`
      );
      break;
    case "!github":
      client.action(
        process.env.TARGETCHANNEL,
        `${user["display-name"]} you can find it at github.com/aaronkirk`
      );
      break;
    case "!sloth":
      client.action(process.env.TARGETCHANNEL, `I am a DigitalSloth`);
      break;
    case "!ident":
      client.action(process.env.TARGETCHANNEL, `I am the Digital Sloth, here to serve`);
     break;
    case "!gimmenum":
      var output = getRandInt(500, 550);
      client.action(process.env.TARGETCHANNEL, `Here is a num ${output}`);
      break;
    case "!listcar":
      client.action(process.env.TARGETCHANNEL, `The current list of cars is ${carArray.toString()}`);
      break;
    case "!log":
      client.action(process.env.TARGETCHANNEL, `Log Command Posted on Twitch`);
      console.log(`###################### - Log Command Posted in Console`);
      break;
    default:
      break;
  }
});

client.on("chat", (channel, user, message, self) => {
  if(message === "!a"){
      client.action(process.env.TARGETCHANNEL, `Great Sucess`);
  }
});

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var carArray = new Array("Saab", "Volvo", "BMW");

function addCar(car) {
  //carArray[carArray.Lenght] = car;
  return carArray.toString();
}
