// modules
import fs from 'fs';
// vars

/**
 * initialization
 */
// env stuff
const env = {
	hostname: '127.0.0.1',
	port: 4090,
	MOVIE_FOLDER: "./files/movies",
	STARTER_FOLDER: "./files/starters",
	TITLES_FOLDER: "./files/titles",
	DATABASES_FOLDER: "./files/assets/meta",
	FILES_FOLDER: "./files",
	HOME_HTML: '<a href="/">Home</a><br><br>',
	SWF_URL: "https://josephanimate2021.github.io/lvm-static/api/zimmertwins",
	APP_TITLE: "Zimmer Twins Recreation Project"
};
if (!process.env.node_env) env.node_env = fs.existsSync(".git") ? "dev" : "production";
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
if (!fs.existsSync(env.STARTER_FOLDER)) fs.mkdirSync(env.STARTER_FOLDER);
if (!fs.existsSync(env.TITLES_FOLDER)) fs.mkdirSync(env.TITLES_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER.slice(0, -5))) fs.mkdirSync(env.DATABASES_FOLDER.slice(0, -5));
if (!fs.existsSync(env.DATABASES_FOLDER)) fs.mkdirSync(env.DATABASES_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER + "/users.json")) fs.writeFileSync(env.DATABASES_FOLDER + "/users.json", JSON.stringify([]));
Object.assign(process.env, env);
// start the server
import server from './src/server.js';
server.listen(env.port, env.hostname, () => {
	if (env.port == 80) console.log(`Server running at http://localhost/`);
	else console.log(`Server running at http://localhost:${env.port}/`);
});