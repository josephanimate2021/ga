const fs = require("fs");
const path = require("path");

module.exports = function (req, res, url) {
	if (req.method != "GET" || !url.pathname.startsWith("/serectpage_files")) return;
	const pathName = path.join(__dirname, '.' + url.pathname);
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `404 Not Found`;
	res.end(html);
	return fs.existsSync(pathName) ? true : "";
};
