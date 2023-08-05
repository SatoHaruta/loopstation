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
            this.trackSubStartPlay(i);
            this.trackSubStopPlay(i);
                this.trackMainStopPlay(i);
                this.trackMainStartPlay(i);
        }
    }


    //録音を開始する
    trackStartRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが押された瞬間かつ、soundManagerの中にあるsoundContainerの本ファイルがまだ録音していない場合に
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundManagerState == "defined") {

            
            ("Track→Soundへ録音開始");
            this.soundManager[i].soundStartRecord();
        }
    }

    //録音を停止する
    trackFinishRecord(i) {
        //このtrackに割り当てられているkeyConfigのキーが離された瞬間かつ、soundManagerの中にあるsoundContainerの本ファイルがもう録音済みの場合に
        if (keyConfig[this.buttonNum].getKeyRelease() == true && this.soundManager[i].soundManagerState == "MainRecording") {
            if(developerMode){console.log("Track→Soundへ本ファイルの録音停止");}
            this.soundManager[i].soundFinishMainRecord();
            this.soundManager[i].soundContainer[1].isRecording = false;
        }
    }


    //サブ音源の再生をする
    trackSubStartPlay(i) {
        if (this.soundManager[i].soundManagerState == "recorded") {
            //再生する
            if(developerMode){console.log("サブ音源の再生開始");}
            this.soundManager[i].soundSubPlay(0);
        }
    }

    //サブ音源を停止する
    trackSubStopPlay(i) {
        if (this.soundManager[i].soundManagerState == "subPlaying" && this.soundManager[i].subPlayTimeChecker() == true) {
            //停止する
            if(developerMode){console.log("サブ音源の再生停止");}
            this.soundManager[i].soundSubStop();
        }
    }

    //メイン音源の再生をする
    trackMainStartPlay(i) {
        if (this.soundManager[i].soundManagerState == "subComplete") {
            if(developerMode){console.log("メイン音源の再生開始");}
            this.soundManager[i].soundMainPlay(this.soundManager[i].preFinishRecordTime);
        }
        if (keyConfig[this.buttonNum].getKeyPress() == true) {
            if (this.soundManager[i].soundManagerState == "waiting") {
                //再生する
                if(developerMode){console.log("メイン音源の再生開始");}
                this.soundManager[i].soundMainPlay(0);
            }
        }
    }

    //メイン音源を停止する
    trackMainStopPlay(i) {
        if (keyConfig[this.buttonNum].getKeyPress() == true && this.soundManager[i].soundManagerState == "mainPlaying") {
            //停止する
            if(developerMode){console.log("メイン音源の再生停止");}
            this.soundManager[i].soundMainStop();
        }
    }

    resetDuration(i) {

    }
}