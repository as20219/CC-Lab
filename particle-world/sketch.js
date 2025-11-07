// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 200; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(50);

  // consider generating particles in draw(), using Dynamic Array

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.hue = random(0, 360);
    this.wiggle = random(TWO_PI);
  }
  // methods (functions): particle's behaviors
  update() {
    // (add)
    // this.x += this.moveX;
    this.y += this.y * 0.03;
    this.checkBound();
    this.wiggle = random(PI);
  }
  display() {
    // particle's appearance
    push();
    translate(this.x + sin(frameCount * 0.01 + this.wiggle), this.y);
    // translate(this.x, this.y);
    colorMode(HSB)
    fill(this.hue, 80, 100)
    noStroke();
    rect(this.x, 0, 9, 5);

    pop();
  }
  checkBound() {
    if (this.y > height) {
      this.y = random(1, 50);
    }
  }
}