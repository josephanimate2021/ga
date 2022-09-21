// vars
const http = require('http');

const hostname = '127.0.0.1';
const port = 80;

// basic utilities
const theme = require("./theme/list");
const pages = require("./pages");
const url = require('url');

const utiltiies = {
  theme,
  pages
};

const server = http.createServer((req, res) => {
  const purl = url.parse(req.url, true);
  const found = utiltiies.find(u => u(req, res, purl));
  if (found) {
    res.statusCode = 200;
    res.setHeader("Location", "/studio");
  } else {
    res.statusCode = 404;
    res.end('404 not found');
  }
});

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));
  
