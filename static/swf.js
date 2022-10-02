const get = require("../req/get");
const env = require("../env");

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  const match = req.url.match(/\/static\/animation\/([^/]+)$/);
  if (!match) return;
  const id = match[1];
  get(env.SWF_URL + `/${id}`).then(b => res.end(b)).catch(e => {
    console.log(e); 
    res.end('404 Not Found'); 
  });
  return true;
}
