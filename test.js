//ここを増やすだけでボタンが増えます。
let keyConfig = ['a'];//キーの反応のクラス
// 録音、停止、再生の状態を表す
let state = 0;
let mic;
let trackManager = [];
let button = [];
//ここをtrueにすると、consoleが見れる
let developerMode = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    mic = new p5.AudioIn();
    // p5.AudioInオブジェクトを作成
    micOn();
    for (let i = 0; i < keyConfig.length; i++) {
        //ここでボタンひとつにつき一つのkeySystemインスタンスを作る
        //ここではkeySystemに一つ目の配列に入っている文字を送る
        keyConfig[i] = new keySystem(keyConfig[i]);
        trackManager[i] = new TrackManager(mic, i);
        button[i] = new ButtonDisplay(100 * (i + 1), windowHeight / 2, 50, i);
    }
}


function draw() {
    background(255);
    // keyToRecord();//クラスじゃないのでfor文の中に入れるな!

    //ここでキーを更新している
    for (let i = 0; i < keyConfig.length; i++) {
        trackManager[i].draw();
        keyConfig[i].update();
        button[i].display();
        if (developerMode) { console.log(trackManager[i].soundManager[0].soundManagerState); }
    }
    getFirstRecord();
    console.log(globalIsSetState);
}

//マイク起動し、レコーダーに接続する関数
function micOn() {
    // オーディオ入力処理を開始
    userStartAudio();
    mic.start();
    if (developerMode) { console.log("マイクon"); }
}



function keyPressed() {
    for (let i = 0; i < keyConfig.length; i++) {
        keyConfig[i].setKeyPress();
    }
}

function keyReleased() {
    for (let i = 0; i < keyConfig.length; i++) {
        keyConfig[i].setKeyReleased();
    }
}






