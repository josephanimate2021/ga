// modules
const { app, BrowserWindow, Menu } = require("electron");
const fs = require("fs");
const path = require("path");
// vars

/**
 * initialization
 */
// env stuff
const env = {
	hostname: '127.0.0.1',
	port: 80,
	MOVIE_FOLDER: "./files/movies",
	STARTER_FOLDER: "./files/starters",
	ASSETS_FOLDER: "./files/assets",
	FILES_FOLDER: "./files",
	CHAR_BASE_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Character-Dump/master/characters",
	THUMBNAILS_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Thumbnails/master/thumbnails",
	SWF_URL: "https://josephanimate2021.github.io/lvm-static/api/zimmertwins",
	// env
	node_env: "dev"
};
const folder = env.ASSETS_FOLDER, sFolder = `${folder}/sounds`;
if (!fs.existsSync(sFolder)) fs.mkdirSync(sFolder);
env.BG_FOLDER = `${folder}/backgrounds`;
env.PROPS_FOLDER = `${folder}/props`;
env.MUSIC_FOLDER = `${sFolder}/music`;
env.SOUNDS_FOLDER = `${sFolder}/effects`;
env.VOICEOVERS_FOLDER = `${sFolder}/voiceovers`;
env.CHARS_FOLDER = `${folder}/chars`;
env.DATABASES_FOLDER = `${folder}/meta`;
fs.writeFileSync(`./wrapper/env.json`, JSON.stringify(env));
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
if (!fs.existsSync(env.BG_FOLDER)) fs.mkdirSync(env.BG_FOLDER);
if (!fs.existsSync(env.PROPS_FOLDER)) fs.mkdirSync(env.PROPS_FOLDER);
if (!fs.existsSync(env.SOUNDS_FOLDER)) fs.mkdirSync(env.SOUNDS_FOLDER);
if (!fs.existsSync(env.MUSIC_FOLDER)) fs.mkdirSync(env.MUSIC_FOLDER);
if (!fs.existsSync(env.VOICEOVERS_FOLDER)) fs.mkdirSync(env.VOICEOVERS_FOLDER);
if (!fs.existsSync(env.CHARS_FOLDER)) fs.mkdirSync(env.CHARS_FOLDER);
Object.assign(process.env, require("./wrapper/env"));
// start the server
require("./wrapper/server");

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
	if (env.NODE_ENV == "development") {
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
