// modules
const fs = require("fs");
const envFile = "./wrapper/env.json";
var exec = require('child_process').execFile;
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
	TITLES_FOLDER: "./files/titles",
	DATABASES_FOLDER: "./files/assets/meta",
	FILES_FOLDER: "./files",
	HOME_HTML: '<a href="/">Home</a><br><br>',
	CHAR_BASE_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Character-Dump/master/characters",
	THUMBNAILS_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Thumbnails/master/thumbnails",
	SWF_URL: "https://josephanimate2021.github.io/lvm-static/api/zimmertwins",
};
if (fs.existsSync(".git")) env.node_env = "dev";
else env.node_env = "production";
fs.writeFileSync(envFile, JSON.stringify(env));
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
if (!fs.existsSync(env.TITLES_FOLDER)) fs.mkdirSync(env.TITLES_FOLDER);
Object.assign(process.env, require(envFile.slice(0, -5)));
// start the server
require(envFile.slice(0, -8) + "server");