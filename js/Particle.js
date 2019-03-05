class Particle {
  constructor(_x, _y, _particle, _color=undefined) {    
    //POSITION
    this.x = _x;
    this.y = _y;
    
    //VALUES
    this.setValues(_particle);
    if(this.flexibleValues){
      this.gaussianValues();
    };
    this.sizeAmplitude = this.setSizeAmplitude(this.sizeConst, this.sizeRand);


    //COLOR
    this.setColor(_color);

    //PERLIN
    this.xoffX = random(1000);
    this.xoffY = random(1000);
    this.xoffZ = random(1000);
    this.xoffSize = random(1000);
    this.xoffSizeIncrement = random(0.05,0.005);
    this.xoffCol = random(1000);

    //OBJECT TYPE
    //TODO solve how to apply in different situations
    // this.type = this.selectType(0.5, 0.9, 1);

    //EXTRAS
    this.count=0
    
  }

  //====INITIALIZE===================
  setValues(_particle){
    //OBJECT
    this.flexibleValues = _particle.flexibleValues;
    this.lifespan = _particle.lifespan;
    this.lifespanMaxValue = _particle.lifespanMaxValue
    this.sizeConst = (_particle.size**1.1)/2
    this.sizeRand = _particle.sizeVariation;
    this.opacity = _particle.opacity/100;

    //DYNAMICS
    this.movSpeed = _particle.speed/200;
    this.movVer = _particle.vertical/100;
    this.movHor = _particle.horisontal/100;

    this.movScatter = _particle.scatter/200;
    this.movRandX = (_particle.movement**2)/100000; 
    this.movRandY = (_particle.movement**2)/100000;
    this.movTremble = (_particle.tremble**2)/10000;
  }
  setColor(_color){
    this.color = _color.hexToHSL(_color.hexColors.randomColor());
  }

  gaussianValues(){
    this.lifespan = randomGaussian(this.lifespan, this.lifespan/2)
    this.sizeConst = randomGaussian(this.sizeConst, this.sizeConst/2)
    this.movSpeed = randomGaussian(this.movSpeed, this.movSpeed/2)
  }

  //====MAIN FUNCTIONS
  particleIsAliveOrResurrected(){
    this.count++;
    if (!this.lifespanIsEternal() && this.count>this.lifespan){
      this.count=0;
      this.x = random(0,width);
      this.y = random(0,height);
    }

  }

  resizeParticle(){
    this.xoffSize += this.xoffSizeIncrement;
    this.size = this.changeSize(this.sizeConst, this.sizeAmplitude, this.xoffSize);
  }

  moveParticle(){
    this.xoffX += this.movRandX;
    this.xoffY += this.movRandY;
    this.xoffZ += this.movTremble;
    this.x = this.moveDirection(this.x, this.size, this.movHor)
    this.y = this.moveDirection(this.y, this.size, this.movVer);
    if(this.movScatter){
      this.x = this.moveScatter(this.x, this.size, this.movScatter);
      this.y = this.moveScatter(this.y, this.size, this.movScatter);
    }
    if(this.movTremble){
      this.x = this.movePerlin(this.x, this.size, -this.movSpeed/5, this.movSpeed/5, this.xoffZ);
      this.y = this.movePerlin(this.y, this.size, -this.movSpeed/5, this.movSpeed/5, this.xoffZ);
    }
    if(this.movRandX || this.movRandY){
      this.x = this.movePerlin(this.x, this.size, -this.movSpeed, this.movSpeed, this.xoffX);
      this.y = this.movePerlin(this.y, this.size, -this.movSpeed, this.movSpeed, this.xoffY);
    }

    this.edgeless();
  }

  drawParticle(){
    noStroke()
    fill(this.color[0], this.color[1], this.color[2], this.opacity)
    ellipse(this.x, this.y, this.size, this.size);
  }

  //====SUPPORTIVE FUNCTIONS
  lifespanIsEternal() {
    if(this.lifespan>=this.lifespanMaxValue){
      return true;
    }
    else{
      return false;
    }
  }

  setSizeAmplitude(size, sizeRand){
    let amplitude = map(sizeRand, 0, 100, 0, size);
    return amplitude;
  }

  changeSize(size, amplitude, xoff){
    return map(noise(xoff), 0, 1, size-amplitude, size+amplitude);
  }

  moveDirection(pos, radius, value){
    pos = pos + (radius * value);
    return pos;
  }
  moveScatter(pos, radius, value){
    pos = pos + random(-radius*value, radius*value);
    return pos;
  }
  movePerlin(pos, radius, x1, x2, xoff){
    x1 = radius*x1;
    x2 = radius*x2;
    pos = pos + map(noise(xoff), 0, 1, x1, x2);
    return pos;
  };

  edgeless(){
    if (this.x > width){this.x = 0};
    if (this.x < 0){this.x = width};
    if (this.y > height){this.y = 0};
    if (this.y < 0){this.y = height};
  }

  mirrorX(){
    let x2;
    let fullSize = width;
    let halfSize = width;
    let remainSize = fullSize-halfSize;

    if (this.x > halfSize){this.x = 0};
    if (this.x < 0){this.x = halfSize};
    if (this.y > height){this.y = 0};
    if (this.y < 0){this.y = height};
    this.show(this.x, this.y);
    x2 = map(this.x, 0, halfSize, fullSize, remainSize);
    this.show(x2, this.y);
  }

  mirrorXY(){
    let x2;
    let fullX = width;
    let halfX = width;
    let remX = halfX-halfX;
    let y2;
    let fullY = height;
    let halfY = height;
    let remY = fullY-halfY;

    if (this.x > halfX){this.x = 0};
    if (this.x < 0){this.x = halfX};
    if (this.y > halfY){this.y = 0};
    if (this.y < 0){this.y = halfY};
    x2 = map(this.x, 0, fullX, halfX, remX);
    y2 = map(this.y, 0, fullY, halfY, remY);

    this.show(this.x, this.y);
    this.show(x2, this.y);
    this.show(this.x, y2);
    this.show(x2, y2);

  }
}