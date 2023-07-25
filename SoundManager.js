//SoundManagerの役割は、二つのサウンドファイル（soundContainer）を管理できる関数を生成すること。後期では、エフェクトの管理もここでやりたい

class SoundManager{
    constructor(Mic){
        //マイクの継承
        this.mic = Mic;
        //音声格納用の変数にRecordAndPlayを設定する
        //[0]がセーブ用途のプレファイル。[1]が本ファイル。
        this.soundContainer = [new RecordAndPlay(mic), new RecordAndPlay(mic)];
    }

    draw(){
    }

    
}