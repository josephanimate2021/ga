const fs = require("fs");

module.exports = function (req, res, url) {
  if (req.method != "GET" || !url.pathname.startsWith("/fonts")) return;
  res.end(fs.readFileSync('.' + url.pathname));
  return true;
};