const get = require("../req/get");
const loadPost = require("../req/body");
const env = require("../env");
const path = require("path");
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
          new formidable.IncomingForm().parse(req, (e, f) => {
            const params = {
              meta: {
                action: f.action,
                thumbid: f.thumbid,
                starterid: '',
                description: f.description,
                title: f.title,
                moviexml: f.moviexml,
                lang: f.lang,
                movieid: f.movieid || fUtil.makeid(6),
                userid: f.userid
              }
            };
            if (e) return;
            const meta = !fUtil.exists(env.MOVIE_FOLDER + `/${f.movieid}.json`) ? "" : require('.' + env.MOVIE_FOLDER + `/${
              f.movieid
            }.json`);
            const id = meta.id || fUtil.makeid(6);
            f.movieid = id;
            fs.writeFileSync(env.MOVIE_FOLDER + `/${id}.json`, JSON.stringify({id: id, movieObject: toObjectString(params)}));
            res.end(toObjectString(params));
          });
          return true;
        } case "/movie/fetch": {
          loadPost(req, res).then(data => {
            res.setHeader("Content-Type", "text/xml");
            const meta = require('.' + env.MOVIE_FOLDER + `/${data.movieid}.json`)
            res.end(meta.movieObject);
          }).catch(e => console.log(e));
          return true;
        }
      }
    }
  }
}
