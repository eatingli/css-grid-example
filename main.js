const Electron = require('electron')
const { app, BrowserWindow } = Electron

const os = require('os')
const path = require('path')
const url = require('url')

let mainWindow

/**
 * Build up main window
 */
function createWindow() {


    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            experimentalFeatures: true,
        },
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './main-window/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.

    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null
        app.quit()
    })
}

/**
 * 
 */
app.on('ready', () => {

    // 
    createWindow();

})

/**
 * 
 */
app.on('will-quit', function () {
    globalShortcut.unregisterAll()
})

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/**
 * 
 */
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})