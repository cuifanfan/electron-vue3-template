import { app, BrowserWindow, ipcMain, session, shell } from 'electron';
import { join } from 'path';
import { electronApp, is, optimizer } from '@electron-toolkit/utils';
import fs from 'fs';

const configPath = join(__dirname, '../../resources/config/config.json');
const defaultConfig = {
    IP: '127.0.0.1',
    Port: '18880',
    WS_Port: '18881'
};

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 984,
        maxWidth: 1280,
        maxHeight: 984,
        show: false,
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false,
            webSecurity: false
        }
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: 'deny' };
    });
    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
    ipcMain.on('ping', () => console.log('pong'));
    // 窗体控制
    ipcMain.on('closeApp', () => {
        app.quit();
    });
    ipcMain.on('hideApp', () => {
        mainWindow.minimize();
    });
    ipcMain.on('setFullScreen', (event, operator) => {
        mainWindow.setFullScreen(operator);
    });
    // 服务配置
    ipcMain.on('getConfigData', (e) => {
        let configData;
        try {
            configData = JSON.parse(fs.readFileSync(configPath).toString());
        } catch (err) {
            configData = defaultConfig;
        }
        e.returnValue = configData;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
    });
    createWindow();
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    if (process.env.NODE_ENV !== 'production' && !process.env.IS_TEST) {
        session.defaultSession.loadExtension(join(__dirname, '../../devtools'));
    }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
