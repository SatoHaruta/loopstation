//SoundManagerの役割は、二つのサウンドファイル（soundContainer）を管理できる関数を生成すること。後期では、エフェクトの管理もここでやりたい

class SoundManager {
    startTime;
    duration;
    preFinishRecordTime = 300;
    //トラックの中の一つの音声について、録音済みか否かを表す変数
    //soundContainer[1]のmainのisSet=trueになった場合にtrueになる
    soundManagerIsSet = false;
    //今プレイ中なのかどうか
    soundManagerIsPlaying = false;
    //今録音中かどうか
    soundManagerIsRecording = false;
    //現在のsoundContainer内の状態
    //defined,subAndMainRecording,MainRecording,recorded,playing,stopped,waiting
    stateTypes = new Set();
    soundManagerState;


    constructor(Mic) {
        //マイクの継承
        this.mic = Mic;
        //音声格納用の変数にRecordAndPlayを設定する
        //[0]がセーブ用途のプレファイル。[1]が本ファイル。
        this.soundContainer = [new RecordAndPlay(mic), new RecordAndPlay(mic)];
        this.soundManagerState = "defined";
        this.defineStateTypes();
    }

    //ここでsoundManagerの状態の種類を作っている
    defineStateTypes(){
        this.stateTypes.add("defined");
        this.stateTypes.add("subAndMainRecord");
        this.stateTypes.add("subAndMainRecording");
        this.stateTypes.add("MainRecording");
        this.stateTypes.add("recorded");
        this.stateTypes.add("subPlay");
        this.stateTypes.add("mainPlay");
        this.stateTypes.add("subPlaying");
        this.stateTypes.add("mainPlaying");
        this.stateTypes.add("stopped");
        this.stateTypes.add("waiting");
    }

    soundUpdate() {
        this.soundFinishPreRecord();
        this.checkState();
        this.updateState();
    }

    //録音を開始する
    soundStartRecord() {
        for (let i = 0; i < this.soundContainer.length; i++) {
            this.soundContainer[i].startRecord();
        }
        //ここで録音開始した時間を取得
        this.setStartTime();
        this.soundManagerState = "subAndMainRecord";
    }

    //プレの録音を終了する
    soundFinishPreRecord() {
        //録音スタートしてからpreFinishRecordTime秒分経ったら、かつ、プレサウンドコンテナのisSetがfalseのときに
        if (millis() - this.startTime > this.preFinishRecordTime && this.soundContainer[0].isSet == false) {
            //プレの録音を停止する。
            this.soundContainer[0].finishRecord();
            console.log("プレファイルの録音停止");
            this.soundManagerState = "MainRecording";
        }
    }

    //メインの録音を終了する
    soundFinishMainRecord() {
        this.soundContainer[1].finishRecord();
        console.log("本ファイルの録音停止");
        this.setDuration();
        console.log("durationの設定完了");
        this.soundManagerState = "recorded";
    }

    //サブの音源を再生する
    soundSubPlay() {
        //再生する
        this.soundContainer[0].playRecord();
        this.soundManagerState = "subPlay";
    }

    //サブの音源を停止する
    soundSubStop() {
        //停止する
        this.soundContainer[0].stopPlaying();
    }

    //メインの音源を再生する
    soundMainPlay() {
        //再生する
        this.soundContainer[1].playRecord();
        this.soundManagerState = "mainPlay";
    }

    //メインの音源を停止する
    soundMainStop() {
        //停止する
        this.soundContainer[1].stopPlaying();
        this.soundManagerState = "stopped";
    }

    //停止のメソッド
    stopPlaying(){
        //サブの停止命令
        this.soundSubStop();
        //メインの停止命令
        this.soundMainStop();
        this.soundManagerState = "stopped";
    }

    //始まった瞬間の時間を設定する
    setStartTime() {
        this.startTime = millis();
    }

    //終わった時点で録音した時間を計測する
    setDuration() {
        this.duration = millis() - this.startTime;//ここでdurationを定義する
        console.log(this.duration);
    }

    //soundManagerStateを更新し続けるメソッド
    updateState(){
        if(this.soundManagerState == "subAndMainRecord" && this.soundManagerState !="subAndMainRecording"){
            this.soundManagerState = "subAndMainRecording";
        }
        if(this.soundManagerState == "subPlay" && this.soundManagerState !="subPlaying"){
            this.soundManagerState = "subPlaying";
        }
        if(this.soundManagerState == "mainPlay" && this.soundManagerState !="mainPlaying"){
            this.soundManagerState = "mainPlaying";
        }
        if(this.soundManagerState == "stopped" && this.soundManagerState != "waiting"){
            this.soundManagerState = "waiting"
        }
    }

    //soundContainerのmainの値をsoundManagerに引き継ぐ
    checkState() {
        this.soundIsPlaying = this.soundContainer[1].isPlaying;
        this.soundIsRecording = this.soundContainer[1].isRecording;
        this.soundIsSet = this.soundContainer[1].isSet;
        if(this.stateTypes.has(this.soundManagerState) == false){
            throw new Error('soundManagerStateに、不正な値が設定されています。');
        }
    }
}