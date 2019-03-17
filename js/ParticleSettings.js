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
      this.size = coinFlip(random(5), random(5,20), .8) //random(5); //coinFlip(random(10), coinFlip(random(20,50), random(50,100), .2), .9);
      this.sizeVariation = random(100);
      this.smoothness = coinFlip(random(40), random(40,90), .1);
      this.roundness = random(60,100);
      
      this.speed = randomGaussian(20,10);
      this.movement = random(100);
      this.vertical = randomGaussian(0,5);
      this.horisontal = randomGaussian(0,5);
      this.tremble = coinFlip(random(10), random(100), .9);
      this.scatter = coinFlip(random(10), random(100), .9);
      
      ;
    }

    //Micro particles
    this.micro = () => {
      this.mode = 'normal';
    
      //Particle
      this.lifespan = random(2);
      this.lifespanMaxValue = 1000;
      this.size = random(3);
      this.sizeVariation = 100;
      this.smoothness = 50;
      this.roundness = 70;
    
    }
  }

};