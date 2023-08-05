//ここでは、最初の録音のタイミングを取得し、そのdurationを定義している
class DurationManager{


globalDuration = 0;//再生の基準値
globalIsSetState = "notSet";//一回でも録音されるとtrueになる。
globalIsSetFalseChecker = 0;//全てfalseの場合を測定する
constructor(){
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

setGlobalDuration() {
    for (let i = 0; i < trackManager.length; i++) {
        if(trackManager[i].soundManager[0].soundManagerIsSet == true){
            this.globalDuration = trackManager[i].soundManager[0].duration;
            if(developerMode){console.log("globalDuration設定した")};
        }
    }
}

}