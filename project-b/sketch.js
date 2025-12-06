let spoon;
let img;
let mars;
let jupiter;
let mercury;
let ding;
let ball;
function preload() {
  img = loadImage("assets/background.jpg");
  mars = loadImage("assets/mars.png");
  jupiter = loadImage("assets/jupiter.png");
  mercury = loadImage("assets/mercury.png");
  ding = loadSound("assets/ding.mp3");
  marsmusic = loadSound("assets/marsmusic.mp3");
  jupitermusic = loadSound("assets/jupitermusic.mp3");
  mercurymusic = loadSound("assets/mercurymusic.mp3");
}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  spoon = new projectbprotype(300, 300);
  ball = new spaceplanent(500, 300);
}
function draw() {
  background(img);
  ball.update();
  spoon.update(ball.property1, ball.property2);
  spoon.display();
}

class projectbprotype {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.by = -300
    this.ySpeed = 0.5
    this.position = 0
    this.spoonY = 0
    this.spoonX = 0
    this.spoonAngle = 0
    this.spoonSpeed = 0.005
    this.spoonStart = false
    this.current = "mars"
    this.drop = false
  }
  update(ballProperty1, ballProperty2) {
    if (ballProperty1) {
      this.current = ballProperty2;
      this.by = -300;
      this.ySpeed = 0.5;
      this.spoonStart = false;
      this.drop = true;
    }
    if (!this.drop) {
      return;
    }
    if (this.spoonStart || this.by !== 0) {
      let accel = 0.2;
      this.ySpeed += accel;
      this.by += this.ySpeed;

      if (this.by > 0 || this.by < -300) {
        this.ySpeed = this.ySpeed * -0.7;
        if (this.by > this.position) {
          this.by = 0;
          this.spoonStart = true;
          // ding.play();
        }
      }

      if (this.spoonStart && abs(this.ySpeed) < 0.1 && this.by === 0) {
        this.spoonStart = false;
        this.drop = false;
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    ball.drawBall(this.by)

    push()
    translate(this.spoonX, this.spoonY)
    this.drawSpoon(this.spoonX, this.spoonY);
    pop();
    pop();
  }

  drawSpoon() {
    let angle = radians(5)
    if (this.spoonStart) {
      this.spoonAngle += this.spoonSpeed
      if (this.spoonAngle > angle || this.spoonAngle < -angle) {
        this.spoonSpeed = -this.spoonSpeed
      }
    }
    push()
    noStroke()
    fill(128, 128, 128)
    translate(0, 0)
    rotate(this.spoonAngle)
    rect(50, 0, 400, 20)
    arc(0, 0, 200, 100, 0, PI)
    pop()
  }
}

class spaceplanent {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.property1 = false;
    this.property2 = "mars";
    this.planetImg = mars;
  }
  update() {
    this.property1 = false;
    if (keyIsPressed) {
      if (key === "m") {
        this.property1 = true;
        this.property2 = "mars";
        this.planetImg = mars;
        this.stopMusic();
        marsmusic.loop();
      }
      if (key === "j") {
        this.property1 = true;
        this.property2 = "jupiter";
        this.planetImg = jupiter;
        this.stopMusic();
        jupitermusic.loop();
      }
      if (key === "n") {
        this.property1 = true;
        this.property2 = "mercury";
        this.planetImg = mercury;
        this.stopMusic();
        mercurymusic.loop();
      }
    }
  }
  stopMusic() {
    marsmusic.stop();
    jupitermusic.stop();
    mercurymusic.stop();
  }

  drawBall(by) {
    push();
    imageMode(CENTER);
    noStroke();
    if (this.property2 === "mars") {
      this.drawMars(by);
    } else if (this.property2 === "jupiter") {
      this.drawJupiter(by);
    } else if (this.property2 === "mercury") {
      this.drawMercury(by);
    }
    pop();
  }
  drawMars(by) {
    image(mars, 0, by, 100, 100);
  }

  drawJupiter(by) {
    image(jupiter, 0, by - 30, 150, 150);
  }

  drawMercury(by) {
    image(mercury, 0, by, 50, 50);
  }
}

function mousePressed() {
  let sx = spoon.x + spoon.spoonX;
  let sy = spoon.y + spoon.spoonY;
  let d = dist(mouseX, mouseY, sx, sy);
  if (d < 100) {
    ding.play();
  }
}