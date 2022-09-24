// vars
const fs = require('fs');
const loadPost = require("../req/body");
// functions
// server functions
module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getUserAssetsXml/": {
      loadPost(req, res).then(data => getAssetXmls(data)).then(b => res.end(Buffer.from(b))).catch(e => console.log(e));
    }
  }
}
  
      
