class keySystem {
    constructor(keyNum) {
        this.Nkey = false;//NowKeyの略、現在のキーのステータス
        this.Pkey = false;//PreKeyの略、1フレーム過去のステータス
        this.keyTiming = 0;//キータイミング、0が初期状態、押された瞬間1、離した瞬間2になる

        //ここで引数に応じて反応させるキーを変える
        if (keyNum == 0) {
            this.keyNum = 'a';
        }
        if (keyNum == 1) {
            this.keyNum = 's';
        }
        if (keyNum == 2) {
            this.keyNum = 'd';
        }
        if (keyNum == 3) {
            this.keyNum = 'f';
        }
    }

    //キーが押された時の処理
    getKeyPress() {
        if (key == this.keyNum) {
            this.Nkey = true;
            console.log(key);
        }
    }

    //キーが離された時の処理
    getKeyReleased() {
        if (key == this.keyNum) {
            this.Nkey = false;
        }
    }

    //キーを話したタイミングとキーを押したタイミングを取得する
    //これはkeyTimingを取得する前にdrawで必ず呼び出すこと
    getKeyTiming() {
        this.keyTiming = 0;//毎回初期化

        if (this.Pkey == false && this.Nkey == true) {
            this.keyTiming = 1;//押し込んだタイミングで1に切り替わる
        }
        if (this.Pkey == true && this.Nkey == false) {
            this.keyTiming = 2;//離したタイミングで2に切り替わる
        }

        this.Pkey = this.Nkey;//Pkeyにこのフレームでの値を設定
    }
}