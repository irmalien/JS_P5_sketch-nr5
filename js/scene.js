class SceneClass {
  constructor() { 
    this.titleFull = "nr5",
    this.titleShort = "nr5",
    // canvasWidth: document.documentElement.clientWidth,
    // canvasHeight: document.documentElement.clientHeight,
    this.width = 4400,
    this.height = 2616,
    this.quality = 'good',
    this.canvas = createCanvas(this.width, this.height),
    this.canvas.class("canvasClass");
    this.canvas.id("canvasId");
    this.background = [0,0,0];


    //PLAY
    this.playLoop = true,
    this.playCount = 0,
    this.fps = 60,
    
    //OBJECTS in scene
    this.quantity = floor(random(10,50));

    //CALL METHODS
    this.clearBackground = () => {
      clear(); 
      this.resizeCanvasQuality(scene.quality)
      this.fitCanvasToScreen();
    }
    this.pausePlay = () => {
      if (this.playLoop) {
        noLoop()
        this.playLoop = false;
        console.log("paused");
      } else {
        loop()
        this.playLoop = true;
        console.log("played");
      }
    }
    this.downloadImage = () => {
      saveCanvas(scene.titleShort, 'png')
    }

    //INIT METHODS
    this.wrapCanvasInDIV(this.canvas.canvas.id, this.background);

  }

  wrapCanvasInDIV (_canvasId, _divColor) {
    const canvasWrapper = document.createElement('div');
    canvasWrapper.style.cssText = `position:absolute;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:hsl(${_divColor[0]}, ${_divColor[1]}%, ${_divColor[2]}%);`;
    document.body.appendChild(canvasWrapper);
    canvasWrapper.appendChild(document.getElementById(_canvasId));
  }

  fitCanvasToScreen() {
    let c = document.getElementsByTagName('canvas');
    let px = /px/;
  
    for(let i =0; i<c.length; i++){
      let p1 = window.innerWidth/window.innerHeight;
      let p2 = c[i].style.width.replace(px, '')/c[i].style.height.replace(px, '');
      let w1w2 = window.innerWidth/c[i].style.width.replace(px, '')
      let h1h2 = window.innerHeight/c[i].style.height.replace(px, '')
  
      if(p1 > p2){
        let w = c[i].style.width.replace(px, '')*h1h2
        let h = c[i].style.height.replace(px, '')*h1h2
        c[i].style.width = `${w}px`;
        c[i].style.height = `${h}px`;
      }
      else{
        let w = c[i].style.width.replace(px, '')*w1w2
        let h = c[i].style.height.replace(px, '')*w1w2
        c[i].style.width = `${w}px`;
        c[i].style.height = `${h}px`;
      }
    }
  }

  resizeCanvasToScreen(){
    resizeCanvas(document.documentElement.clientWidth, document.documentElement.clientHeight);
  }

  resizeCanvasQuality(_quality){
    let multiplier;
    if(_quality === 'great'){multiplier=4}
    else if(_quality === 'good'){multiplier=2}
    else{multiplier=1};
    resizeCanvas(document.documentElement.clientWidth*multiplier, document.documentElement.clientHeight*multiplier);
  }

}