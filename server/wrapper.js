// vars
const http = require('http');
const url = require('url');
const fs = require('fs');
const env = process.env;

// basic utilities
const movie = require("./movie/asset");
const swf = require("./movie/swf");
const pages = require("./pages");
const crossdomain = require("./crossdomain");

const utilities = [
  swf,
  movie,
  crossdomain,
  pages
];
const server = http.createServer((req, res) => {
  try {
    const purl = url.parse(req.url, true);
    if (utilities.find(u => u(req, res, purl))) res.statusCode = 200;
    else res.statusCode = 404;
    if (env.node_env == "dev") console.log(req.method, purl.path, "-", res.statusCode, `(${req.headers.host})`);
  } catch (x) {
    console.error(x);
    res.statusCode = 500;
  }
});

server.listen(env.school_port, env.hostname, () => {
  if (env.school_port == 80) console.log(`Server running at http://localhost/`);
  else console.log(`Server running at http://localhost:${env.school_port}/`);
});
