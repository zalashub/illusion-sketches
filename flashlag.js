function FlashLag() {
    let boxSize;

    let allFrames;
    let keyFrames;
    let numFrames;
    let frameNum; //used for the timer

    //GUI
    let params = {
        stop: false
    };

this.setup = function() {

    //GUI and side view button
    flashGUI.addObject(params);
    sideViewButton.position(20, 690);
    sideViewButton.mousePressed(sideView);
    topviewButton.position(20, 725);
    topviewButton.mousePressed(topView);
    defaultViewButton.position(20, 760);
    defaultViewButton.mousePressed(defaultView);
    
    boxSize = 50;
    
    numFrames = 90; //change to alter the speed
    
    allFrames = [];
        
    keyFrames = [ {pos: createVector(150, 125), frame: 0},
                    {pos: createVector(0, 125), frame: numFrames/2},
                    {pos: createVector(-150, 125), frame: numFrames}];

    for (let k = 0; k < keyFrames.length; k++){

        let nextF = (k + 1) % keyFrames.length;
        tweenFrames(keyFrames[k], keyFrames[nextF]);
    }
 
    currentFrame = 0;
}

this.draw = function() {

    background(40);
    orbitControl();
    noStroke();
    cam.lookAt(0, 0, 0);
    // the lights
    ambientLight(190)
    pointLight(230, 230, 230, 350, 400, -5);

    //floor
    push();
    ambientMaterial(120);
    translate(0, -boxSize/2 - 5, 0);
    rotateX(PI/2);
    box(550, 550, 10);
    pop();
    
    //moving box
    push();
    translate(0, 0, -125);
    translate(allFrames[currentFrame].pos.x, 0, 0);
    ambientMaterial(50, 180, 245);
    box(boxSize,boxSize,boxSize);
    pop();
    
    //flashing box
    push();
    translate(0, 0, 100);
    ambientMaterial(235, 90, 190);
    if(currentFrame == numFrames/2) { //flash the box when they are aligned
        box(boxSize,boxSize,boxSize);
    }

    pop();
    
    //animate (or not)
    if(params.stop == false) currentFrame = (currentFrame + 1) % allFrames.length; //just animate with the flash
    else {
        
        if (currentFrame != numFrames/2) { 
            currentFrame = (currentFrame + 1) % allFrames.length; //animate normally until the boxes are aligned
            frameNum = frameCount; //track the frame number to be used for the timer
        }  else { //when currentFrame == numFrames/2 i.e. boxes are aligned
            if(frameCount > frameNum + 100) { //continue animation after ~3 secods
                currentFrame = (currentFrame + 1) % allFrames.length;
                console.log('Continue');
            }
        }
    } 
    
}

//function to see the scene from the side view
function sideView(){
    resetMatrix();
    cam.setPosition(0, 0, (height/2.0) / tan(PI*30.0 / 180.0)); //default by p5
    cam.lookAt(0, 0, 0);
}
function defaultView(){ //initial view of the scene
    resetMatrix();
    cam.setPosition(18, 42, 50);
    cam.lookAt(0, 0, 0);
}
function topView(){
    resetMatrix();
    cam.setPosition(0, height, 1);
    cam.lookAt(0, 0, 0);
}

function tweenFrames(kf1, kf2) {

    let numFrames = kf2.frame - kf1.frame; //get the number of frames between the two keyframes
    
    //repeat for the amount of frames between the KF
    for (i = 0; i < numFrames; i++)
    {
        //get the amount for interpolation for the specific frame
        //(currentFrame - startFrame) / (numFrames between points)
        let amount = ((i - 0)/numFrames) % numFrames;
        //console.log("amount: " + amount);
        
        //create an interpolated vector for position
        let tweenFramePos = p5.Vector.lerp(kf1.pos, kf2.pos, amount);
        
        let tweenFrame = { pos: tweenFramePos, frame: i}; //create the frame
        
        allFrames.push(tweenFrame); 
    }

} 
}