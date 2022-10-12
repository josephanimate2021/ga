const get = require("../req/get");
const loadPost = require("../req/body");
const env = require("../env");
const path = require("path");
const fUtil = require("../fileUtil");
const fs = require("fs");

module.exports = function (req, res) {
  switch (req.method) {
    case "GET": {
      const match = req.url.match(/\/movie\/assets\/([^/]+)$/);
      if (!match) return;
      const file = match[1];
      const dot = file.lastIndexOf(".");
      const ext = file.substr(dot + 1);
      var url;
      switch (ext) {
        case "xml": {
          url = `https://web.archive.org/web/20130621220649if_/http://www.zimmertwins.com/sites/zimmertwins.com/movie/assets`;
          break;
        } default: {
          url = env.SWF_URL;
          break;
        }
      }
      get(`${url}/${file}`).then(b => res.end(b)).catch(e => { console.log(e), res.end('404 Not Found') });
      return true;
    } case "POST": {
      switch (req.url) {
        case "/movie/save": {
          loadPost(req, res).then(data => {
            const id = fUtil.makeid(6);
            fs.writeFileSync(env.MOVIE_FOLDER + `/${id}.txt`, data.moviexml);
            res.end(id + data.moviexml);
          });
          return true;
        } case "/movie/fetch": {
          loadPost(req, res).then(data => {
            res.setHeader("Content-Type", "text/xml");
            res.end(fs.readFileSync(env.MOVIE_FOLDER + `/${data.movieid}.txt`));
          }).catch(e => console.log(e));
          return true;
        }
      }
    }
  }
}
