function Bezold() {

    let stripeH;

    this.setup = () => {
        stripeH = 20;
    }

    this.draw = () => {
        background(255);
        translate(-width/2, -height/2);
        noStroke();
        fill(0);
        let translatePos = map(mouseY, 0, height, -2*stripeH, 2*stripeH, true);
        
        push();
        translate(0, translatePos);
        
        for(let i = -2*stripeH; i < height + 2*stripeH; ++i){
            
            if(i%(2*stripeH) == 0) {
            rect(0, i, width, stripeH);
            }
        }
        pop();
        
        fill(19, 213, 242);
        push();
        translate(80, 0);
        for(let i = 0; i < height; ++i) {
            rect(0, i*2*stripeH, 260, stripeH);
        }
        pop();
        
        push();
        translate(460, stripeH);
        for(let i = 0; i < height; ++i) {
            rect(0, i*2*stripeH, 260, stripeH);
        }
        pop();
    }
}