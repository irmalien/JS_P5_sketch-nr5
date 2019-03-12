class Particle {
  constructor(_x, _y, _particle, _color=undefined) {    
    //POSITION default values
    this.position = {
      x: _x,
      y: _y,

      edgeless: (_pos) => {
        if (_pos.x > width){_pos.x = 0};
        if (_pos.x < 0){_pos.x = width};
        if (_pos.y > height){_pos.y = 0};
        if (_pos.y < 0){_pos.y = height};
        return _pos
      }
    }

    //CIRCLE default values
    this.circleSettings = {}

    //COLOR
    this.color=new Color(_color);

    //PERLIN
    this.perlin = generatePerlinArr()

    this.xoffSizeIncrement = random(0.05,0.005);
    this.randomnessConst = 2;

    // OBJECTS
    this.circleObj = new Circle()

    //FUNCTIONS
    this.setValues(_particle);
    this.setColor(_color);
    this.gaussianValues();


    //EXTRAS
    this.count=0;
    this.alive=true;
    this.dead=false;
    
  }

  //====INITIALIZE===================
  setValues(_particle){
    //OBJECT
    this.mode =_particle.mode;
    this.flexibleValues = _particle.flexibleValues;
    this.lifespan = _particle.lifespan;
    this.lifespanMaxValue = _particle.lifespanMaxValue;
    this.deathspan = (_particle.lifespanMaxValue-_particle.lifespan)/10;

    let relativeSize = 1+(width*0.0001);
    this.circleSettings.sizeConst = (_particle.size**relativeSize)/2;
    this.circleSettings.size = this.circleSettings.sizeConst;
    this.circleSettings.sizeRand = _particle.sizeVariation;
    this.circleSettings.roundness = _particle.roundness;
    this.circleSettings.smoothness = this.circleSettings.roundness
    this.circleSettings.sizeAmplitude = map(this.circleSettings.sizeRand, 0, 100, 0, this.circleSettings.sizeConst);

    //DYNAMICS
    this.movSpeed = _particle.speed/200;
    this.movVer = _particle.vertical/100;
    this.movHor = _particle.horisontal/100;

    this.movScatter = _particle.scatter/200;
    this.movRandX = (_particle.movement**2)/100000;
    this.movRandY = this.movRandX
    this.movTremble = (_particle.tremble**2)/10000;
  }
  setColor(_color){
    this.color.new = _color;
  }

  gaussianValues(){
    this.lifespan = randomGaussian(this.lifespan, this.lifespan/this.randomnessConst);
    this.circleSettings.sizeConst = randomGaussian(this.circleSettings.sizeConst, this.circleSettings.sizeConst/this.randomnessConst);
    this.movSpeed = randomGaussian(this.movSpeed, this.movSpeed/this.randomnessConst);
    this.circleObj.newZoff = random(1000);
  }

  //====MAIN FUNCTIONS
  particleIsAliveOrResurrected(){
    this.count++;
    let lifespanIsEternal = (this.lifespan>=this.lifespanMaxValue) ? true : false;

    //kill particle
    if (!lifespanIsEternal && this.count>this.lifespan){
      this.alive=false;
      //remove particle from array
      if (this.lifespan < 0 || this.circleSettings.sizeConst < 0 || this.movSpeed < 0){
        this.dead = true;
        // console.log("Remove particle", this.lifespan, this.circleSettings.sizeConst, this.movSpeed)
      }
      //ressurect
      if(this.count>this.lifespan+this.deathspan){
        this.alive=true;
        this.count=0;
        this.position.x = random(0,width);
        this.position.y = random(0,height);
        if(this.mode==="random"){
          this.gaussianValues();
        }
        else{
          this.circleObj.newZoff = random(1000);
        }
      }

    }


  }

  resizeParticle(){
    if(this.circleSettings.sizeRand<100){
      this.perlin[3] += this.xoffSizeIncrement;
      this.circleSettings.size = changeValueWithAmplitude(this.circleSettings.sizeConst, this.perlin[3], this.circleSettings.sizeAmplitude)
    }
  }

  moveParticle(){
    // this.perlin.move();
    if(this.movHor || this.movVer){
      this.position = this.moveDirection(this.position, this.circleSettings.size, this.movHor, this.movVer);
    }
    if(this.movScatter){
      this.position = this.moveScatter(this.position, this.circleSettings.size, this.movScatter);
    }
    if(this.movTremble){
      this.perlin[0] += this.movTremble;
      this.position = this.movePerlin(this.position, this.circleSettings.size, this.movSpeed/5, this.perlin[0]);
    }
    if(this.movRandX || this.movRandY){
      this.perlin[1] += this.movRandX;
      this.perlin[2] += this.movRandY;
      this.position = this.movePerlin(this.position, this.circleSettings.size, this.movSpeed, this.perlin[1], this.perlin[2]);
    }
    this.position = this.position.edgeless(this.position);
  }


  drawParticle(){
    if(this.alive){
      noStroke();
      fill(this.color.perlin[0], this.color.perlin[1], this.color.perlin[2], this.color.opacity);
      
      this.circleObj.draw(this.position, this.circleSettings);
    }
  }


  //====SUPPORTIVE FUNCTIONS
  moveDirection(_pos, _size, _valueX, _valueY){
    _pos.x = _pos.x + (_size * _valueX);
    _pos.y = _pos.y + (_size * _valueY);
    return _pos;
    
  }
  moveScatter(_pos, _size, _value){
    _pos.x = _pos.x + random(-_size*_value, _size*_value);
    _pos.y = _pos.y + random(-_size*_value, _size*_value);
    return _pos;
  }

  movePerlin(_pos, _size, _value, _xoffX, _xoffY){
    if(_xoffY === undefined){
      _xoffY=_xoffX;
    }
    _pos.x = _pos.x + map(noise(_xoffX), 0, 1, _size*-_value, _size*_value);
    _pos.y = _pos.y + map(noise(_xoffY), 0, 1, _size*-_value, _size*_value);
    return _pos;
  };

  //====UNUSED 
  mirrorX(){
    let x2;
    let fullSize = width;
    let halfSize = width;
    let remainSize = fullSize-halfSize;

    if (this.position.x > halfSize){this.position.x = 0};
    if (this.position.x < 0){this.position.x = halfSize};
    if (this.position.y > height){this.position.y = 0};
    if (this.position.y < 0){this.position.y = height};
    this.show(this.position.x, this.position.y);
    x2 = map(this.position.x, 0, halfSize, fullSize, remainSize);
    this.show(x2, this.position.y);
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

    if (this.position.x > halfX){this.position.x = 0};
    if (this.position.x < 0){this.position.x = halfX};
    if (this.position.y > halfY){this.position.y = 0};
    if (this.position.y < 0){this.position.y = halfY};
    x2 = map(this.position.x, 0, fullX, halfX, remX);
    y2 = map(this.position.y, 0, fullY, halfY, remY);

    this.show(this.position.x, this.position.y);
    this.show(x2, this.position.y);
    this.show(this.position.x, y2);
    this.show(x2, y2);

  }
}