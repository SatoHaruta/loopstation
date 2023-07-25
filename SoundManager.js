//SoundManagerの役割は、二つのサウンドファイル（soundContainer）を管理できる関数を生成すること。後期では、エフェクトの管理もここでやりたい

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