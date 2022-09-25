const fs = require('fs');
const loadPost = require("../req/body");
const fUtil = require("../fileUtil");

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
          case "/goapi/saveMovie/": {
                  loadPost(req, res).then(data => {
                          const newId = fUtil.makeid(12);
                          const id = !data.movieId ? newId : data.movieId;
                          const body = Buffer.from(data.body_zip, "base64");
                          const thumb = Buffer.from(data.thumbnail_large, "base64");
                          fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.zip`, body);
                          fs.writeFileSync(process.env.MOVIE_FOLDER + `/${id}.png`, thumb);
                          res.end(0 + id);
                 });
          }
  }
}
