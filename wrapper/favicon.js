const fs = require("fs");
const path = require("path");

module.exports = function (req, res) {
  if (req.method != "GET" || req.url != "/favicon.ico") return;
  res.setHeader("Content-Type", "image/png");
  res.end(fs.readFileSync(path.join(__dirname, "../", "favicon.ico")));
  return true;
};
