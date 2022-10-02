// vars
const http = require('http');

const env = {
  hostname: '127.0.0.1',
  port: 80,
  MOVIE_FOLDER: "./files/movies",
  STARTER_FOLDER: "./files/starters",
  ASSETS_FOLDER: "./files/assets",
  CHAR_BASE_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Character-Dump/master/characters",
  THUMBNAILS_URL: "https://raw.githubusercontent.com/GoAnimate-Wrapper/GoAnimate-Thumbnails/master/thumbnails",
  // anistick swfs beta
  SWF_URL: "https://josephanimate2021.github.io/Animium-Swfs",
  STORE_URL: "https://josephanimate2021.github.io/store/3a981f5cb2739137",
  CLIENT_URL: "https://josephanimate2021.github.io/static/55910a7cd204c37c",
  // env
  node_env: "dev"
};
const folder = env.ASSETS_FOLDER, sFolder = `${folder}/sounds`;
env.BG_FOLDER = `${folder}/backgrounds`;
env.PROPS_FOLDER = `${folder}/props`;
env.MUSIC_FOLDER = `${sFolder}/music`;
env.SOUNDS_FOLDER = `${sFolder}/effects`;
env.VOICEOVERS_FOLDER = `${sFolder}/voiceovers`;
env.CHARS_FOLDER = `${folder}/chars`;
env.DATABASES_FOLDER = `${folder}/meta`;

// basic utilities
const theme = require("./theme/core");
const movie = require("./movie/core");
const asset = require("./asset/core");
const pages = require("./pages");
const crossdomain = require("./crossdomain");
const url = require('url');
const fs = require('fs');

const utilities = [
  movie,
  asset,
  theme,
  crossdomain,
  pages
];

fs.writeFileSync(`./env.json`, JSON.stringify(env));
if (!fs.existsSync(folder)) fs.mkdirSync(folder);
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
if (!fs.existsSync(env.STARTER_FOLDER)) fs.mkdirSync(env.STARTER_FOLDER);
if (!fs.existsSync(env.BG_FOLDER)) fs.mkdirSync(env.BG_FOLDER);
if (!fs.existsSync(env.PROPS_FOLDER)) fs.mkdirSync(env.PROPS_FOLDER);
if (!fs.existsSync(env.SOUNDS_FOLDER)) fs.mkdirSync(env.SOUNDS_FOLDER);
if (!fs.existsSync(env.MUSIC_FOLDER)) fs.mkdirSync(env.MUSIC_FOLDER);
if (!fs.existsSync(env.VOICEOVERS_FOLDER)) fs.mkdirSync(env.VOICEOVERS_FOLDER);
if (!fs.existsSync(env.CHARS_FOLDER)) fs.mkdirSync(env.CHARS_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER)) fs.mkdirSync(env.DATABASES_FOLDER);
Object.assign(process.env, require("./env"));
const server = http.createServer((req, res) => {
  try {
    const purl = url.parse(req.url, true);
    if (utilities.find(u => u(req, res, purl))) res.statusCode = 200;
    else res.statusCode = 404;
    if (env.node_env == "dev") console.log(req.method, purl.path, "-", res.statusCode);
  } catch (x) {
    console.error(x);
    res.statusCode = 500;
  }
});

server.listen(env.port, env.hostname, () => {
  if (env.port == 80) console.log(`Server running at http://localhost/`);
  else console.log(`Server running at http://localhost:${env.port}/`);
});
  
