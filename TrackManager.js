//TrackManagerの役割は、ボタンの管理と再生、停止の管理。

class TrackManager {
    soundManager = [];
    constructor(Mic, buttonNum) {
        this.mic = Mic;//マイクを継承
        this.buttonNum = buttonNum;//ここで何番目のボタンかを取得している
        //SoundManagerを一つ作る
        this.soundManager[0] = new SoundManager(this.mic);
    }

    draw() {
        // soundManagerの配列一つずつを判断して再生するか録音するかを決める
        for (let i = 0; i < this.soundManager.length; i++) {
            this.soundManager[i].soundUpdate();
            if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundContainer[1].isSet == false) {
                console.log("ok");
                this.soundManager[i].soundStartRecord();
            }
            if (keyConfig[this.buttonNum].getKeyRelease() == true && this.soundManager[i].soundContainer[1].isSet == false) {
                this.soundManager[i].soundFinishMainRecord();
            }
        }
    }

}