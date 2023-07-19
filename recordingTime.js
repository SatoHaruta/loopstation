let startTime, duration, isSetCount, firstRecord;

//初めての録音かどうかの判別。初めてならtrueが返ってくる関数
function getFirstRecord() {
    //初期化
    isSetCount = 0;
    firstRecord = false;
    //ボタンの数を回して全てのisSetがfalseだったら
    for (let i = 0; i < buttonCount; i++) {
        if (track[i].isSet == true) {
            //trueだったらisSetCountを足す
            isSetCount++;
        }
    }
    //もし、isSetCount == 0だったら
    if(isSetCount == 0){
        return true;
    }
    //もし、isSetCountが1以上だったら
    else{
        return false;
    }
}

//スタートする時点でのミリ数を取得
function getStartTime() {
    startTime = millis();
}

//終わった時点とスタート地点の差分でdurationを定義する
function setDuration(){
    duration = millis() - startTime;//ここでdurationを定義する
    console.log(duration);
}

