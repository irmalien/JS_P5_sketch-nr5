
let quantity = 2;
const objArr = []
let gui;


function preload(){
  colorsData = loadJSON("data/palettes.json");
}



function setup() {
  selectPalette(false, false, 5);
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
      objArr.push(new Atom(random(width), random(height), objSettings))
  }

  // remove objects
  if(objArr.length>objScene.quantity){
    objArr.splice(0, 1);
  }

  // remove objects over lifespan limit
  for(let i = objArr.length-1; i >= 0; i-- ){
    if (!objArr[i].particleIsAlive()){
      objArr.splice(i, 1);
    }
  }

  // set values for all objects or for last object
  if(objScene.globalValues){
    for(let i = objArr.length-1; i >= 0; i-- ){
      objArr[i].setValues(objSettings)
    }
  }

  //move and draw
  for(let i = objArr.length-1; i >= 0; i-- ){
  objArr[i].resizeParticle();
  objArr[i].moveParticle();
  objArr[i].drawParticle();
  }



}


class initScene {
  constructor(){
    this.globalValues = false;
    this.quantity = 5;
    this.clearBackground = () => {
      background(0)
    }
  }
};

class initColors {
  constructor(){
    this.color1 = { h: colArray[0][0], s: colArray[0][1]/100, v: colArray[0][2]/100 };
    this.color2 = { h: colArray[1][0], s: colArray[1][1]/100, v: colArray[1][2]/100 };
    this.color3 = { h: colArray[2][0], s: colArray[2][1]/100, v: colArray[2][2]/100 };
    this.color4 = { h: colArray[3][0], s: colArray[3][1]/100, v: colArray[3][2]/100 };
    this.color5 = { h: colArray[4][0], s: colArray[4][1]/100, v: colArray[4][2]/100 };
    this.clearBackground = selectPalette(false, false, 5);
  }
};

class initSettings {
  constructor(){
    this.flexibleValues = true;
    this.lifespan = 100;
    this.lifespanMaxValue = 1000;
    this.size = 5;
    this.sizeVariation = 0;
    
    this.speed = 10
    this.vertical = 0;
    this.horisontal = 0;
    this.perlin = 50;
    this.tremble = 10;
    this.scatter = 0
  }

};

function createGUI() {
  objScene = new initScene();
  objSettings = new initSettings();
  gui = new dat.GUI();
  gui.remember(objSettings)
  let f0 = gui.addFolder('Scene');
  f0.add(objScene, 'globalValues');
  f0.add(objSettings, 'flexibleValues');
  f0.add(objScene, 'quantity', 0).step(1);
  f0.add(objScene, 'clearBackground')

  let f1 = gui.addFolder('Particle');
  f1.add(objSettings, 'lifespan', 1, objSettings.lifespanMaxValue).step(1);
  f1.add(objSettings, 'size', 1, 100).step(1);
  f1.add(objSettings, 'sizeVariation', 0, 100).step(1);
  
  let f2 = gui.addFolder('Dynamics');
  f2.add(objSettings, 'speed', 0, 100).step(1);
  f2.add(objSettings, 'vertical', -1, 1).step(0.1);
  f2.add(objSettings, 'horisontal', -1, 1).step(0.1);
  f2.add(objSettings, 'perlin', 0, 100).step(1);
  f2.add(objSettings, 'tremble', 0, 100).step(1);
  f2.add(objSettings, 'scatter', 0, 5).step(0.1);

  // let f3 = gui.addFolder('Colors');
  // objColors = new initColors();
  // f3.addColor(objColors, 'color1');
  // f3.addColor(objColors, 'color2');
  // f3.addColor(objColors, 'color3');
  // f3.addColor(objColors, 'color4');
  // f3.addColor(objColors, 'color5');
  
  f1.open();
  f2.open();
};