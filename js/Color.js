class Color {
  constructor(_color) {
    this.color = {
      const: _color.hexToHSL(_color.hexColors.randomColor()),
      main: _color.hexToHSL(_color.hexColors.randomColor()),
      amplitude: map((_color.precision), 0,100, 50,0),
      opacity: _color.opacity/100
    }

    this.perlinArr = generatePerlinArr()
  }
  set new(_color){
    this.color.const = _color.hexToHSL(_color.hexColors.randomColor());
    this.color.main = _color.hexToHSL(_color.hexColors.randomColor());
    this.color.amplitude = map((_color.precision), 0,100, 50,0);
    this.color.opacity = _color.opacity/100;
  }
  get col(){
    return this.color.main;
  }

  get opacity(){
    return this.color.opacity;
  }
  get perlin(){
    this.color.main = this.perlinColor(this.color.const, this.perlinArr, this.color.amplitude);
    return this.color.main;
  }



  perlinColor(_const, _perlin, _amplitude){
    let newColor = [];
    _perlin[4]+=0.001;
    _perlin[5]+=0.001;
    _perlin[6]+=0.001;

    newColor[0] = changeValueWithAmplitude(_const[0], _perlin[4], _amplitude);
    newColor[0] = mirrorValue(this.color.main[0],360);
    newColor[1] = changeValueWithAmplitude(_const[1], _perlin[5], _amplitude/3);
    newColor[1] = limitValue(newColor[1],100);
    newColor[2] = changeValueWithAmplitude(_const[2], _perlin[6], _amplitude/3);
    newColor[2] = limitValue(newColor[2],100);
    return newColor;
  }


}