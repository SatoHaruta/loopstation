//TrackManagerの役割は、ボタンの管理と再生、停止の管理。

class TrackManager{
    soundManager = [];
    constructor(Mic, buttonNum){
        this.mic = Mic;//マイクを継承
        this.buttonNum = buttonNum;//ここで何番目のボタンかを取得している
        //SoundManagerを一つ作る
        this.soundManager[0] = new SoundManager(this.mic);
    }
}