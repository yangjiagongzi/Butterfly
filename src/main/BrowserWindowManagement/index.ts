import { BrowserWindow, nativeTheme } from 'electron'
import { EventName } from '~/constant/event'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

class BrowserWindowManagement {
  private mainWindow: BrowserWindow | null = null

  initMainWindow = () => {
    this.mainWindow = new BrowserWindow({
      fullscreen: true,
      backgroundColor: '#171717',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
      }
    })
    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow!.webContents.send(EventName.OnDarkModeUpdate, nativeTheme.shouldUseDarkColors)
    })
    // and load the index.html of the app.
    this.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  }

  onAppActivate = () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      this.initMainWindow()
    }
  }
}

export default new BrowserWindowManagement()
