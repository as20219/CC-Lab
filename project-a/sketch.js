/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let r;
let g;
let b;
let y = -50;

function setup() {
  canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  r = random(0, 200);
  g = random(0, 200);
  b = random(0, 200);
}

function draw() {
  background(40, 100, 250);
  noStroke();
  for (let i = 0; i < 30; i++) {
    fill(250, 20 * i, 10 * i, 10);
    circle(200, 200, 100 + i * 50);
  }
  fill(0);
  rect(0, 450, 800, 50);
  drawCreature(mouseX, 350, color(r, g, b));
  drawSun(mouseX, 0);
  drawFish(pmouseX + 80, y);
  if (keyIsPressed) {
    y = y + 10;
  }
  if (y > 350) {
    y = -50;
  }
}

function drawCreature(x, y, bodyColor) {
  push();
  translate(x, y);

  function drawBody(x, y, c) {
    push();
    translate(x, y);
    noStroke();
    fill(c);
    rect(0, 0, 250, 450);
    fill(250, 250, 0);
    ellipse(125, 0, 250, 100);
    pop();
  }

  function drawArms(x, y) {
    angleMode(DEGREES);
    let t = frameCount * 2;
    let amp = 10;

    for (let i = 0; i < 7; i++) {
      fill(0, 0, 200, 50 + 10 / i);
      let amplitude = i * 7 + 50;
      for (let angle = 0; angle < 360; angle += 30) {
        let b = (i / 6) * amp * sin(t) * sin(angle);
        let yy = 0 + sin(angle) * amplitude + b;
        let xx = 120 + cos(angle) * amplitude * 2.5;
        noStroke();
        circle(xx, yy, 20 - i);
      }
    }
    for (let i = 0; i < 7; i++) {
      fill(0, 0, 200, 50 + 10 / i);
      let amplitude = i * 7 + 50;
      for (let angle = 0; angle < 360; angle += 30) {
        let b = (i / 6) * amp * sin(t) * sin(angle + 20);
        let y = 0 + sin(angle + 20) * amplitude + b;
        let x = 120 + cos(angle + 20) * amplitude * 2.5;
        circle(x, y, 20 - i);
      }
    }
  }

  drawBody(0, 0, bodyColor);
  drawArms(0, 0);

  pop();
}

function drawSun(x, y) {
  push();
  noStroke();
  fill(250, 250, 0);
  circle(x, y, 200);
  pop();
}

function drawFish(x, y) {
  push();
  translate(x, y);
  y = y + 1;
  noStroke();
  fill(255, 100, 0);
  ellipse(0, 0, 80, 40);
  triangle(0 + 20, 0, 50 + 20, -40, 50 + 20, 40);
  fill(0);
  circle(0 - 20, 0, 10);
  pop();
}

