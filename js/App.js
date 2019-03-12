
let scene;
let gui;
const particleArr = []
let colorsData;


function preload(){
  colorsData = loadJSON("data/palettes.json");
}

function setup() {
  scene = new SceneClass();
  particleSettings = new ParticleSettings();
  colorScheme = new ColorScheme(colorsData);
  gui = new dat.GUI();
  
  colorMode(HSL, 360,100,100);
  createGUI();
  window.addEventListener('resize', scene.fitCanvasToScreen, false);
  scene.canvas.canvas.addEventListener('click', function (event) {
    scene.quantity++;
    if(particleSettings.mode==='random'){
      particleSettings.randomize();
      colorScheme.randomize();
    }
    particleArr.push(new Particle(mouseX, mouseY, particleSettings, colorScheme))
  }, false);
  scene.resizeCanvasQuality(scene.quality);
  scene.fitCanvasToScreen();
}

function draw() {
  // add objects
  if(particleArr.length<scene.quantity){
    if(particleSettings.mode==='random'){
      particleSettings.randomize()
      colorScheme.randomize()
    }
    particleArr.push(new Particle(random(width), random(height), particleSettings, colorScheme))
  }

  // remove objects
  if(particleArr.length>scene.quantity){
    particleArr.splice(0, 1);
  }
  for(let i = particleArr.length-1; i >= 0; i-- ){
    if(particleArr[i].dead){
      particleArr.splice(i, 1);
      scene.quantity = coinFlip(scene.quantity-1,  scene.quantity+2, 0.8)
    }
  }

  // set values for all objects or for last object
  if(particleSettings.mode==='global'){
    for(let i = particleArr.length-1; i >= 0; i-- ){
      particleArr[i].setValues(particleSettings)

    }
  }



  //move and draw
  for(let i = particleArr.length-1; i >= 0; i-- ){
    particleArr[i].particleIsAliveOrResurrected();
    particleArr[i].resizeParticle();
    particleArr[i].moveParticle();
    particleArr[i].drawParticle();
  }

  //autoDownload
  scene.playCount++
  if(scene.playCount===1000 || scene.playCount===2500 || scene.playCount===5000 || scene.playCount===10000){
    saveCanvas(scene.titleShort, 'png');
    console.log("saved", scene.playCount)
  };
  if(scene.playCount===10500){
    location.reload();
    console.log("reload")
  }
}

