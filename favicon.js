const get = require("./req/get");
const env = require("./env");

module.exports = function (req, res) {
  if (req.method != "GET") return;
  const match = req.url.match(/\/favicon(?:\.(png|ico))?$/);
  if (!match) return;
  get(`https://www.vyond.com/wp-content/themes/vyond/assets/img/favicons/favicon-32x32.png`).then(b => res.end(b)).catch(e => {
    console.log(e); 
    res.end('404 Not Found'); 
  });
  return true;
}
