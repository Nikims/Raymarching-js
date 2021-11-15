// Creating variables
let myX = 0,
  myY = 0,
  updates = 0;

class ray {
  x = 0;
  y = 0;
  angle = 0;
  rayPositions = [];
  rayX = 0;
  rayY = 0;

  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.rayX = x;
    this.rayY = y;
    this.angle = angle;
  }
  cast() {
    this.x = mouseX;
    this.y = mouseY;
    this.angle += 0.007;
    //	let dist=0;
    this.rayX = this.x;
    this.rayY = this.y;
    this.rayPositions = [];
    this.radiuses = [];
    for (let i = 0; i < 40; i++) {
      let distancesToCirclesInRay = [];
      let minDistInRay = [99999, 0];
      for (let j = 0; j < circles.length; j++) {
        distancesToCirclesInRay[j] = Math.sqrt(
          Math.pow(
            this.rayX - circles[j].x + Math.cos(this.angle) * circles[j].r,
            2
          ) +
            Math.pow(
              this.rayY - circles[j].y + Math.sin(this.angle) * circles[j].r,
              2
            )
        );
      }
      for (let j = 0; j < distancesToCirclesInRay.length; j++) {
        if (distancesToCirclesInRay[j] < minDistInRay[0]) {
          minDistInRay[0] = distancesToCirclesInRay[j];
          minDistInRay[1] = j;
        }
      }
      this.radiuses[i] = minDistInRay[0];

      if (minDistInRay[0] > 10) {
        this.rayX += (Math.cos(this.angle) * minDistInRay[0]) / 2;
        this.rayY += (Math.sin(this.angle) * minDistInRay[0]) / 2;
        this.rayPositions[i] = { x: this.rayX, y: this.rayY };
      } else {
        break;
      }
    }
  }
  draw() {
    if (this.rayPositions.length > 0) {
      for (i = 0; i < this.rayPositions.length; i++) {
        context.fillRect(this.rayPositions[i].x, this.rayPositions[i].y, 5, 5);
        context.beginPath();
        context.ellipse(
          this.rayPositions[i].x,
          this.rayPositions[i].y,
          this.radiuses[i] / 2,
          this.radiuses[i] / 2,
          0,
          0,
          9
        );
        context.stroke();
      }
    }
  }
}
lmaoRay = new ray(myX, myY, 0);
circles = [];
distancesToCircles = [];
minDist = [99999, 0];
for (i = 0; i < Math.round(Math.random() * 10 + 10); i++) {
  circles[i] = {
    x: Math.random() * 800,
    y: Math.random() * 600,
    r: Math.random() * 40 + 10,
  };
}
function lerp(a, b, n) {
  return (a - a + b - b) * n + a;
}

function update() {
  // Napisanoto tuk se izpulnqva otnovo i otnovo mnogo puti v sekunda
  lmaoRay.cast();
  myX = mouseX;
  myY = mouseY;
  minDist = [99999, 0];

  for (i = 0; i < circles.length; i++) {
    distancesToCircles[i] = Math.sqrt(
      Math.pow(
        myX -
          circles[i].x +
          Math.cos(
            Math.atan2(myY - circles[minDist[1]].y, myX - circles[i].x)
          ) *
            circles[i].r,
        2
      ) +
        Math.pow(
          myY -
            circles[i].y +
            Math.cos(
              Math.atan2(myY - circles[minDist[1]].y, myX - circles[i].x)
            ) *
              circles[i].r,
          2
        )
    );
  }
  for (i = 0; i < circles.length; i++) {
    if (distancesToCircles[i] < minDist[0]) {
      minDist[0] = distancesToCircles[i];
      minDist[1] = i;
    }
  }
}
function draw() {
  lmaoRay.draw();
  for (i = 0; i < circles.length; i++) {
    context.beginPath();
    context.ellipse(
      circles[i].x,
      circles[i].y,
      circles[i].r,
      circles[i].r,
      0,
      0,
      2 * Math.PI
    );
    context.stroke(); // tuk naprogramirai kakvo da se risuva
  }
  context.beginPath();
  context.moveTo(myX, myY);
  context.lineTo(
    circles[minDist[1]].x +
      Math.cos(
        Math.atan2(myY - circles[minDist[1]].y, myX - circles[minDist[1]].x)
      ) *
        circles[minDist[1]].r,
    circles[minDist[1]].y +
      Math.sin(
        Math.atan2(myY - circles[minDist[1]].y, myX - circles[minDist[1]].x)
      ) *
        circles[minDist[1]].r
  );

  context.stroke();
  context.beginPath();
  context.ellipse(
    myX,
    myY,
    Math.abs(
      Math.sqrt(
        Math.pow(myX - circles[minDist[1]].x, 2) +
          Math.pow(myY - circles[minDist[1]].y, 2)
      ) - circles[minDist[1]].r
    ),
    Math.abs(
      Math.sqrt(
        Math.pow(myX - circles[minDist[1]].x, 2) +
          Math.pow(myY - circles[minDist[1]].y, 2)
      ) - circles[minDist[1]].r
    ),
    0,
    0,
    2 * Math.PI
  );

  context.stroke();

  //   drawLine(
  //     myX,
  //     myY,
  //     circles[minDist[1]].x +
  //       Math.atan(circles[minDist[1]].x - myX) * circles[minDist[1]].r,
  //     circles[minDist[1]].y +
  //       Math.atan(circles[minDist[1]].y - myY) * circles[minDist[1]].r
  //   );
  context.fillRect(myX - 5, myY - 5, 10, 10);
}

function keyup(key) {
  // Show the pressed keycode in the console
  console.log("Pressed", key);
}

function mouseup() {
  // Show coordinates of mouse on click
  console.log("Mouse clicked at", mouseX, mouseY);
}
