class keySystem {
    constructor(inputKeyCharacter) {
        this.keyCharacter = inputKeyCharacter;
        this.Nkey = false;//NowKeyの略、現在のキーのステータス
        this.Pkey = false;//PreKeyの略、1フレーム過去のステータス
        this.keyState;//キーの現在の状況

    }

    update(){
        this.Pkey = this.Nkey;//Pkeyにこのフレームでの値を設定
    }

    //キーが押された時の設定（keyPressedで呼び出している）
    setKeyPress() {
        if (key == this.keyCharacter) {
            this.Nkey = true;
        }
    }

    //キーが離された時の設定（keyReleasedで呼び出している）
    setKeyReleased() {
        if (key == this.keyCharacter) {
            this.Nkey = false;
        }
    }

    //外部からキーが押された瞬間を検知するメソッド
    getKeyPress(){
        if(this.Pkey == false && this.Nkey == true){
            return true;
        }
        else{
            return false;
        }
    }

    //外部からキーが離された瞬間を検知するメソッド
    getKeyRelease(){
        if(this.Pkey == true && this.Nkey == false){
            return true;
        }
        else{
            return false;
        }
    }

    //ここではキーの状態を取得することができる
    getKeyState() {
        if (this.Nkey == true && this.Pkey == true){//押され続けている時
            this.keyState = "keyPress";
        }
        if (this.Nkey == false && this.Pkey == false){//離し続けている時
            this.keyState = "keyRelease";
        }
        if (this.Pkey == false && this.Nkey == true) {
            this.keyState = "keyDown";//押したタイミング
        }
        if (this.Pkey == true && this.Nkey == false) {
            this.keyState= "keyUp";//離したタイミング
        }
        return this.keyState;
    }
}