const fs = require("fs");

module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const match = req.url.match(/\/char_heads\/([^/]+)([^.]+)(?:\.(png|jpg))?$/);
	if (!match) return;
	const tId = match[1];
	const id = match[2];
	const ext = match[3];
	const pathName = process.env.ASSETS_FOLDER + `/charHeads/${tId}/${id}.${ext}`;
	const html = fs.existsSync(pathName) ? fs.readFileSync(pathName) : `404 Not Found`;
	res.end(html);
	return fs.existsSync(pathName) ? true : "";
};