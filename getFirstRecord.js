//ここでは、最初の録音のタイミングを取得し、そのdurationを定義している

let globalDuration;//再生の基準値
let globalIsSet = false;//一回でも録音されるとtrueになる。

function getFirstRecord() {
    if (globalIsSet == false) {
        //trackManagerの回数分だけ行う
        for (let i = 0; i < trackManager.length; i++) {
            //trackの数分for分を回す
            for (let u = 0; u < trackManager[i].soundManager.length; u++) {
                
                if (trackManager[i].soundManager[u].soundIsSet == true) {
                    //globalIsSetをtrueにする。
                    globalIsSet = true;
                }

            }
        }
    }
}