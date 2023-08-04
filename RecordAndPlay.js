class RecordAndPlay {
    constructor(Mic) {
        // p5.SoundRecorderオブジェクトを作成
        this.recorder = new p5.SoundRecorder();//ここで個別にレコーダーを生成

        this.isSet = false;//まだ録音していない状態
        this.isPlaying = false;//まだ再生していない状態
        this.isRecording = false;//現在は録音していない状態

        this.mic = Mic;
        this.soundFileSetup();
    }

    //サウンドファイルのセットアップ
    soundFileSetup() {
        //soundFileの定義
        this.soundFile = new p5.SoundFile();
        //レコーダーをマイクに接続
        this.recorder.setInput(this.mic);
    }


    //録音を開始する関数
    startRecord() {
        // soundFileにレコードする
        this.recorder.record(this.soundFile);
        this.isPlaying = false;
        this.isRecording = true;//録音中の状態にする
        console.log("録音開始")
    }

    //録音を終了する関数
    finishRecord() {
        // レコーダーを停止し、結果をsoundFile保存する
        this.recorder.stop();
        this.isSet = true;
        this.isRecording = false;//録音していない状態にする
        console.log("録音終了")
    }

    //録音したものを再生する関数
    playRecord(cue) {
        // 録音したものを再生する
        this.soundFile.loop();
        //loopの再生位置を変える
        //秒数なので0.001を掛けている
        this.soundFile.jump(cue * 0.001);
        this.isPlaying = true;
        console.log("再生中")
    }

    //再生を停止する関数
    stopPlaying() {
        //再生を停止する
        this.soundFile.stop();
        this.isPlaying = false;
        console.log("再生停止")
    }

}
