class Circle {
	constructor(){
  this.phase = 0;
  this.plaseInc = -0.01;
	this.zoff = random(1000)
  }
  draw(_position, _circleParam){
    let smoothness = map(_circleParam.smoothness,0,100,5,0)
    let min = map(_circleParam.roundness,100,0,_circleParam.size,_circleParam.size*0.5);
    let max = map(_circleParam.roundness,100,0,_circleParam.size,_circleParam.size*1.5);
    this.phase+=this.plaseInc;
    this.zoff+=0.01;
    
    push();
    translate(_position.x, _position.y);
    beginShape();
    for (let a = 0; a<TWO_PI; a+=TWO_PI/100) {
      this.xoff = map(sin(a+this.phase),-1,1,0,smoothness);
    	this.yoff = map(cos(a+this.phase),-1,1,0,smoothness);
      this.r = map(noise(this.xoff, this.yoff, this.zoff), 0,1,min, max)
      let x = this.r*cos(a)+1;
      let y = this.r*sin(a)+1;
      vertex(x,y)
    }
    endShape(CLOSE);
    pop();
  }
}