const get = require("../req/get");
const env = require("../env");

module.exports = function (req, res) {
  if (req.method != "GET") return;
  const match = req.url.match(/\/static\/client_theme\/go\/en_US\/([^/]+)$/);
  if (!match) return;
  const id = match[1];
  get(env.CLIENT_URL + `/client_theme/go/en_US/${id}`).then(b => res.end(b)).catch(e => {
    console.log(e); 
    res.end('404 Not Found'); 
  });
  return true;
}
