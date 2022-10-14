// modules
const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");
const path = require("path");
const dev = true;

/**
 * load flash player
 */
let pluginName;
switch (process.platform) {
	case "win32": {
		pluginName = "./extensions/pepflashplayer.dll";
		break;
	} case "darwin": {
		pluginName = "./extensions/PepperFlashPlayer.plugin";
		break;
	} case "linux": {
		pluginName = "./extensions/libpepflashplayer.so";
		// i don't know what this does but it makes flash work
		app.commandLine.appendSwitch("no-sandbox");
		break;
	}
}
app.commandLine.appendSwitch("ppapi-flash-path", path.join(__dirname, pluginName));
app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");

let mainWindow;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		title: "FlashThemes",
		webPreferences: {
			plugins: true,
			contextIsolation: true
		}
	});
	// use it in external scripts
	process.env.MAIN_WINDOW_ID = mainWindow.id;

	// initialize stuff
	// clear the menu bar
	Menu.setApplicationMenu(Menu.buildFromTemplate([]));
	// load flashthemes
	mainWindow.loadURL("https://flashthemes.net/");
	mainWindow.on("closed", () => mainWindow = null);

	// debug stuff
	if (dev) mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
	// wait for the server
	setTimeout(createWindow, 2000);
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (mainWindow === null) createWindow();
});
