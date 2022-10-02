const env = require("../env");
const get = require("../misc/get");
const http = require("http");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	var path = url.pathname;
	if (req.method != "GET" || !path.startsWith("/static/store")) return;
	get(env.STORE_URL + path.substr(path.lastIndexOf("/"))).then((v) => res.end(v)).catch(e => console.log(e));
	return true;
};
