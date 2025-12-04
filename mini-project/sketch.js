let spoon;
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  spoon = new projectbprotype(300, 300);
}
function draw() {
  background(220);
  spoon.update();
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
  }
  update() {
    if (this.spoonStart || this.by !== 0) {
      let accel = frameCount * 0.0005;
      this.ySpeed += accel;
      this.by += this.ySpeed;

      if (this.by > 0 || this.by < -300) {
        this.ySpeed = this.ySpeed * -0.7;
        if (this.by > this.position) {
          this.by = 0;
          this.spoonStart = true;
        }
      }

      if (this.spoonStart && abs(this.ySpeed) < 0.1 && this.by === 0) {
        this.spoonStart = false;
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    this.drawBall(0, 0);

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
    rect(50, 0, 400, 20)
    push()
    translate(0, 0)
    rotate(this.spoonAngle)
    arc(0, 0, 200, 100, 0, PI)
    pop()
    pop()
  }
  drawBall() {
    push()
    noStroke()
    fill(255, 0, 0)
    circle(0, this.by, 90)
    pop()
  }
}
// make seperate class for ball
