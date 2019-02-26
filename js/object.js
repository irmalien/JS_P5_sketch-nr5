class Rose {
  constructor() {

    //SECRET FORMULA
    this.n = 50               //nominator
    this.d = 10               //denominator
    this.k = this.n / this.d; //denominator/nominator
    this.c = 5;               //number or corners
    this.size = height * random(0.2, 0.7);
    
    this.lineWeight = this.size / 2500;
    this.playspeedMultiplier = random(0.02,0.1)
    this.playspeed = (this.playspeedMultiplier/width)
    this.color = [random(0,360), 60, 80];
    this.colorStep = random(170, 300)/width;

    this.trail = {
      size:    10,
      distance: 0.0001,
      rotation: mobileVersion(0.005, 0.01), //random(0.001,0.005), //0.005,
      minimumAlfa: 1,
      alfa: 1,
      alfastep: 10 //to be changed in drawTrail()
    }

    this.translatePosition = {
      position: mobileVersion(-800, -400),
      stepDistance: 1,
      numberOfSteps(){
        return width/this.stepDistance
      },
      increaseDistance(){
        this.position +=this.stepDistance
      }
    }
    this.init();
  }

  //PRIMARY FUNCTIONS
  init() {
    this.randomizeDNKC();
    // this.styleA();
    let randomize = random(1)
    if (randomize<.4){
      this.styleB()
    }
    else{
      this.styleA()
    }
    this.playspeed = this.playspeed*this.translatePosition.stepDistance;

  }
  move() {
    this.updateDNK(this.playspeed);
    this.resetDNK();
    this.translatePosition.increaseDistance();
  }
  draw() {
    this.loopHue();
    this.drawTrail();
  }

  //SECONDARY FUNCTIONS
  styleA(){
    this.size = height * random(0.5, 0.8);
    this.trail.size = random(5,10);
    this.trail.distance = 0.0001;
    this.trail.minimumAlfa = 0.5;
    this.translatePosition.stepDistance = mobileVersion(2, 1);
    console.log("small")

  }
  styleB(){
    this.trail.size = random(20,100);
    this.trail.distance = 0.001;
    this.trail.minimumAlfa = 0.3;
    this.translatePosition.stepDistance = mobileVersion(3, 1);
    console.log("big")
  }


  updateDNK(_increment) {
    this.n = this.n - _increment;
    this.d = this.d + _increment;
    this.k = this.n / this.d;
  }
  resetDNK(){
    if (this.n <1 || this.d <1){
      this.playspeed = -this.playspeed;
    }
  }
  randomizeDNKC(){
    this.n = random(5,15)                
    this.d = random(1,2)                
    this.k = this.n / this.d;
    this.c = 3;
  }
  randomizeHue(){
    this.color[0]=random(0,360)
  }
  loopHue(){
    this.color[0] = this.color[0]+this.colorStep;
    if(this.color[0]>=360){
      this.color[0]=0
    }
  }


  drawTrail() {
    let tempAlfa = this.trail.alfa;
    this.trail.alfastep = this.trail.alfa/this.trail.size;

    for (let i = 0; i <= this.trail.size; i++) {
      let tempC = this.c + (i * (this.trail.distance));
      tempAlfa = tempAlfa - this.trail.alfastep;

      rotate(this.trail.rotation);
      noFill()
      stroke(this.color[0], this.color[1], this.color[2], tempAlfa);
      strokeWeight(this.lineWeight);
      
      blendMode(SCREEN);
      // if (i < this.trail.size / 1.5) {
      //   blendMode(SCREEN);
      // } else {
      //   blendMode(NORMAL);
      // }

      this.drawRose(this.size, this.d, this.k, tempC)

    }
  }
  drawRose(_size, _d, _k, _c){
    beginShape();
    for (let a = TWO_PI / _c; a < TWO_PI * _d; a += TWO_PI / _c) {
      const r = _size * cos(_k * a)
      const x = r * cos(a);
      const y = r * sin(a);
      vertex(x, y);
    }
    endShape();
  }

  //SETTERS
  set newSize(value){
    this.size=this.size+value;
  }

  set newPlayspeed(value){
    if (value){
      this.playspeed = this.playspeed*2
    }
    else{
      this.playspeed = this.playspeed/2
    }
  }

  set newAlfa(value){
    this.trail.alfa = this.trail.minimumAlfa/value;
    if(this.trail.alfa<0.08){this.trail.alfa = 0.08}
    
  }

  //GETTERS
  get NewTranslatePosition(){
    return this.translatePosition.position;
  }
}


