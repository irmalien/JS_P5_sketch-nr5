
let scene;
let gui;
const particleArr = []
const microParticleArr = []
let colorsData;


function preload(){
  colorsData = loadJSON("data/palettes.json");
}

function setup() {
  button = new GitButton("https://github.com/irmalien/JS_P5_sketch-nr5");
  scene = new SceneClass();
  particleSettings = new ParticleSettings();
  microParticleSettings = new ParticleSettings();
  colorScheme = new ColorScheme(colorsData);
  gui = new dat.GUI();
  createGUI();
  if (mobileVersion(false, true)){
    gui.close()
  }
  
  
  colorMode(HSL, 360,100,100);

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
    particleArr.push(new Particle(random(width), random(height), particleSettings, colorScheme))
    if(particleSettings.mode==='random'){
      particleSettings.randomize()
      colorScheme.randomize()
    }
    
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

  // Fade effect
  // if(scene.playCount%10==0){
  //   background(0,0,0,0.02)
  // }


  //micro particles effect
  let quantity = mobileVersion(200, 50)
  if(microParticleArr.length<quantity){
    microParticleSettings.micro();
    microParticleArr.push(new Particle(random(width), random(height), microParticleSettings, colorScheme))  
  }
  for(let i = microParticleArr.length-1; i >= 0; i-- ){
    microParticleArr[i].particleIsAliveOrResurrected();
    microParticleArr[i].resizeParticle();
    microParticleArr[i].drawParticle();
  }

  //autoDownload
  if(particleSettings.mode==='random'){
    scene.playCount++
    if(scene.playCount===5000 ){
      // saveCanvas(scene.titleShort, 'png');
    };
    if (scene.playCount===5100){
      scene.quantity = 0;
      colorScheme.changePalette();
      for(let i = microParticleArr.length-1; i >= 0; i-- ){
        microParticleArr[i].setColor(colorScheme);
      }
    }
    if (scene.playCount===5200){
      scene.quantity = floor(random(15,50));
    }
    if(scene.playCount===5300){
      scene.playCount = 0;
    }
  }

}
