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


// Set up files to link up ? with the .env file
//const TARGETCHANNEL = process.env.KBTwitch;
//const TARGETCHANNEL = process.env.EZATwitch;
const TARGETCHANNEL = process.env.TESTTargetChannel;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;


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
    username: USERNAME,
    password: PASSWORD
  },
  channels: [ TARGETCHANNEL ]
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
  switch (message.toLowerCase()) {
    case "!twitter":
      client.action(TARGETCHANNEL, `${user["display-name"]} you can find my creator at twitter.com/aaronkirk`);
      break;
    case "!github":
      client.action(TARGETCHANNEL, `${user["display-name"]} you can find my creator at github.com/aaronkirk`);
      break;
    case "!sloth":
      client.action(TARGETCHANNEL, `I am a DigitalSloth`);
      break;
    case "!ident":
      client.action(TARGETCHANNEL, `I am the Digital Sloth, here to serve`);
     break;
    case "!gimmenum":
      var output = getRandInt(500, 550);
      client.action(TARGETCHANNEL, `Here is a num ${output}`);
      break;
    case "!listcar":
      client.action(TARGETCHANNEL, `The current list of cars is ${carArray.toString()}`);
      break;
    case "!log":
      client.action(TARGETCHANNEL, `Log Command Posted on Twitch`);
      console.log(`###################### - Log Command Posted in Console`);
    case "!emote":
        client.action(TARGETCHANNEL, `kylebo1Digi`);
      break;
    default:
      break;
  }
});

client.on("chat", (channel, user, message, self) => {
  if(message.toLowerCase() === "!a"){
      client.action(TARGETCHANNEL, `Great Sucess`);
  }
  // if(user.mod){
  //   client.action(TARGETCHANNEL, `mod detected`);
  // }
});

function getRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var carArray = new Array("Saab", "Volvo", "BMW");

function addCar(car) {
  //carArray[carArray.Lenght] = car;
  return carArray.toString();
}

client.on("chat", (channel, user, message, self) => {
  if(message.toLowerCase() === "!tag"){
   console.log(channel, user, message, self)
  }
});

client.on("chat", (channel, user, message, self) => {
   console.log(user)  
});

client.on("chat", (channel, user, message, self) => {
  if(message.toLowerCase() === "!poke"){
      console.log(`"!poke" command recieved -- "${message.toUpperCase()}"`)
      const digiSlothReply = pokeSloth()
      client.action(TARGETCHANNEL, digiSlothReply);
  }
});

function pokeSloth(){
  var digiSlothReply = "????";
  const diceRoll = rollDice()
  const modifier = rollDice()
  if(diceRoll <= 1){
    digiSlothReply = `Zzz ${modifier}`
  } else if (diceRoll > 1 && diceRoll <= 2){
    digiSlothReply = `Zzzzzzzzzz ${modifier}`
  } else if (diceRoll > 2 && diceRoll < 3){
    digiSlothReply = `Zzz Zzz Zzz ${modifier}`
  } else if (diceRoll == 4){
    digiSlothReply = `Huh?! I'm Awake ${modifier}`
  } 
  console.log(`The DigiSloth was poked and said "${digiSlothReply}" ${modifier}`)
  return digiSlothReply;
}

function rollDice(){
  const diceRoll = Math.floor(Math.random() * 5) + 1;
  console.log(`The dice has been rolled and returned the number: ${diceRoll}`);
  return diceRoll;
}


client.on("chat", (channel, user, message, self) => {
  if(message.toLowerCase() === "!explain"){
/*       client.action(TARGETCHANNEL, `Before elevatePrivilege() .... user.username: ${user.username} .... user.mod: ${user.mod}`); */
      elevatePrivilege(user);
      const diceRoll = rollDice()
      console.log(`"!explain" command recieved -- "${message.toUpperCase()}"`)
/*      client.action(TARGETCHANNEL, `channel: ${channel} .... user: ${user} .... message: ${message} .... dice: ${diceRoll}`);
      client.action(TARGETCHANNEL, `After elevatePrivilege() .... user.username: ${user.username} .... user.mod: ${user.mod}`); */
      // .... user.identity: ${user.identity} .... user.id: ${user.id}
  }
});


function elevatePrivilege(user){
  
  console.log('got to elevatePrivilege function')
  console.log(user.username.toLowerCase())
  if (user.username.toLowerCase() === 'kurxx'){
    user.mod = true;
    console.log('user is kurxx')
  }
  console.log(`user.mod: ${user.mod}`)
  //user.mod = true;
  return user;
}