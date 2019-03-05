
let quantity = 2;
const objArr = []
let gui;
let colorsData;

function preload(){
  colorsData = loadJSON("data/palettes.json");

}



function setup() {
  scene.canvas = createCanvas(scene.canvasWidth, scene.canvasHeight);
  scene.canvas.class("canvasClass");
  scene.canvas.id("canvasId");
  scene.wrapCanvas("canvasId");
  colorMode(HSL, 360,100,100);
  createGUI()
  // window.addEventListener('resize', scene.fillCanvasToScreen, false);
  scene.fillCanvasToScreen();
}


function draw() {
  // add objects
  if(objArr.length<objScene.quantity){
    if(objSettings.randomValues){
      objSettings.randomize()
    }
    objArr.push(new Particle(random(width), random(height), objSettings, objColors))
  }

  // remove objects
  if(objArr.length>objScene.quantity){
    objArr.splice(0, 1);
  }

  // set values for all objects or for last object
  if(objScene.globalValues){
    for(let i = objArr.length-1; i >= 0; i-- ){
      objArr[i].setValues(objSettings)
    }
  }

  //move and draw
  for(let i = objArr.length-1; i >= 0; i-- ){
    objArr[i].particleIsAliveOrResurrected();
    objArr[i].resizeParticle();
    objArr[i].moveParticle();
    objArr[i].drawParticle();
  }

}

