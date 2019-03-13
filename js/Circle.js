class Circle {
	constructor(){
  this.phase = 0;
  this.plaseInc = -0.01;
	this.zoff = random(1000)
  }
  draw(_circleParam, _position){
    if(_position===undefined){
      _position = []
      _position.x=0;
      _position.y=0;  
    }
    let a = _circleParam.size;
    let b = _circleParam.size*(_circleParam.roundness/100);
    let smoothnessA = map(_circleParam.smoothness,0,100,5,0)
    let smoothnessB = _circleParam.smoothness;
    this.phase+=this.plaseInc;
    this.zoff+=0.01;
    
    push();
    translate(_position.x, _position.y);
    beginShape();
    for (let angle = 0; angle<TWO_PI; angle+=TWO_PI/100) {
      this.xoff = map(sin(angle+this.phase),-1,1,0,smoothnessA);
      this.yoff = map(cos(angle+this.phase),-1,1,0,smoothnessA);
      let rEllipse = a*b/(sqrt(sq(b*cos(angle))+sq(a*sin(angle))));
      let min = map(smoothnessB,100,0,rEllipse,rEllipse*0.5);
      let max = map(smoothnessB,100,0,rEllipse,rEllipse*1.5);
      this.r = map(noise(this.xoff, this.yoff, this.zoff), 0,1,min, max)
      let x = this.r*cos(angle)+1;
      let y = this.r*sin(angle)+1;
      vertex(x,y)
    }
    endShape(CLOSE);
    pop();
  }
  set newZoff(_value){
    this.zoff = _value
  }
}