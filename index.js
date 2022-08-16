const {app,BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes:true
    }))
 
    // メインウィンドウが閉じられたときの処理
    mainWindow.on('closed',()=>{
        mainWindow = null
    })
}

// Electron の初期化が完了すると１回発生する
app.on('ready',createWindow)

// すべてのウィンドウが閉じられたときに発生する
app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        // アプリケーションが終了するときに発生する
        // ※Windows では、このイベントはシステムのシャットダウン/再起動やユーザーのログアウトでアプリケーションが閉じられようとしている場合には発生しない
        app.quit()
    }
})

// アプリケーションがアクティブになったときに発生する
// →いつ動く？
app.on('activate',()=>{
    if(mainWindow === null){
        createWindow()
    }
})