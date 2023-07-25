class SoundManager{
    constructor(Button){
        //音声格納用の変数にRecordAndPlayを設定する
        this.soundContainer = [new RecordAndPlay(mic), new RecordAndPlay(mic)];
    }

    draw(){
    }

    checkButton(){
    }

    firstFinish(){
    }
}