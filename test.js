let track = [];
let getKey = [];//キーの反応のクラス
// 録音、停止、再生の状態を表す
let state = 0;
let buttonCount;//ボタンの数
let mic;


function setup() {
    createCanvas(100, 100);
    background(255,0,0);
    mic = new p5.AudioIn();
    //ボタンの数
    buttonCount = 4;
    // p5.AudioInオブジェクトを作成
    micOn();
    for (let i = 0; i < buttonCount; i++) {
        getKey[i] = new keySystem(i);//ここでボタンひとつにつき一つのkeySystemインスタンスを作る
        track[i] = new RecordAndPlay(mic);
    }
}


function draw() {
    background(0);
    for (let i = 0; i < buttonCount; i++) {
        getKey[i].getKeyTiming();//ここでキーを取得している
    }
    keyToRecord();//クラスじゃないのでfor文の中に入れるな!
}

//マイク起動し、レコーダーに接続する関数
function micOn() {
    // オーディオ入力処理を開始
    mic.start();
    console.log("マイクon");
}


function mouseClicked() {
    if (state == 0) {
    }
    state++;
}


function keyPressed() {
    for (let i = 0; i < buttonCount; i++) {
        getKey[i].getKeyPress();
    }
}

function keyReleased() {
    for (let i = 0; i < buttonCount; i++) {
        getKey[i].getKeyReleased();
    }
}




