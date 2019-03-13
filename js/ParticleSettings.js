class ParticleSettings {
  constructor(){

    this.mode = 'random';

    //Particle
    this.lifespan = 500;
    this.lifespanMaxValue = 1000;
    this.size = 5;
    this.sizeVariation = 50;
    this.smoothness = 90;
    this.roundness = 90;

    //Dynamics
    this.speed = 50
    this.movement = 10;
    this.vertical = 0;
    this.horisontal = 0;
    this.tremble = 10;
    this.scatter = 0

    //Events
    this.randomize = () => {
      this.lifespan = coinFlip(random(100), random(100,1000), .7);
      this.size = coinFlip(random(10), coinFlip(random(10,40), random(40,100), .95), .95);
      this.sizeVariation = random(100);
      this.smoothness = coinFlip(random(40), random(40,90), .1);
      this.roundness = coinFlip(random(60), random(60,100), .1);
      
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