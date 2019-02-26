// function mouseWheel(event) {
//   const value = -event.delta;
//   for(i = objArr.length-1; i >= 0; i-- ){
//     objArr[i].newSize = value
//   }
//   redraw();
// }

// function mousePressed() {
//   for(i = objArr.length-1; i >= 0; i-- ){
//     objArr[i].randomizeHue();
//     objArr[i].randomizeDNKC();
//   }
// }

// function mouseReleased() {
//   for(i = objArr.length-1; i >= 0; i-- ){
//     objArr[i].pressed = false;
//     objArr[i].released = true;
//   }
// }

function keyPressed() {
  if (keyCode === 32) {
    if (scene.looping) {
      noLoop()
      scene.looping = false;
      console.log("paused");
    } else {
      loop()
      scene.looping = true;
      console.log("played");
    }
    console.log("space:pause/play");
  } else if (keyCode === TAB) {
    toggleMenu();
    console.log("tab:menu");
  } else if (keyCode === 65) {
    autosave= !autosave
    console.log("a:autosave");
  }
  // else if (keyCode === LEFT_ARROW) {
  //   for(i = objArr.length-1; i >= 0; i-- ){
  //     objArr[i].newPlayspeed = false;
  //   }
  // } else if (keyCode === RIGHT_ARROW) {
  //   for(i = objArr.length-1; i >= 0; i-- ){
  //     objArr[i].newPlayspeed = true;
  //   }
  // } else if (keyCode === UP_ARROW) {
  //   quantity++
  // } else if (keyCode === DOWN_ARROW) {
  //   quantity--
  //   if (quantity < 1) {
  //     quantity=1
  //   }
  // } else if (keyCode === 77) {
  //   for(i = objArr.length-1; i >= 0; i-- ){
  //     objArr[i].randomizeDNKC();
  //   }
  //   console.log("m:mode");
  // } else if (keyCode === 67) {
  //   for(i = objArr.length-1; i >= 0; i-- ){
  //     objArr[i].randomizeHue();
  //   }
  //   console.log("c:color");
  // } 
  else if (keyCode === 68) {
    saveCanvas(scene.titleShort, 'png')
    // console.log("d:download");
  }
}