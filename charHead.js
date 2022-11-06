const fs = require("fs");

module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const match = req.url.match(/\/char_heads\/([^/]+)$/);
	if (!match) return;
	const file = match[1];
	const pathName = process.env.ASSETS_FOLDER + `/charHeads/${file}`;
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `404 Not Found`;
	res.end(html);
	return fs.existsSync(pathName) ? true : "";
};