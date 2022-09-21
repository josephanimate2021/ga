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

const utiltiies = {
  theme,
  pages
};

if (!fs.existsSync(`./env.json`)) fs.writeFileSync(`./env.json`, JSON.stringify(env));
Object.assign(process.env, require("./env"));
const server = http.createServer((req, res) => {
  const purl = url.parse(req.url, true);
  const found = utiltiies.find(u => u(req, res, purl));
  if (found) {
    req.body = body(req, res).then(data => `${data}`);
    res.statusCode = 302;
    res.setHeader("Location", "/studio");
  } else {
    res.statusCode = 404;
    res.end('404 not found');
  }
  if (env.node_env == "dev") console.log(req.method, purl.path, "-", res.statusCode);
});

server.listen(env.port, env.hostname, () => console.log(`Server running at http://${env.hostname}:${env.port}/`));
  
