const fs = require("fs"),
asset = require("./asset/main"),
fUtil = require("./fileUtil"),
env = require("./env");
aniSwfUrl = env.SWF_URL,
aniStoreUrl = env.STORE_URL,
aniClientUrl = env.CLIENT_URL;

module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  var html, tId, mId;
  if (url.query.movieId) mId = `&amp;movieId=${url.query.movieId}`;
  else mId = '';
  const urlPrefix = req.headers.host == "localhost" ? "http" : req.headers.host == `localhost:${process.env.port}` ? "http" : "https";
  switch (url.pathname) {
   case "/": {
        html = ``;
        break;
    } case "/player": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<body margin=0px"><embed height="100%" flashvars="apiurl=%2Fmovie%2Fassets%2Fapi.xml&amp;asseturl=%2Fmovie%2Fassets&amp;baseurl=${urlPrefix}://${req.headers.host}l&amp;lang=en-local&amp;userid=416896${mId}" pluginspage="http://www.adobe.com/go/getflashplayer" src="${aniSwfUrl}/player.swf" type="application/x-shockwave-flash" width="100%"></embed></body>`;
	    break;
    } case "/studio": {
	    res.setHeader("Content-Type", "text/html; charset=utf8");
	    html = `<body margin=0px"><embed height="100%" flashvars="apiurl=%2Fmovie%2Fassets%2Fapi.xml&amp;asseturl=%2Fmovie%2Fassets&amp;baseurl=${urlPrefix}://${req.headers.host}l&amp;lang=en-local&amp;userid=416896&amp;playhelpmovie=1" pluginspage="http://www.adobe.com/go/getflashplayer" src="${aniSwfUrl}/editor.swf" type="application/x-shockwave-flash" width="100%"></embed></body>`;
	    break;
    }
  }
  res.end(html);
};
