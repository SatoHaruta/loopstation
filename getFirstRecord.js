//ここでは、最初の録音のタイミングを取得し、そのdurationを定義している

let globalDuration;//再生の基準値
let globalIsSetState = "notSet";//一回でも録音されるとtrueになる。
let globalIsSetFalseChecker = 0;//全てfalseの場合を測定する


function getFirstRecord() {
    if (globalIsSetState == "notSet") {
        //trackManagerの回数分だけ行う
        for (let i = 0; i < trackManager.length; i++) {
            //trackの配列分回す
            if (trackManager[i].trackIsSet == true) {
                globalIsSetState = "recordingSet";
            }
        }
    }
    else if (globalIsSetState == "recordingSet") {
        globalIsSetState = "alreadySet"
    }
    else if (globalIsSetState == "alreadySet") {
        globalIsSetFalseChecker = 0;
        for (let i = 0; i < trackManager.length; i++) {
            //trackの配列分回す
            if (trackManager[i].trackIsSet == true) {
                globalIsSetFalseChecker++;
            }
        }
        if (globalIsSetFalseChecker == 0) {
            globalIsSetState = "notSet";
        }
    }
}

function setGlobalDuration() {
    for (i = 0; i < trackManager.length; i++) {
        console.log(trackManager[i].soundManager.length);
        if(trackManager[i].soundManager[0].soundManagerIsSet == true){
            globalDuration = trackManager[i].soundManager[0].duration;
            if(developerMode){console.log("globalDuration設定した")};
        }
    }
}