function coinFlip(arg1, arg2, chance = .5){
  let randomize = random(1)
  if (randomize<chance){
    return arg1
  }
  else{
    return arg2
  }
}

function edgeless(x = undefined){
    if (x > width){x = 0};
    if (x < 0){x = width};
  return x;
}

function addRemoveObj(arr, quantity, obj, settings=undefined){
  if(arr.length>quantity){
    arr.splice(0, 1);
  }
  else if(arr.length<quantity){
    for(let i = 0; i <= quantity; i++ ){
      arr.push(obj)
    }

  }
  if(settings){
    for(let i = arr.length-1; i >= 0; i-- ){
      arr[i].settings;
    }
  }

}

function mobileVersion(normal, mobile){
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
    return mobile
  }
  else if(document.documentElement.clientWidth < 900){
    return mobile
  }
  else{
    return normal
  }
}




//OBJECT HELPERS
function mirrorValue(_value, _max, _min=0){
  //If value is surpass min or max allowed, translate value to its opposite;
  //Example: if color hue max = 360 and hue value = 361, then return hue = 1;
  //_value: input value
  //_max: maximum allowed value
  //_min: minumum allowed value

  if(_value>_max){
    let result = _value-_max;
    return result;
  };
  if(_value<_min){
    return _value+_max;
  }
  else
    return _value
}

function limitValue(_value, _max, _min=0){
  //Limit value to its min and max allowed
  //Example: if max is 100, and value is 102, return 100;
  //_value: input value
  //_max: maximum allowed value
  //_min: minumum allowed value
  if (_value>_max){
    return _max;
  }
  else if (_value<_min){
    return _min;
  }
  else {
    return _value
  }
}

function changeValueWithAmplitude(_constant, _perlin, _amplitude){
  const min = _constant-_amplitude;
  const max = _constant+_amplitude;
  return floor(map(noise(_perlin), 0, 1, min, max));
}

function generatePerlinArr(_amount=100, _scope=10000){
  //Generate array of randomized numbers
  //_amount: size of array
  //_scope: scope of randomized numbers(negative numbers excluding)
  let arr = [];
  for(let i=0; i<_amount; i++){
    arr.push(floor(random(_scope)));
  }
  return arr
}

function edgeless (_pos) {
  //Takes object x and y positions and if x/y positions is beyond edge, returns position on opposite side. 
  if (_pos.x > width){_pos.x = 0};
  if (_pos.x < 0){_pos.x = width};
  if (_pos.y > height){_pos.y = 0};
  if (_pos.y < 0){_pos.y = height};
  return _pos
}