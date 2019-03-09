
class InitScene {
  constructor(){
    this.mode = 'random';
    this.globalValues = false;
    this.quantity = floor(random(50));
    this.clearBackground = () => {
      clear();
      // scene.fillCanvasToScreen();
    }
    this.pausePlay = () => {
      if (scene.looping) {
        noLoop()
        scene.looping = false;
        console.log("paused");
      } else {
        loop()
        scene.looping = true;
        console.log("played");
      }
    }
    this.downloadImage = () => {
      saveCanvas(scene.titleShort, 'png')
    }
    this.updateColors = () => {
      for(let i = objArr.length-1; i >= 0; i-- ){
        objArr[i].setColor(objColors);
      }
    }
  }
};

class InitSettings {
  constructor(){
    this.flexibleValues = true;
    this.randomValues = true;
    this.lifespan = 500;
    this.lifespanMaxValue = 1000;
    this.size = 5;
    this.sizeVariation = 50;
    this.roundness = 90;
    this.opacity = 100;

    this.speed = 50
    this.movement = 10;
    this.vertical = 0;
    this.horisontal = 0;
    this.tremble = 10;
    this.scatter = 0
    this.randomize = () => {
      this.lifespan = coinFlip(random(100), random(100,1000), .7);
      this.size = coinFlip(random(10), coinFlip(random(10,40), random(40,100), .95), .95);
      this.sizeVariation = random(100);
      this.roundness = coinFlip(random(50), random(50,100), .1);
      this.opacity = map(this.size, 100,0,0,100);
      
      this.speed = randomGaussian(30,5);
      this.movement = random(100);
      this.vertical = randomGaussian(0,10);
      this.horisontal = randomGaussian(0,10);
      this.tremble = coinFlip(random(10), random(100), .9);
      this.scatter = coinFlip(random(10), random(100), .9);
      
      ;
    }
  }

};

function createGUI() {
  objScene = new InitScene();
  objSettings = new InitSettings();
  objColors = new Color(colorsData);
  gui = new dat.GUI();
  // gui.remember(objSettings)

  let f0 = gui.addFolder('Scene');
  f0.add(objScene, 'quantity', 0).step(1);
  f0.add(objScene, 'mode', [ 'normal', 'random', 'global' ] );
  // f0.add(objScene, 'globalValues');
  // f0.add(objSettings, 'flexibleValues');
  // f0.add(objSettings, 'randomValues');
  f0.add(objScene, 'clearBackground');
  f0.add(objScene, 'downloadImage');
  f0.add(objScene, 'pausePlay');

  

  let f1 = gui.addFolder('Particle');
  f1.add(objSettings, 'lifespan', 1, objSettings.lifespanMaxValue).step(1).listen();
  f1.add(objSettings, 'size', 1, 100).step(1).listen();
  f1.add(objSettings, 'sizeVariation', 0, 100).step(1).listen();
  f1.add(objSettings, 'roundness', 0, 100).step(1).listen();
  f1.add(objSettings, 'opacity', 0, 100).step(1).listen();
  
  let f2 = gui.addFolder('Dynamics');
  f2.add(objSettings, 'speed', 0, 100).step(1).listen();
  f2.add(objSettings, 'movement', 0, 100).step(1).listen();
  f2.add(objSettings, 'vertical', -100, 100).step(1).listen();
  f2.add(objSettings, 'horisontal', -100, 100).step(1).listen();
  f2.add(objSettings, 'tremble', 0, 100).step(1).listen();
  f2.add(objSettings, 'scatter', 0, 100).step(1).listen();

  let f3 = gui.addFolder('Colors');
  objColors.processColorPallete();
  f3.addColor(objColors.hexColors, 'color1').listen();
  f3.addColor(objColors.hexColors, 'color2').listen();
  f3.addColor(objColors.hexColors, 'color3').listen();
  f3.addColor(objColors.hexColors, 'color4').listen();
  f3.addColor(objColors.hexColors, 'color5').listen();
  f3.add(objColors, 'precision', 0,100).listen();
  f3.add(objColors, 'changePalette').listen();
  f3.add(objScene, 'updateColors');
  f0.open();
  f1.open();
  f2.open();
};