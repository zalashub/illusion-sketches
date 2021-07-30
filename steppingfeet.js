function SteppingFeet() {

  let startX;
  let endX;
  let footWidth;
  let footHeight;
  let pos;

  //GUI parameters
  let params = {
    moveFeet: true,
    gridAlpha: 230,
    gridAlphaMin: 0,
    gridAlphaMax: 255,
    speed: 1,
    speedMin: 1,
    speedMax: 3.5,
    speedStep: 0.5,
    numBinsPerFoot: 4,
    numBinsPerFootMin: 2,
    numBinsPerFootMax: 12,
    numBinsPerFootStep: 1,
    colors: ['Yellow-Blue', 'Red-Green', 'Black-White']
	};
    
  this.setup = function() {

    startX = width * 0.15;
    endX = width * 0.80;
    pos = 120;

    footWidth = 80;
    footHeight = 35;

    //GUI
    feetGUI.addObject(params);
    
  }

  this.draw = function() {
    push();

    background(100);
    translate(-width/2, height/2);
  
    this.grid(params.gridAlpha, params.numBinsPerFoot);
  
    //upper 'foot'
    if(params.colors == 'Yellow-Blue') fill(245, 245, 0);
    else if(params.colors == 'Red-Green') fill(0, 255, 0);
    else fill(255);
    rect(pos, -height * 0.35, footWidth, footHeight);

    //lower 'foot'
    if(params.colors == 'Yellow-Blue') fill(0, 0, 80);
    else if(params.colors == 'Red-Green') fill(60, 0, 0);
    else fill(0);
    rect(pos, -height * 0.65, footWidth, footHeight);
  
    if(params.moveFeet) { //if move feet gui is ticked as true
      pos+=params.speed
      if(pos >= endX || pos <= startX) {
          params.speed*=-1; //check borders and bounce back
      }
    }
  
    pop();
  }

  this.grid = function(_alpha, _binNum) {
  
    let binWidth = footWidth/_binNum;
    let numAllBins = width/binWidth;
    noStroke();
    
    for(let i = 0 ; i < numAllBins; ++i){
      
      if(i % 2 == 0) { //fill black or white alternatively to create a grid
        fill(255, _alpha);
      } else fill(0, _alpha);
      
      rectMode(CORNER);
      rect(i * binWidth, -height, binWidth, height); //each stripe
    }
  }
  
}