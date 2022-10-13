const get = require("../req/get");
const env = require("../env");

module.exports = function (req, res) {
  switch (req.method) {
    case "GET": {
      const match = req.url.match(/\/swfs\/([^/]+)$/);
      if (!match) return;
      const file = match[1];
      get(`${env.SWF_URL}/${file}`).then(b => res.end(b)).catch(e => { console.log(e), res.end('404 Not Found') });
      return true;
    } case "POST": {}
  }
}
