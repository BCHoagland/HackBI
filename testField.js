var particles = [];

function setup() {
  createCanvas(screen.width, screen.height);
  background(20, 20, 20);

  for (var i = 0; i < 20; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(20, 20, 20, 20);

  for (var i = 0; i < 20; i++) {
    particles[i].update();
    particles[i].show();
  }
}

function Particle() {
  this.r = 20;
  this.startX = -this.r - random(screen.width);
  this.pos = createVector(this.startX, random(screen.height));
  this.yDir = Math.floor(random(2));

  this.update = function() {
    this.pos.x += this.r / 8;
    if (this.yDir == 1) {
      this.pos.y += sin(this.pos.x / 40) * (this.r / 10) + sin(this.pos.y / 40);
    } else {
      this.pos.y += sin(this.pos.x / 40) * (this.r / 10) - sin(this.pos.y / 40);
    }
    if (this.pos.x > (screen.width + this.r)) {
      this.reset();
    }
  }

  this.show = function() {
    stroke(255, 255, 255, 25);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    strokeWeight(1);
  }

  this.reset = function() {
    this.startX = -this.r - random(screen.width);
    this.pos = createVector(this.startX, random(screen.height));
  }
}
