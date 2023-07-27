class ButtonDisplay{
    constructor(x,y,size,keyNum){
        this.x = x;
        this.y = y;
        this.size = size;
        this.keyNum = keyNum;
    }

    display(){
        fill(0);
        noStroke();
        rect(this.x,this.y,this.size,this.size);
        if(keyConfig[this.keyNum].getKeyState() == "keyPress"){

            this.size = 100;
        }
        if(keyConfig[this.keyNum].getKeyState() == "keyRelease"){
            this.size = 50;
        }
    }
}