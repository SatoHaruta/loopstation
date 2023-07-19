let nowRecording = false;


function keyToRecord() {
    //全てのボタンの状態を確認するためにfor文で回す
    for (let i = 0; i < buttonCount; i++) {
        //最初押した瞬間、録音開始
        if (getKey[i].keyTiming == 1 && track[i].isSet == false) {
            track[i].startRecord();
            //もし、最初の録音だったら、スタートタイムを設定
            if(getFirstRecord()){
                getStartTime();
            }
            //再生中であることを示す変数をtrueに
            isRecording = true;
        }

        //最初離した瞬間、録音停止
        if (getKey[i].keyTiming == 2 && track[i].isSet == false) {
            //もし、最初の録音だったらデュレーションを設定
            if(getFirstRecord() == true){
                setDuration();
            }
            track[i].finishRecord();
            //再生中であることを示す変数をfalseに
            isRecording = false;
        }

        //録音されている状態かつ、再生中ではない状態で押されたら
        if (getKey[i].keyTiming == 1 && track[i].isSet == true && track[i].isPlaying == false) {
            //再生する
            track[i].playRecord()
        }
        //録音されている状態かつ、再生中に押されたら
        else if (getKey[i].keyTiming == 1 && track[i].isSet == true && track[i].isPlaying == true) {
            track[i].stopPlaying()
        }
    }
    
}
