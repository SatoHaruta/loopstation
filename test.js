
let keyConfig = ['a','s','d','f'];//キーの反応のクラス
// 録音、停止、再生の状態を表す
let state = 0;
let mic;


function setup() {
    createCanvas(100, 100);
    background(255, 0, 0);
    mic = new p5.AudioIn();
    // p5.AudioInオブジェクトを作成
    micOn();
    for (let i = 0; i < keyConfig.length; i++) {
        //ここでボタンひとつにつき一つのkeySystemインスタンスを作る
        //ここではkeySystemに一つ目の配列に入っている文字を送る
        keyConfig[i] = new keySystem(keyConfig[i]);
    }
}


function draw() {
    background(0);
    // keyToRecord();//クラスじゃないのでfor文の中に入れるな!

    //ここでキーを更新している
    for (let i = 0; i < keyConfig.length; i++) {
        keyConfig[i].update();
    }
}

//マイク起動し、レコーダーに接続する関数
function micOn() {
    // オーディオ入力処理を開始
    userStartAudio();
    mic.start();
    console.log("マイクon");
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






