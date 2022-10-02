const get = require("../req/get");
const env = require("../env");
const fs = require("fs");

module.exports = function (req, res) {
  if (req.method != "GET") return;
  const match = req.url.match(/\/static\/go\/img\/text_component\/([^/]+)$/);
  if (!match) return;
  const id = match[1];
  try {
    res.end(fs.readFileSync(env.STARTER_FOLDER + `/${id}`));
  } catch (e) {
    res.end('404 Not Found');
  }
  return true;
}
