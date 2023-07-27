//SoundManagerの役割は、二つのサウンドファイル（soundContainer）を管理できる関数を生成すること。後期では、エフェクトの管理もここでやりたい

class SoundManager {
    startTime;
    duration;
    preFinishRecordTime = 300;

    constructor(Mic) {
        //マイクの継承
        this.mic = Mic;
        //音声格納用の変数にRecordAndPlayを設定する
        //[0]がセーブ用途のプレファイル。[1]が本ファイル。
        this.soundContainer = [new RecordAndPlay(mic), new RecordAndPlay(mic)];
        console.log("作られた");
    }

    soundUpdate(){
        this.soundFinishPreRecord();
    }

    //録音を開始する
    soundStartRecord() {
        for (let i = 0; i < this.soundContainer.length; i++) {
            this.soundContainer[i].startRecord();
            this.soundContainer[i].isRecording = true;
        }
        //ここで録音開始した時間を取得
        this.setStartTime();
    }

    //プレの録音を終了する
    soundFinishPreRecord() {
        //録音スタートしてからpreFinishRecordTime秒分経ったら、かつ、プレサウンドコンテナのisSetがfalseのときに
        if (millis() - this.startTime > this.preFinishRecordTime && this.soundContainer[0].isSet == false) {
            //プレの録音を停止する。
            this.soundContainer[0].finishRecord();
            //録音済みであることにする
            this.soundContainer[0].isSet = true;
            //録音中で無いことにする
            this.soundContainer[0].isRecording = false;
            console.log("プレファイルの録音停止")
        }
    }

    //メインの録音を終了する
    soundFinishMainRecord() {
        this.soundContainer[1].finishRecord();
        //録音済みであることにする
        this.soundContainer[1].isSet = true;
        //録音中で無いことにする
        this.soundContainer[1].isRecording = false;
        console.log("本ファイルの録音停止");
        this.setDuration();
        console.log("durationの設定完了");
    }

    //メインの音源を再生する
    soundMainPlay(){
        //再生する
        this.soundContainer[1].playRecord();
        this.soundContainer[1].isPlaying = true;
    }

    //メインの音源を停止する
    soundMainStop(){
        //停止する
        this.soundContainer[1].stopPlaying();
        this.soundContainer[1].isPlaying = false;
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
}