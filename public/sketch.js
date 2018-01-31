// Open and connect socket
let socket = io();
var myRec = new p5.SpeechRec(); // new P5.SpeechRec object

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  fill(0, 0, 0, 255);
  textSize(32);
  textAlign(CENTER);
  text("say something", width / 2, height / 2);
  myRec.onResult = showResult;
  myRec.start();

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

  // Receive message from server
  socket.on('data', drawText);
  }

function drawText(data) {
  background(192, 255, 192);
  text(data, width / 2, height / 2);
  console.log(data);
  }

function showResult() {
  if (myRec.resultValue == true) {
    socket.emit('data', myRec.resultString);
  }
}
