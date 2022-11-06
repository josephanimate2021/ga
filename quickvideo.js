const fs = require("fs");

module.exports = function (req, res, url) {
	if (req.method != "GET" || !url.pathname.startsWith("/quickvideo")) return;
	const pathName = '.' + url.pathname + '.txt';
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `404 Not Found`;
	res.end(html);
	return fs.existsSync(pathName) ? true : "";
};