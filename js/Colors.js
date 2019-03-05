class Color {
  constructor(data) {
    this.colorsData = data;
    this.colorArray = [];
    this.selectedPalleteId;
    this.changePalette = () => {
      this.processColorPallete() 
    }
    this.hexColors = {
      color1:null,
      color2:null,
      color3:null,
      color4:null,
      color5:null,
      randomColor(){
        let randomValue = Math.random()*5;
        if(randomValue<1){return this.color1;}
        else if(randomValue<2){return this.color2;}
        else if(randomValue<3){return this.color3;}
        else if(randomValue<4){return this.color4;}
        else if(randomValue<5){return this.color5;}
      }
    }
  }

  processColorPallete(){
    this.selectedPalleteId = this.selectPalettefromJson();
    this.colorArray = [];
    for (let i=0; i<this.colorsData.palettes[this.selectedPalleteId].length; i++){
      let colorTemporalArray = this.createColorModesArray(this.colorsData.palettes[this.selectedPalleteId][i])
      this.colorArray.push(colorTemporalArray);
    }
    this.hexColors.color1=this.colorArray[0][2];
    this.hexColors.color2=this.colorArray[1][2];
    this.hexColors.color3=this.colorArray[2][2];
    this.hexColors.color4=this.colorArray[3][2];
    this.hexColors.color5=this.colorArray[4][2];

  }


  selectPalettefromJson(paletteId = undefined){
    let selectedPallete;
    if(paletteId !=undefined){
      selectedPallete = paletteId;
    }
    else{
      selectedPallete = Math.floor(Math.random()*this.colorsData.palettes.length)
    }
    return selectedPallete;
    // console.log("color:" + selectedPallete);
  }


  createColorModesArray(hex){
    const colorToHSL = this.hexToHSL(hex);
    const colorToRGB = this.hexToRGB(hex);
    const colorToHex = hex;
    const colorTemporalArray = [];
    colorTemporalArray.push(colorToHSL, colorToRGB, colorToHex);
    return colorTemporalArray;
  }

///
  takeColorFromArray(){
    const color = []
    colRand = int(random(0, colorArr.length));
    color[0] = colorArr[colRand][0];
    color[1]= colorArr[colRand][1];
    color[2]= colorArr[colRand][2];
    return color;
  }

  hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
  
    r /= 255, g /= 255, b /= 255;
  //   console.log('rgb' + r + g + b)
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
  
    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
  
    h = Math.round(360*h);
    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    
    
  //   var colorInHSL = 'hsl(' + h + ', ' + s + ', ' + l + ')';
    var colorInHSL = [];
    colorInHSL[0]=h;
    colorInHSL[1]=s;
    colorInHSL[2]=l;
  
    return colorInHSL;
  }
  hexToRGB(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
  
    r /= 255, g /= 255, b /= 255;
  
    let colorInRGB = [];
    colorInRGB[0]=r;
    colorInRGB[1]=g;
    colorInRGB[2]=b;
  
    return colorInRGB;
  }
}