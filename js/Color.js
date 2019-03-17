class Color {
  constructor(_color) {
    this.colorObj = _color

    this.color = {
      const: this.colorObj.hexToHSL(_color.hexColors.randomColor()),
      main: this.colorObj.hexToHSL(_color.hexColors.randomColor()),
      local: null,
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

  //Not working as expected
  get mixedLocal(){
    let colorA = this.perlinColor(this.color.const, this.perlinArr, this.color.amplitude);
    let colorB;
    if(this.color.local){
      colorB = this.color.local;
    }
    else{
      colorB = colorA;
    }
    let colorC = this.oldColor

    let colorD = [];
    colorD[0] = (colorA[0]+(colorB[0]*9))/10;
    colorD[1] = (colorA[1]+(colorB[1]*9))/10;
    colorD[2] = (colorA[2]+(colorB[2]*9))/10;
    return colorD;

  }

  set localColor(_pos){
    const localColRGB = get(_pos.x, _pos.y);
    const localColHEX = this.colorObj.rgbToHex(localColRGB[0], localColRGB[1], localColRGB[2]);
    const localColHSL = this.colorObj.hexToHSL(localColHEX);
    this.color.local = localColHSL;
  }

}