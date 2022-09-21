// vars
const http = require('http');

const env = {
  hostname: '127.0.0.1',
  port: 80,
  MOVIE_FOLDER: "./files/movies",
  STARTER_FOLDER: "./files/starters"
};

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
    res.statusCode = 302;
    res.setHeader("Location", "/studio");
  } else {
    res.statusCode = 404;
    res.end('404 not found');
  }
});

server.listen(env.port, env.hostname, () => console.log(`Server running at http://${env.hostname}:${env.port}/`));
  
