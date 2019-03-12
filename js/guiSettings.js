//
function setColorsToParticles () {
  for(let i = particleArr.length-1; i >= 0; i-- ){
    particleArr[i].setColor(colorScheme);
  }
}

function createGUI() {
  let f0 = gui.addFolder('Scene');
  f0.add(scene, 'quantity', 1,200).step(1).listen();
  f0.add(particleSettings, 'mode', [ 'normal', 'random', 'global' ] );
  var controller = f0.add(scene, 'quality', [ 'normal', 'good', 'great' ] );
  f0.add(scene, 'clearBackground');
  f0.add(scene, 'downloadImage');
  f0.add(scene, 'pausePlay');
  controller.onChange(() => {
    clear();
    scene.resizeCanvasQuality(scene.quality);
    scene.fitCanvasToScreen();
  });
  

  let f1 = gui.addFolder('Particle');
  f1.add(particleSettings, 'lifespan', 1, particleSettings.lifespanMaxValue).step(1).listen();
  f1.add(particleSettings, 'size', 1, 100).step(1).listen();
  f1.add(particleSettings, 'sizeVariation', 0, 100).step(1).listen();
  f1.add(particleSettings, 'roundness', 0, 100).step(1).listen();
  
  let f2 = gui.addFolder('Dynamics');
  f2.add(particleSettings, 'speed', 0, 100).step(1).listen();
  f2.add(particleSettings, 'movement', 0, 100).step(1).listen();
  f2.add(particleSettings, 'vertical', -100, 100).step(1).listen();
  f2.add(particleSettings, 'horisontal', -100, 100).step(1).listen();
  f2.add(particleSettings, 'tremble', 0, 100).step(1).listen();
  f2.add(particleSettings, 'scatter', 0, 100).step(1).listen();

  let f3 = gui.addFolder('Colors');
  f3.addColor(colorScheme.hexColors, 'color1').listen();
  f3.addColor(colorScheme.hexColors, 'color2').listen();
  f3.addColor(colorScheme.hexColors, 'color3').listen();
  f3.addColor(colorScheme.hexColors, 'color4').listen();
  f3.addColor(colorScheme.hexColors, 'color5').listen();
  f3.add(colorScheme, 'opacity', 0, 100).step(1).listen();
  f3.add(colorScheme, 'precision', 0,100).step(1).listen();
  f3.add(colorScheme, 'changePalette').listen();
  f3.add(colorScheme, 'updateColors');
  f0.open();
  f1.open();
  f2.open();
};