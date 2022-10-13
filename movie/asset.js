const get = require("../req/get");
const loadPost = require("../req/body");
const env = require("../env");
const fUtil = require("../fileUtil");
const fs = require("fs");
const formidable = require("formidable");

function toAttrString(data) {
	return typeof data == "object"
		? Object.keys(data)
				.filter((key) => data[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
				.join("&")
		: data.replace(/"/g, '\\"');
}
function toParamString(data) {
	return Object.keys(data)
		.map((key) => `${toAttrString(data[key])}`)
		.join(" ");
}
function toObjectString(data) {
	return `${toParamString(data)}`;
}

module.exports = function (req, res, url) {
  switch (req.method) {
    case "GET": {
      switch (url.pathname) {
        case "/movie/fetch": {
          res.end(fs.readFileSync(env.MOVIE_FOLDER + `/${url.query.movieid}.txt`));
          return true;
        }
      }
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
          new formidable.IncomingForm().parse(req, (e, f) => {
            if (e) { 
              console.log(e); 
              return;
            }
            if (fs.existsSync(env.DATABASES_FOLDER + `/movieIdSection.json`)) {
              const idMeta = require('.' + env.DATABASES_FOLDER + `/movieIdSection.json`);
              const params = {
                meta: {
                  action: f.action,
                  thumbid: f.thumbid,
                  starterid: f.starterid || '',
                  description: f.description,
                  title: f.title,
                  moviexml: f.moviexml,
                  lang: f.lang,
                  movieid: idMeta.id,
                  userid: f.userid
                }
              };
              console.log(params.meta.movieid);
              fs.writeFileSync(env.MOVIE_FOLDER + `/${params.meta.movieid}.txt`, toObjectString(params));
              res.end(toObjectString(params));
            } else {
              const params = {
                meta: {
                  action: f.action,
                  thumbid: f.thumbid,
                  starterid: f.starterid || '',
                  description: f.description,
                  title: f.title,
                  moviexml: f.moviexml,
                  lang: f.lang,
                  movieid: fUtil.makeid(6),
                  userid: f.userid
                }
              };
              console.log(params.meta.movieid);
              fs.writeFileSync(env.MOVIE_FOLDER + `/${params.meta.movieid}.txt`, toObjectString(params));
              res.end(toObjectString(params));
            }
          });
          return true;
        } case "/movie/fetch": {
          loadPost(req, res).then(data => res.end(fs.readFileSync(env.MOVIE_FOLDER + `/${data.movieid}.txt`))).catch(e => console.log(e));
          return true;
        }
      }
    }
  }
}
