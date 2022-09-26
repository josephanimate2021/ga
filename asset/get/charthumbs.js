const fs = require('fs');

module.exports = function (req, res) {
    if (req.method != "GET") return;
    const match = req.url.match(/\/chars\/([^/]+)\/([^.]+)(?:\.(png|jpg))?$/);
    if (!match) return;
    const tId = match[1];
    const id = match[2];
    const ext = match[3];
    try {
        res.end(fs.readFileSync(process.env.CHARS_FOLDER + `/${tId}/${id}.${ext}`));
    } catch (e) {
        res.end('404 Not Found');
    }
    return true;
}