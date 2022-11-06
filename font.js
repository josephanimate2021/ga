const fs = require("fs");

module.exports = function (req, res, url) {
  if (req.method != "GET" || req.url != "/font.css") return;
  res.end(fs.readFileSync('font.css'));
  return true;
};