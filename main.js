// modules
const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");
const path = require("path");
const envFile = path.join(__dirname, "./wrapper/env.json");
// vars

/**
 * initialization
 */
// env stuff
const env = {
	hostname: '127.0.0.1',
	port: 80,
	MOVIE_FOLDER: path.join(__dirname, "./files/movies"),
	STARTER_FOLDER: path.join(__dirname, "./files/starters"),
	DATABASES_FOLDER: path.join(__dirname, "./files/assets/meta"),
	FILES_FOLDER: path.join(__dirname, "./files"),
	HOME_HTML: '<a href="/">Home</a><br><br>',
	CHAR_BASE_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Character-Dump/master/characters",
	THUMBNAILS_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Thumbnails/master/thumbnails",
	SWF_URL: "https://josephanimate2021.github.io/lvm-static/api/zimmertwins",
	// env
	node_env: "dev"
};
fs.writeFileSync(envFile, JSON.stringify(env));
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
Object.assign(process.env, require(envFile.slice(0, -5)));
// start the server
require(envFile.slice(0, -8) + "server");

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
		title: "Zimmer Twins",
		icon: path.join(__dirname, "./favicon.ico"),
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
	// load the video list
	mainWindow.loadURL("http://localhost");
	mainWindow.on("closed", () => mainWindow = null);

	// debug stuff
	if (env.node_env == "dev") {
		mainWindow.webContents.openDevTools();
	}
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