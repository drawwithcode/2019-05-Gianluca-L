var mic;
var x = 0;
var y = 0;
var y_v = 0;
var y_f = 0;
var speech;




function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  var x_0 = width/15;
  var y_0 = 2.6*height/3;

  voiceBall = new Ball(x_0, y_0, width/38.4);

  mic = new p5.AudioIn();
  mic.start();

  speech = new p5.Speech();

}

function draw() {
  background(255);



  var volume = mic.getLevel();
  volume = map(volume, 0, 1, 0, height);

  // ground line
  stroke(0);
  strokeWeight(width/480);
  line(0, 2.6*height/3, width, 2.6*height/3)
  // top line
  line(0, height/5.4 + width/38.4, width, height/5.4 + width/38.4)

  console.log(y_f);

  // obstacles

  var y_base = 2.6*height/3;

  if ((voiceBall.x + x > width/2 + width/9.6 && voiceBall.x + x < width/2 + width/3.84 && voiceBall.y - y_v*volume + y_f < height - width/6.4) || (voiceBall.y - y_v*volume + y_f < height - width/6.4 && voiceBall.y - y_v*volume + y_f > height/5.4 + width/38.4 + width/7.68 && voiceBall.x + x > width/2 + width/3.84 && voiceBall.x + x < width - width/9.6)) {
    volume = map(volume, 0, 1, 0, 1);
    y_f += 2;
  } else if (voiceBall.x + x < width/2) {
    y_f = 0;
  }
  if (voiceBall.x + x > width/2 + width/9.6 && voiceBall.x + x < width - width/9.6 && voiceBall.y - y_v*volume + y_f > height - width/6.4) {
    voiceBall.x = 0 - width/6.4;
    voiceBall.y = 2.6*height/3;

  }

  var distance = int(dist(voiceBall.x + x, voiceBall.y - y_v*volume + y_f, width/6.4, height/2 + width/19.2));


  if (distance < width/19.2 && voiceBall.y - y_v*volume + y_f < height/2 + width/19.2) {
      fill(0);
      voiceBall.x = width/3.2; // 600px
      voiceBall.y = height/5.4; // 200 px
  } else if (voiceBall.y - y_v*volume + y_f > height/2 + width/19.2) {
    fill(255);
  }

  stroke(0);
  strokeWeight(width/480);
  // bottom circle (portal)
  circle(width/6.4, height/2 + width/19.2, width/19.2);
  // top circle
  circle(width/3.2, height/7, width/19.2);

  // top hole
  fill(255);
  noStroke();
  rect(width/2 + width/9.6, height/5.4, width/6.4, height/5.4);
  stroke(1);
  fill(0);
  rect(width/2 + width/9.6, height/5.4 + width/39.5, width/192, width/2.74);
  rect(width/2 + width/3.84, height/5.4 + width/38.4 + width/9.6 + width/38.4, width/192, -width/3.2);
  fill('red');
  noStroke();
  rect(width/2 + width/9.14,  height - width/6.4 + width/38.4, width/3.31, width/8.31 - width/38.4);
  fill(0);
  // exit
  rect(width - width/7,  height - 119 + width/38.4, width/4.8, -width/2.74);

  // instrunctions

  fill(0);
  textSize(width/101);
  text("Left or Right arrows to move left/right", 30 ,50);
  text("Hold Down the Space Bar and make noise to jump", 30, 80);

  textSize(width/42.67);
  fill(255);
  text("EXIT", width - width/8,  height - width/3.49 + width/38.4 )

  if (voiceBall.x + x > width - width/7) {
    speech.setVoice("Google UK English Male");
    speech.speak("Victory");
  }

  // method
  voiceBall.display();

}

function Ball(_x, _y, _diameter) {
  this.x = _x;
  this.y = _y;
  this.size = _diameter;

  this.display = function() {

    var r = this.size/2;
    var y_base = 2.6*height/3;

    var volume = mic.getLevel();
    volume = map(volume, 0, 1, 0, height -width/6.4);

    if (keyIsDown(32) && ((volume > width/10.8) || (this.x + x > width/2 + width/3.84 && this.y - y_v*volume + y_f > height/5.4 + width/38.4 + width/7.68))) {
      y_v = 1;
    } else {
      y_v = 0;
    }

    if (keyIsDown(LEFT_ARROW) && ((this.x + x > 0 + r && this.x + x < width/2 + width/9.6)  || (this.x + x > width/2 + width/9.6 + r &&  this.x + x < width))) {
      x -= width/320;
    }

    if (keyIsDown(RIGHT_ARROW) && ((/*this.x + x < width - r &&*/ this.x + x < width/2 + width/9.6 - r && this.y - y_v*volume + y_f > height/5.4 + width/38.4) || (this.y - y_v*volume + y_f < height/5.4 + width/38.4 && this.x + x > 0) || (this.x + x > width/2 + width/9.6  && this.x + x < width/2 + width/3.84) || (this.x + x > width/2 + width/3.84 && this.x + x < width - width/7.68 && this.y - y_v*volume + y_f > height/5.4 + width/38.4 + width/7.68))) {
      x += width/320;
    }

    fill(255);
    stroke(0);
    strokeWeight(width/480);
    ellipseMode(CENTER);
    ellipse(this.x + x, this.y - y_v*volume + y_f, this.size);
  }
}
