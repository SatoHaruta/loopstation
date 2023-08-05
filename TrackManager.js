//TrackManagerの役割は、ボタンの管理と再生、停止の管理。

class TrackManager {
    trackIsSet = false;
    soundManager = [];
    constructor(Mic, buttonNum) {
        this.mic = Mic;//マイクを継承
        this.buttonNum = buttonNum;//ここで何番目のボタンかを取得している
        this.soundManager.push(new SoundManager(this.mic));
    }

    draw() {
        //soundManagerを作る
        //this.generateSoundManager();
        this.checkTrackIsSet();
        //soundManager分をforで回す
        for (let i = 0; i < this.soundManager.length; i++) {
            //soundUpdateでプレのfinishRecordのタイミングを常時測っている
            this.soundManager[i].soundUpdate();
            this.trackStartRecord(i);
            this.trackFinishRecord(i);
            this.trackSubStartPlay(i);
            this.trackSubStopPlay(i);
            this.trackMainStopPlay(i);
            this.trackMainStartPlay(i);
        }
    }

    //soundManagerを作る
    generateSoundManager() {
        //ボタンが押されたら
        if (keyConfig[this.buttonNum].getKeyPress() == true) {
            this.soundManager.push(new SoundManager(this.mic));
        }
    }


    //録音を開始する
    trackStartRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが押された瞬間かつ、soundManagerStateがdefinedのとき
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundManagerState == "defined") {


            ("Track→Soundへ録音開始");
            this.soundManager[i].soundStartRecord();
        }
    }

    //録音を停止する
    trackFinishRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが離された瞬間かつ、soundManagerStateがMainRecordingのとき
        if (keyConfig[this.buttonNum].getKeyRelease() == true && this.soundManager[i].soundManagerState == "MainRecording") {
            if (developerMode) { console.log("Track→Soundへ本ファイルの録音停止"); }
            this.soundManager[i].soundFinishMainRecord();
        }
    }


    //サブ音源の再生をする
    trackSubStartPlay(i) {
        if (this.soundManager[i].soundManagerState == "recorded") {
            //再生する
            if (developerMode) { console.log("サブ音源の再生開始"); }
            this.soundManager[i].soundSubPlay(0);
        }
    }

    //サブ音源を停止する
    trackSubStopPlay(i) {
        if (this.soundManager[i].soundManagerState == "subPlaying" && this.soundManager[i].subPlayTimeChecker() == true) {
            //停止する
            if (developerMode) { console.log("サブ音源の再生停止"); }
            this.soundManager[i].soundSubStop();
        }
    }

    //メイン音源の再生をする
    trackMainStartPlay(i) {
        //録音後、最初の再生の場合
        if (this.soundManager[i].soundManagerState == "subComplete") {
            if (developerMode) { console.log("メイン音源の再生開始"); }
            this.soundManager[i].soundMainPlay(this.soundManager[i].preFinishRecordTime);
        }
        //最初以外の再生の場合
        if (keyConfig[this.buttonNum].getKeyPress() == true) {
            if (this.soundManager[i].soundManagerState == "waiting") {
                //再生する
                if (developerMode) { console.log("メイン音源の再生開始"); }
                this.soundManager[i].soundMainPlay(0);
            }
        }
    }

    //メイン音源を停止する
    trackMainStopPlay(i) {
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundManagerState == "mainPlaying") {
            //停止する
            if (developerMode) { console.log("メイン音源の再生停止"); }
            this.soundManager[i].soundMainStop();
        }
    }

    resetDuration(i) {

    }

    checkTrackIsSet() {
        if (this.soundManager.length != 0) {
            if (this.soundManager[0].soundManagerIsSet == true) {
                this.trackIsSet = true;
            }
        }
        else if (this.soundManager.length == 0) {
            this.trackIsSet = false;
        }
    }
}