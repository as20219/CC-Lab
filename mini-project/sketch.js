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

class projectbprotoype {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.by = -300
    this.ySpeed = 0.5
    this.top = -300
  }
  update() {
    let accel = frameCount * 0.0005
    this.ySpeed += accel
    this.by += this.ySpeed
    if (this.by > 0 || this.by < -300) {
      this.ySpeed = this.ySpeed * -1
      if (this.by > 0) {
        this.by = 0
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    this.drawBall(0, 0);
    this.drawSpoon(0, 0);
    pop();
  }

  drawSpoon() {
    push()
    noStroke()
    fill(128, 128, 128)
    arc(0, 0, 200, 100, 0, PI)
    rect(-7, 0, 400, 20)
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
