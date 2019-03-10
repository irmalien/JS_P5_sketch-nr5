
const objArr = []
let gui;
let colorsData;
let counter = 0;

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
  // scene.fillCanvasToScreen();

  document.getElementById("canvasId").addEventListener('click', function (event) {
    objScene.quantity++;
    if(objSettings.mode==='random'){
      objSettings.randomize()
    }
    objArr.push(new Particle(mouseX, mouseY, objSettings, objColors))
  }, false);
}

function draw() {
  // add objects
  if(objArr.length<objScene.quantity){
    if(objSettings.mode==='random'){
      objSettings.randomize()
    }
    objArr.push(new Particle(random(width), random(height), objSettings, objColors))
  }

  // remove objects
  if(objArr.length>objScene.quantity){
    objArr.splice(0, 1);
  }

  // set values for all objects or for last object
  if(objSettings.mode==='global'){
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

  //autoDownload
  counter++
  if(counter===1000 || counter===2500 || counter===5000 || counter===10000){
    saveCanvas(this.titleShort, 'png');
    console.log("saved", counter)
  };
  if(counter===10500){
    location.reload();
    console.log("reload")
  }
}

