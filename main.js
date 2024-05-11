const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/preload/index.js')
        }
    })
    win.webContents.openDevTools()
    win.loadFile('index.html')
    // win.loadURL('http://127.0.0.1:5173')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})