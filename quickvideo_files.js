const fs = require("fs");

module.exports = function (req, res, url) {
	if (req.method != "GET" || !url.pathname.startsWith("/template_files")) return;
  const pathName = '.' + url.pathname;
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `404 Not Found`;
	res.end(html);
	return fs.existsSync(pathName) ? true : "";
};