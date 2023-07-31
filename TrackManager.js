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
        //soundManager分をforで回す
        for (let i = 0; i < this.soundManager.length; i++) {
            //soundUpdateでプレのfinishRecordのタイミングを常時測っている
            this.soundManager[i].soundUpdate();
            this.trackStartRecord(i);
            this.trackFinishRecord(i);

            
            
            //ここから下はisPlaying = true→falseになってしまって同じフレームに再生と停止をしてしまうので、else ifを無理やりねじ込んでいる。
            if (this.soundManager[i].soundContainer[1].isPlaying == true) {
                this.trackMainStopPlay(i);
            }
            else if (this.soundManager[i].soundContainer[1].isPlaying == false) {
                this.trackMainStartPlay(i);
            }
        }
    }


    trackStartRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが押された瞬間かつ、soundManagerの中にあるsoundContainerの本ファイルがまだ録音していない場合に
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundIsSet == false) {

            console.log("Track→Soundへ録音開始");
            this.soundManager[i].soundStartRecord();
        }
    }

    trackFinishRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが離された瞬間かつ、soundManagerの中にあるsoundContainerの本ファイルがもう録音済みの場合に
        if (keyConfig[this.buttonNum].getKeyRelease() == true && this.soundManager[i].soundIsSet == false) {
            console.log("Track→Soundへ本ファイルの録音停止");
            this.soundManager[i].soundFinishMainRecord();
            this.soundManager[i].soundContainer[1].isRecording = false;
        }
    }

    //メイン音源の再生をする
    trackMainStartPlay(i) {
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundIsPlaying == false && this.soundManager[i].soundIsSet == true) {
            //再生する
            console.log("メイン音源の再生開始");
            this.soundManager[i].soundMainPlay();
        }
    }

    //メイン音源を停止する
    trackMainStopPlay(i) {
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundIsPlaying == true) {
            //停止する
            console.log("メイン音源の再生停止");
            this.soundManager[i].soundMainStop();
        }
    }

    resetDuration(i){
        
    }
}