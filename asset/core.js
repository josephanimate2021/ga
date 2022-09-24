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
          res.statusCode = 200;
          loadPost(req, res).then(data => {
            console.log(data); 
          }).catch(e => console.log(e));
        }
      }
    }
  }
}
  
      
