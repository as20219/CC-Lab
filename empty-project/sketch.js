let mySound;
let SpeedX = 5;
function preload() {
  soundFormats();
  mySound = loadSound("assets/song.mp3");
}
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
  fill(0);
  circle(x, height / 2, 50);
  x += SpeedX;
  if (x > width || x < 0) {
    SpeedX = -SpeedX;
  }

}
function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.stop();
  } else {
    mySound.play();
  }
}
