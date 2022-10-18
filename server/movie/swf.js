const get = require("../req/get");
const path = require("path");
const folder = path.join(__dirname, "../static");
const fs = require("fs");

module.exports = function (req, res) {
  switch (req.method) {
    case "GET": {
      const match = req.url.match(/\/swfs\/([^/]+)$/);
      if (!match) return;
      const file = match[1];
      const b = fs.readFileSync(path.join(folder, file));
      res.end(b);
      return true;
    } case "POST": {}
  }
}