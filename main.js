// vars
const http = require('http');
const fs = require('fs');

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
  // static stuff
  STATIC_SWF_URL: "/static/animation",
  STATIC_STORE_URL: "/static/store",
  STATIC_CLIENT_URL: "/static",
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
env.TEXT_COMPARTMENTS_FOLDER = `${folder}/compartments`

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
if (!fs.existsSync(env.TEXT_COMPARTMENTS_FOLDER)) fs.mkdirSync(env.TEXT_COMPARTMENTS_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER)) fs.mkdirSync(env.DATABASES_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER + `/names`)) fs.mkdirSync(env.DATABASES_FOLDER + `/names`);
if (!fs.existsSync(env.DATABASES_FOLDER + `/states`)) fs.mkdirSync(env.DATABASES_FOLDER + `/states`);
if (!fs.existsSync(env.DATABASES_FOLDER + `/tags`)) fs.mkdirSync(env.DATABASES_FOLDER + `/tags`);

// basic utilities
const theme = require("./theme/core");
const static = require("./static/swf");
const font = require("./static/font");
const text = require("./static/text_component");
const Static = require("./static/framework");
const mo = require("./static/mo");
const favicon = require("./favicon");
const store = require("./static/stockAssets");
const movie = require("./movie/core");
const asset = require("./asset/core");
const pages = require("./pages");
const crossdomain = require("./crossdomain");
const url = require('url');

const utilities = [
  favicon,
  text,
  font,
  static,
  Static,
  mo,
  store,
  movie,
  asset,
  theme,
  crossdomain,
  pages
];

Object.assign(process.env, require("./env"));
const server = http.createServer((req, res) => {
  try {
    const purl = url.parse(req.url, true);
    if (utilities.find(u => u(req, res, purl))) res.statusCode = 200;
    else res.statusCode = 404;
    var status;
    switch (res.statusCode) {
      case 404: {
        status = "404 (Not Found Or Recognized)";
        break;
      } case 200: {
        status = "200 (ok)";
        break;
      } case 302: {
        status = "302 (Found)";
        break;
      } case 500: {
        status = "500 (Server Failure)";
        break;
      }
    }
    if (env.node_env == "dev") console.log(req.method, purl.path, "-", status);
  } catch (x) {
    console.error(x);
    res.statusCode = 500;
  }
});

server.listen(env.port, env.hostname, () => {
  if (env.port == 80) console.log(`Server running at http://localhost/`);
  else console.log(`Server running at http://localhost:${env.port}/`);
});
  
