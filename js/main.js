
let quantity = 2;
const objArr = []

let autosave = false;
let initSave = false;
let initFadeout = false;
let initReset = false
let fadeOutAlfa = 0;

function setup() {
    scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
    scene.canvas.class("canvasClass");
    scene.canvas.id("canvasId");
    scene.wrapCanvas("canvasId");
    colorMode(HSL, 360,100,100);
    // window.addEventListener('resize', scene.fillCanvasToScreen, false);
    scene.fillCanvasToScreen();
    for(let i = 0; i < quantity; i++ ){
      objArr.push(new Rose())
    }
    canvasOffset = -width/4;
}

function draw() {
  translate(0, height / 2);
  frameRate(scene.fps)
  let distanceAfterWidth = mobileVersion(1.5, 2)
  // Remove objects if out of range
  for(let i = objArr.length-1; i >= 0; i-- ){
    if(objArr[i].NewTranslatePosition>width*distanceAfterWidth){
      objArr.splice(i, 1);
      initFadeout = true;
      initSave = true;
    }
  }

  // Save image and pause
  if(!objArr.length && initSave){
    if(autosave){
      saveCanvas(this.titleShort, 'png')
    }
    scene.pause(1500);
    initSave = false;
  }
  
  // Fade to black
  if(!objArr.length && initFadeout){
    fadeOutAlfa += .05;
    background(0, 0.05);
    if (fadeOutAlfa>=1){
      initFadeout = false;
      initReset = true
      fadeOutAlfa = 0;
      clear();
      scene.fillCanvasToScreen()
    }
  } 

  // Restart scene
  if(!objArr.length && initReset){
    quantity = floor(random(1,2));
    for(let i = 0; i <= quantity; i++ ){
      objArr.push(new Rose())
    }
    initReset = false;
  }

  for(let i = objArr.length-1; i >= 0; i-- ){
    push();
    translate(objArr[i].NewTranslatePosition, 0)
    objArr[i].newAlfa = objArr.length;
    objArr[i].move();
    objArr[i].draw();
    pop();
  }
}
