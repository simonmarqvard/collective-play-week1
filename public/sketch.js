// Open and connect socket
let socket = io();
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var mic;
var maxVolume = 0;
var stringbox = "";
var textLocationX;
var textLocationY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0, 0, 0, 255);
  textSize(32);
  textAlign(CENTER);
  text("say something", width / 2, height / 2);
  mic = new p5.AudioIn();
  myRec.onResult = showResult;
  myRec.continuous = true;
  myRec.start();
  mic.start();
  textLocationX = width/2;
  textLocationY = height/2;


  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

  // Receive message from server
  socket.on('data', drawText);
  }

function draw() {
  var vol = mic.getLevel();
  if (vol > maxVolume){
    maxVolume = vol;
    console.log(maxVolume)
    }
  }

function drawText(data) {
  var size;
  background(192, 255, 192);
  if (maxVolume < 0.1) {
    size = 10;
  } else if (maxVolume >= 0.1 && maxVolume < 0.2) {
    size = 50;
  } else if (maxVolume > 0.2 && maxVolume < 0.3) {
    size = 100;
  } else if (maxVolume > 0.3 && maxVolume < 0.4){
    size = 200;
  } else {
     size = 400;
  }
  stringbox = stringbox + "\n" + data;
  var splitstring = split(stringbox, "\n")
  console.log(splitstring);
  textSize(size);
  for ( var i = splitstring.length -1; i > 0 ; i--) {
  if (i == 1) {
    textSize(size);
  } else {
    textSize(15);
  }
  text(splitstring[splitstring.length-i], textLocationX, textLocationY - (i * 30));
  maxVolume = 0;
  console.log(splitstring[splitstring.length-i]);
}
}

function showResult() {
  if (myRec.resultValue == true) {
    socket.emit('data', myRec.resultString);
  }
}
