var mic;
var x = 0;
var y = 0;
var y_v = 0;
var y_f = 0;
var speech;
var timer = 1;



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
  strokeWeight(4);
  line(0, 2.6*height/3, width, 2.6*height/3)
  // top line
  line(0, height/5.4 + width/38.4, width, height/5.4 + width/38.4)

  console.log(y_f);

  // obstacles

  var y_base = 2.6*height/3;

  if ((voiceBall.x + x > width/2 + 200 && voiceBall.x + x < width/2 + 500 && voiceBall.y - y_v*volume + y_f < height - 300) || (voiceBall.y - y_v*volume + y_f < height - 300 && voiceBall.y - y_v*volume + y_f > height/5.4 + width/38.4 + 250 && voiceBall.x + x > width/2 + 500 && voiceBall.x + x < width - 200)) {
    volume = map(volume, 0, 1, 0, 1);
    y_f += 2;
  } else if (voiceBall.x + x < width/2) {
    y_f = 0;
  }
  if (voiceBall.x + x > width/2 + 200 && voiceBall.x + x < width - 200 && voiceBall.y - y_v*volume + y_f > height - 300) {
    voiceBall.x = 0 - 300;
    voiceBall.y = 2.6*height/3;

  }

  var distance = int(dist(voiceBall.x + x, voiceBall.y - y_v*volume + y_f, 300, height/2 + 100));


  if (distance < 100 && voiceBall.y - y_v*volume + y_f < height/2 + 100) {
      fill(0);
      voiceBall.x = width/3.2; // 600px
      voiceBall.y = height/5.4; // 200 px
      //volume = map(volume, 0, 1, 0, 1);

  } else if (voiceBall.y - y_v*volume + y_f > height/2 + 100) {
    fill(255);
  }

  stroke(0);
  strokeWeight(4);
  // bottom circle (portal)
  circle(300, height/2 + 100, 100);
  // top circle
  circle(width/3.2, height/7, 100);

  // top hole
  fill(255);
  noStroke();
  rect(width/2 + 200, height/5.4, 300, height/5.4);
  stroke(1);
  fill(0);
  rect(width/2 + 200, height/5.4 + width/39.5, 10, 700);
  rect(width/2 + 500, height/5.4 + width/38.4 + 200, 10, -600);
  fill('red');
  noStroke();
  rect(width/2 + 210,  height - 300 + width/38.4, 580, 231 - width/38.4);
  // rect(width/2 + 500, height/5.4 + width/38.4, 600, 250);
  fill(0);
  // exit
  rect(width - width/7,  height - 119 + width/38.4, 400, -700);

  // instrunctions

  fill(0);
  textSize(19);
  text("Left or Right arrows to move left/right", 30 ,50);
  text("Hold Down the Space Bar and make noise to jump", 30, 80);

  textSize(45);
  fill(255);
  text("EXIT", width - width/8,  height - 550 + width/38.4 )

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
    volume = map(volume, 0, 1, 0, height -300);

    // if (this.x > width/2 + 200 && this.x < width/2 + 500) {
    //   console.log("0k");
    //   y_f += 20;
    // } else if (this.x < width/2) {
    //   y_f = 0;
    // }

    if (keyIsDown(32) && ((volume > width/10.8) || (this.x + x > width/2 + 500 && this.y - y_v*volume + y_f > height/5.4 + width/38.4 + 250 /*&& voiceBall.y - y_v*volume + y_f < height - 300*/))) {
      y_v = 1;
    } else {
      y_v = 0;
    }


    if (keyIsDown(LEFT_ARROW) && ((this.x + x > 0 + r && this.x + x < width/2 + 200)  || (this.x + x > width/2 + 200 + r &&  this.x + x < width))) {
      x -= 6;
    }

    if (keyIsDown(RIGHT_ARROW) && ((/*this.x + x < width - r &&*/ this.x + x < width/2 + 200 - r && this.y - y_v*volume + y_f > height/5.4 + width/38.4) || (this.y - y_v*volume + y_f < height/5.4 + width/38.4 && this.x + x > 0) || (this.x + x > width/2 + 200  && this.x + x < width/2 + 500) || (this.x + x > width/2 + 500 && this.x + x < width - 250 && this.y - y_v*volume + y_f > height/5.4 + width/38.4 + 250))) {
      x += 6;
    }

    fill(255);
    stroke(0);
    strokeWeight(4);
    ellipseMode(CENTER);
    ellipse(this.x + x, this.y - y_v*volume + y_f, this.size);
  }
}
// function triggerVoice() {
//   tr++;
//   if (tr == 1) {
//     console.log("changeColor = " + changeColor);
//     speech.setVoice("Google UK English Male");
//     speech.speak("good ball");
//   speech.onEnd();}
//
//   else {
//     tr = 0;
//   }



  // console.log(speech.listVoices());
//}
