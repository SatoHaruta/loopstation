//ここでは、最初の録音のタイミングを取得し、そのdurationを定義している
class DurationManager {

    trackIsSetCount;
    durationState = "waiting";//waiting,durationOverの二つの状態を定義している
    globalIsSetState = "notSet";//noSet,recordingSet,alreadySetの三つの状態を保持している
    globalTimer;//最初に録音されてから、時間を測り続けるタイマー
    globalDuration = 0;//再生の基準値
    constructor() {
        this.globalTimer = new Timer();
    }

    DurationManagerUpdate() {
        //globalIsSetの状態を更新する
        this.updateGlobalIsSetState();
        this.updateDurationState();
        this.updateTrackIsSetCount();
        console.log(this.durationState);
        //console.log(this.globalTimer.getElapsedTime());
        //最初の録音が登録された瞬間に
        if (this.globalIsSetState == "recordingSet") {
            this.setGlobalDuration();
            //すでにglobalTimerが計測中なら
            if (this.globalTimer.running == true) {
                //リセットする
                this.resetGlobalTimer(0);
                if (developerMode) { console.log("globalTimerリセット") }
            }
            //まだglobalTimerが始まっていなかったら
            if (this.globalTimer.running == false) {
                //スタートする
                this.startGlobalTimer(0);
                if (developerMode) { console.log("globalTimerスタート") }
            }

        }

    }

    //GlobalIsSetStateの状態を更新する
    updateGlobalIsSetState() {
        //まだ最初の録音がされていない場合
        if (this.globalIsSetState == "notSet") {
            if (this.trackIsSetCount > 0) {
                this.globalIsSetState = "recordingSet";
            }
        }
        //ひとつ前のフレームで録音のセットが行われた場合
        else if (this.globalIsSetState == "recordingSet") {
            this.globalIsSetState = "alreadySet"
        }
        //すでに録音が行われている場合
        else if (this.globalIsSetState == "alreadySet") {
            if (this.trackIsSetCount == 0) {
                this.globalIsSetState = "notSet";
            }
        }
    }


    //今幾つのトラックが録音済みかどうかを更新している
    updateTrackIsSetCount(){
        //全トラックの中でtrackIsSet = trueの数をtrackIsSetCountに格納する
        this.trackIsSetCount = trackManager.filter(track => track.trackIsSet === true).length;
    }

    //globalDurationを設定する（複数トラックですでに録音されている場合は使わないでください）
    setGlobalDuration() {
        if (this.globalIsSetState == "recordingSet") {
            //globalDurationにtrackDuration配列の中の最初に0じゃない値を探し代入している
            this.globalDuration = trackManager.find(track => track.trackDuration != 0).trackDuration;
            if (developerMode) { console.log("globalDuration設定した") };
        }
    }

    //常時globalTimerを監視し、globalDurationを超えた瞬間にStateを切り替える
    updateDurationState() {
        //globalTimerがglobalDurationの値を超えた時
        if (this.durationState == "waiting" && this.getDurationOver() == true) {
            this.durationState = "durationOver";
        }
        else if (this.durationState == "durationOver" && this.getDurationOver() == false) {
            this.durationState = "waiting";
        }
    }

    //現在の時間がglobalDurationを超えた時のみtrueを返す
    getDurationOver() {
        if (this.globalTimer.getElapsedTime() > this.globalDuration) {
            return true;
        }
        else {
            return false;
        }
    }

    //現時点のglobalTimerとglobalDurationの値の差分
    getOverTimeDifference() {
        return this.globalTimer.getElapsedTime() - this.globalDuration;
    }

    startGlobalTimer(startTime) {
        this.globalTimer.start();
        this.globalTimer.setElapsedTime(startTime);
    }

    resetGlobalTimer(startTime) {
        this.globalTimer.reset();
        this.globalTimer.setElapsedTime(startTime);
    }

}




// console.log(this.getOverTimeDifference());
//         this.resetGlobalTimer(this.getOverTimeDifference());