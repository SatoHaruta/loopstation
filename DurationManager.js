//ここでは、最初の録音のタイミングを取得し、そのdurationを定義している
class DurationManager{

durationState = "waiting";
globalCurrentTime = 0;//現在の時間
globalTimer;//最初に録音されてから、時間を測り続けるタイマー
globalDuration = 0;//再生の基準値
globalIsSetState = "notSet";//一回でも録音されるとtrueになる。
globalIsSetFalseChecker = 0;//全てfalseの場合を測定する
constructor(){
    this.globalTimer = new Timer();
}

DurationManagerUpdate(){
    this.getFirstRecord();
    this.setDurationState();
    console.log(this.durationState + " / " + this.globalTimer.getElapsedTime() + " / " + this.globalDuration);
    //最初の録音が登録された瞬間に
    if(this.globalIsSetState == "recordingSet"){
        this.setGlobalDuration();
        //すでにglobalTimerが計測中なら
        if(this.globalTimer.running == true){
            //リセットする
            this.resetGlobalTimer();
            if(developerMode){console.log("globalTimerリセット")}
        }
        //まだglobalTimerが始まっていなかったら
        if(this.globalTimer.running == false){
            //スタートする
            this.startGlobalTimer();
            if(developerMode){console.log("globalTimerスタート")}
        }

    }

}

getFirstRecord() {
    if (this.globalIsSetState == "notSet") {
        //trackManagerの回数分だけ行う
        for (let i = 0; i < trackManager.length; i++) {
            //trackの配列分回す
            if (trackManager[i].trackIsSet == true) {
                this.globalIsSetState = "recordingSet";
            }
        }
    }
    else if (this.globalIsSetState == "recordingSet") {
        this.globalIsSetState = "alreadySet"
    }
    else if (this.globalIsSetState == "alreadySet") {
        this.globalIsSetFalseChecker = 0;
        for (let i = 0; i < trackManager.length; i++) {
            //trackの配列分回す
            if (trackManager[i].trackIsSet == true) {
                this.globalIsSetFalseChecker++;
            }
        }
        if (this.globalIsSetFalseChecker == 0) {
            this.globalIsSetState = "notSet";

        }
    }
}

//globalDurationを設定する
setGlobalDuration() {
    //trackManagerの数だけfor文を回す
    for (let i = 0; i < trackManager.length; i++) {
        //各trackManagerのtrackIsSetがtrueだったら
        if(trackManager[i].trackIsSet == true){
            //globalDurationを設定する
            this.globalDuration = trackManager[i].soundManager[0].duration;
            if(developerMode){console.log("globalDuration設定した")};
        }
    }
}

//常時globalTimerを監視し、globalDurationを超えた瞬間にStateを切り替える
setDurationState(){
    if(this.durationState == "waiting" && this.getDurationOver() == true){
        this.durationState = "durationOver";
        this.resetGlobalTimer();
    }
    else if(this.durationState == "durationOver"){
        this.durationState = "waiting";
    }
}

//現在の時間がglobalDurationを超えた時のみtrueを返す
getDurationOver(){
    if(this.globalTimer.getElapsedTime() > this.globalDuration){
        return true;
    }
    else{
        return false;
    }
}

startGlobalTimer(){
    this.globalTimer.start();
}

resetGlobalTimer(){
    this.globalTimer.reset();
}

}