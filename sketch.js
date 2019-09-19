// declare variables that store location of pupils

"use strict"
let pupilX;
let pupilY;


let x, y;
let angle1 = 0.0;
let angle2 = 0.0;
let segLength = 100;

let snowflakes = [];

let mic;
let h;



function setup() {
  createCanvas(400, 400);

  x = width * 0.5;
  y = height * 0.5;

  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();


  //please, play around with the following line

}


function draw() {

  let vol = mic.getLevel();
  h = map(vol, 0, 1, 20, 0);
  // moving background into draw eliminates trails
  background(220);

  // making stroke weight bigger 
  strokeWeight(3);

  pupilX = mouseX;
  pupilY = mouseY;

  // constrain pupilX and pupilY to fit inside eyes
  // (psuedo code for the if statements)

  // if mouseX is less than 100 (left side of eye), keep the pupil at 100 (make it stay inside the eye)
  // if mouseX is bigger than 125, keep the pupil at 125
  //... and then we added/substracted 5 to account for width of pupil...

  if (mouseX < 150) {
    pupilX = 155;
  } else if (mouseX > 195) {
    pupilX = 195;
  }

  // same deal with pupilY

  if (mouseY < 150) {
    pupilY = 155;
  } else if (mouseY > 195) {
    pupilY = 195;
  }


  // great now draw them




  drawHead();




  drawWhiteOfBackEye();

  drawBackPupil(pupilX, pupilY);

  drawWhiteOfFrontEye();

  drawFrontPupil(pupilX + 20, pupilY);

  drawBody();

  drawRightArm();
  drawLeftArm();

  drawNose();
  drawNoseInside();

  drawTeeth();

  drawsnowflake()
}





function drawHead() {
  push();
  translate(width / 2, height / 2);
  noStroke();
  for (let i = 0; i < 10; i++) {
    ellipse(0, 30, 35, 130);
    rotate(PI / 5);
  }

  stroke(255);

  strokeWeight(10);
  arc(0, 0, 280, 280, 0, PI);
  noStroke();
  pop();

}


function drawNose() {
  fill(255);
  ellipse(260, 250, 20, 20);
  fill(0);


  fill(255);
  ellipse(140, 250, 20, 20);
  fill(0);
}

function drawNoseInside() {
  push();
  fill(0);
  ellipse(260, 257, 13, 13);
  fill(255);


  fill(0);
  ellipse(140, 257, 13, 13);
  fill(255);

  pop();

}


function drawWhiteOfBackEye() {
  fill(255);
  stroke(0);
  rect(width / 2 - 50, height / 2 - 50, 50, 50);
}


function drawWhiteOfFrontEye() {
  fill(255);
  rect(width / 2, height / 2 - 50, 50, 50);
}


function drawBackPupil(xPos, yPos) {
  fill(0);
  circle(xPos, yPos, 10);
}


function drawFrontPupil(xPos, yPos) {
  fill(0);
  circle(xPos + 30, yPos, 10);
}

function drawBody() {
  push();
  translate(width / 2, height / 2);
  triangle(-width / 2, height / 2, 0, 0, width / 2, height / 2);
  pop();
}

function drawRightArm() {

  stroke(0);
  strokeWeight(15);

  //Change the angle of the segments according to the mouse positions
  angle1 = (mouseX / float(width) - 0.5) * -TWO_PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;

  //use push and pop to "contain" the transforms. Note that
  // even though we draw the segments using a custom function,
  // the transforms still accumulate
  push();
  segment(x + 50, y + 50, angle1);
  segment(segLength, 0, angle2);
  pop();
  noStroke();
}

function segment(x, y, a) {
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
}

function drawLeftArm() {

  stroke(0);
  strokeWeight(15);

  //Change the angle of the segments according to the mouse positions
  angle1 = (mouseX / float(width) - 0.5) * -TWO_PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;

  //use push and pop to "contain" the transforms. Note that
  // even though we draw the segments using a custom function,
  // the transforms still accumulate
  push();
  segment(x - 50, y + 50, angle1);
  segment(segLength, 0, angle2);
  pop();
  noStroke();
}

function segment(x, y, a) {
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
}

function drawTeeth() {

  push();

  fill(255);

  translate(0, -h);
  for (let x = 5.25; x < 7.5; x = x + 0.5) {

    triangle(x * 30, 350, x * 30 + 20, 350, x * 30 + 10, 330);
  }
  // pop();
  translate(0, h);
  for (let x = 5; x < 8; x = x + 0.5) {
    triangle(x * 30, 300, x * 30 + 20, 300, x * 30 + 10, 320);



  }
  pop();
}



function drawsnowflake() {
  push();
  fill(240);
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
  pop();
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}