class Particle {
  constructor(_x, _y, _particle, _color=undefined) {    
    //POSITION
   
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

    //VALUES
    this.circleParam = {
      sizeConst: 100,
      size: 100,
      sizeRand: 100,
      roundness: 100,
      smoothness: 100,
      amplitude: 0

      // map(this.circleParam.sizeRand, 0, 100, 0, this.circleParam.sizeConst)
    }
    this.alive=true;
    this.setValues(_particle);


    // CIRCLE
    this.circleObj = new Circle()

    this.gaussianValues();


    //COLOR
    this.color = {
      const: null,
      main: null,
      amplitude: null,
    }
    this.setColor(_color);

    //PERLIN
    this.perlin = {
      pos: (function() {
        let arr = [];
        for(let i=0; i<100; i++){
          arr.push(random(10000));
        }
        return arr
      })(),      
      move: () => {

        // this.position += increment;
      }
    }

    this.xoffSizeIncrement = random(0.05,0.005);
  
    //EXTRAS
    this.count=0
    
  }

  //====INITIALIZE===================
  setValues(_particle){
    //OBJECT
    this.flexibleValues = _particle.flexibleValues;
    this.lifespan = _particle.lifespan;
    this.lifespanMaxValue = _particle.lifespanMaxValue;
    this.deathspan = (_particle.lifespanMaxValue-_particle.lifespan)/10;

    let relativeSize = 1+(width*0.0001);
    this.circleParam.sizeConst = (_particle.size**relativeSize)/2;
    this.circleParam.size = this.circleParam.sizeConst;
    this.circleParam.sizeRand = _particle.sizeVariation;
    this.circleParam.roundness = _particle.roundness;
    this.circleParam.smoothness = this.circleParam.roundness
    this.circleParam.sizeAmplitude = map(this.circleParam.sizeRand, 0, 100, 0, this.circleParam.sizeConst);

    this.opacity = _particle.opacity/100;

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
    this.color.const = _color.hexToHSL(_color.hexColors.randomColor());
    this.color.main = _color.hexToHSL(_color.hexColors.randomColor());
    this.color.amplitude = map((_color.precision), 0,100, 50,0)
  }
  gaussianValues(){
    this.lifespan = randomGaussian(this.lifespan, this.lifespan/2);
    this.circleParam.sizeConst = randomGaussian(this.circleParam.sizeConst, this.circleParam.sizeConst/2);
    this.movSpeed = randomGaussian(this.movSpeed, this.movSpeed/2);
    this.circleObj.newZoff = random(1000);
  }

  //====MAIN FUNCTIONS
  particleIsAliveOrResurrected(){
    this.count++;
    let lifespanIsEternal = (this.lifespan>=this.lifespanMaxValue) ? true : false;

    //kill particle
    if (!lifespanIsEternal && this.count>this.lifespan){
      this.alive=false;
      //ressurect
      if(this.count>this.lifespan+this.deathspan){
        this.alive=true;
        this.count=0;
        this.position.x = random(0,width);
        this.position.y = random(0,height);
        this.gaussianValues();
      }

    }


  }

  resizeParticle(){
    if(this.circleParam.sizeRand<100){
      this.perlin.pos[3] += this.xoffSizeIncrement;
      this.circleParam.size = this.changeValueWithAmplitude(this.circleParam.sizeConst, this.perlin.pos[3], this.circleParam.sizeAmplitude)
    }
  }

  moveParticle(){
    // this.perlin.move();
    if(this.movHor || this.movVer){
      this.position = this.moveDirection(this.position, this.circleParam.size, this.movHor, this.movVer);
    }
    if(this.movScatter){
      this.position = this.moveScatter(this.position, this.circleParam.size, this.movScatter);
    }
    if(this.movTremble){
      this.perlin.pos[0] += this.movTremble;
      this.position = this.movePerlin(this.position, this.circleParam.size, this.movSpeed/5, this.perlin.pos[0]);
    }
    if(this.movRandX || this.movRandY){
      this.perlin.pos[1] += this.movRandX;
      this.perlin.pos[2] += this.movRandY;
      this.position = this.movePerlin(this.position, this.circleParam.size, this.movSpeed, this.perlin.pos[1], this.perlin.pos[2]);
    }
    this.position = this.position.edgeless(this.position);
  }


  drawParticle(){
    if(this.alive){
      this.color.main = this.perlinColor(this.color.const, this.perlin.pos, this.color.amplitude);
      noStroke();
      fill(this.color.main[0], this.color.main[1], this.color.main[2], this.opacity);
      this.circleObj.draw(this.position, this.circleParam);
      // ellipse(this.position.x, this.position.y, this.circleParam.size, this.circleParam.size);
    }
  }

  perlinColor(_const, _perlin, _amplitude){
    let newColor = [];
    _perlin[4]+=0.001;
    _perlin[5]+=0.001;
    _perlin[6]+=0.001;

    newColor[0] = this.changeValueWithAmplitude(_const[0], _perlin[4], _amplitude);
    newColor[0] = this.mirrorValue(this.color.main[0],360);
    newColor[1] = this.changeValueWithAmplitude(_const[1], _perlin[5], _amplitude/3);
    newColor[1] = this.limitValue(newColor[1],100);
    newColor[2] = this.changeValueWithAmplitude(_const[2], _perlin[6], _amplitude/3);
    newColor[2] = this.limitValue(newColor[2],100);
    return newColor;
  }

  //====SUPPORTIVE FUNCTIONS
  mirrorValue(_value,_scope){
    if(_value>_scope){
      let result = _value-_scope;
      return result;
    };
    if(_value<0){
      return _value+_scope;
    }
    else
      return _value
  };

  limitValue(_value,_limit){
    if (_value>_limit){
      return _limit;
    }
    else if (_value<0){
      return 0;
    }
    else {
      return _value
    }
  }

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

  changeValueWithAmplitude(_constant, _perlin, _amplitude){
    let min = _constant-_amplitude;
    let max = _constant+_amplitude;
    return floor(map(noise(_perlin), 0, 1, min, max));
  }

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