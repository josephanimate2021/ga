// vars
const http = require('http');
const body = require("./req/body");

const env = {
  hostname: '127.0.0.1',
  port: 80,
  MOVIE_FOLDER: "./files/movies",
  STARTER_FOLDER: "./files/starters",
  ASSETS_FOLDER: "./files/assets",
  node_env: "dev"
};
const folder = env.ASSETS_FOLDER;
env.BG_FOLDER = `${folder}/backgrounds`;
env.PROPS_FOLDER = `${folder}/props`;
env.SOUNDS_FOLDER = `${folder}/sounds`;
env.CHARS_FOLDER = `${folder}/chars`;
env.DATABASES_FOLDER = `${folder}/meta`;

// basic utilities
const theme = require("./theme/list");
const pages = require("./pages");
const url = require('url');
const fs = require('fs');

const utilities = {
  theme,
  pages
};

if (!fs.existsSync(`./env.json`)) fs.writeFileSync(`./env.json`, JSON.stringify(env));
if (!fs.existsSync(folder)) fs.mkdirSync(folder);
if (!fs.existsSync(env.MOVIE_FOLDER)) fs.mkdirSync(env.MOVIE_FOLDER);
if (!fs.existsSync(env.STARTER_FOLDER)) fs.mkdirSync(env.STARTER_FOLDER);
if (!fs.existsSync(env.BG_FOLDER)) fs.mkdirSync(env.BG_FOLDER);
if (!fs.existsSync(env.PROPS_FOLDER)) fs.mkdirSync(env.PROPS_FOLDER);
if (!fs.existsSync(env.SOUNDS_FOLDER)) fs.mkdirSync(env.SOUNDS_FOLDER);
if (!fs.existsSync(env.CHARS_FOLDER)) fs.mkdirSync(env.CHARS_FOLDER);
if (!fs.existsSync(env.DATABASES_FOLDER)) fs.mkdirSync(env.DATABASES_FOLDER);
Object.assign(process.env, require("./env"));
const server = http.createServer((req, res) => {
  try {
    const purl = url.parse(req.url, true);
    const found = utilities.find(u => u(req, res, purl));
    if (found) {
      req.body = body(req, res).then(data => `${data}`);
      res.statusCode = 302;
      res.setHeader("Location", "/studio");
    } else res.statusCode = 404;
    if (env.node_env == "dev") console.log(req.method, purl.path, "-", res.statusCode);
  } catch (x) {
    console.error(x);
    res.statusCode = 500;
  }
});

server.listen(env.port, env.hostname, () => console.log(`Server running at http://${env.hostname}:${env.port}/`));
  
