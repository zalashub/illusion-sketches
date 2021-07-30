function Coffeebean(){
    let beanW, beanH;
    let numW, numH, paddingW, paddingH
    let angleStepW, angleStepH
    //GUI
    let params = {
        rotateX: 420,
        rotateXMin: 360,
        rotateXMax: 540,
        rotateXStep: 5,
        rotateY: 450,
        rotateYMin: 320,
        rotateYMax: 580,
        rotateYStep: 5
    };

    this.setup = () => {

        beanW = 24;
        beanH = 40;
        paddingW = 15;
        paddingH = 4;
        numW = floor(width/(beanW + paddingW));
        numH = floor(height/(beanH + paddingH));
        coffeeGUI.addObject(params);
    }

    this.draw = () => {
        angleStepW = -radians(params.rotateX/numW);
        angleStepH = radians(params.rotateY/numH);

        translate(-width/2, height/2);
        let vec = createVector(1, 0, 0); //rotate around x axis positive y is down
        rotate(PI, vec);
        background(133, 130, 126); 

        push();
        translate(paddingW + beanW/2, 2*paddingH + beanH/2);
        
        for(let i = 0; i < numW; ++i) {
            for(let j = 0; j < numH; ++j) {
                push();
                translate(0 + i * (beanW + paddingW), 
                            2 * paddingH + j * (beanH + paddingH)); //translate to the middle of each coffee bean
                rotate(i*angleStepW);
                rotate(j * angleStepH)
                //draw the bean
                noStroke();
                fill(95, 72, 37);
                strokeWeight(2);
                stroke(0);
                arc(0, 0, beanW, beanH, -PI/2, PI/2);
                stroke(255);
                arc(0, 0, beanW, beanH, PI/2, -PI/2);
                stroke(51, 42, 27, 140);
                strokeWeight(1);
                line(0, -beanH/2, 0, beanH/2);
    
                pop();
            }
        }
        pop();
    }
}