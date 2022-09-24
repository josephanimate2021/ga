// vars
const loadPost = require("../req/body");
const asset = require('./main');
// functions

// server functions
module.exports = function (req, res) {
  switch (req.method) {
    case "POST": {
      switch (req.url) {
        case "/goapi/getUserAssetsXml/": {
          loadPost(req, res).then(data => asset.getAssetXmls(data)).then(b => {
            console.log(b);
            res.end(Buffer.from(b));
          }).catch(e => console.log(e));
        }
      }
    }
  }
}
  
      
