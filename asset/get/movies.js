const fs = require('fs');

module.exports = function (req, res) {
    if (req.method != "GET") return;
    const match = req.url.match(/\/movies\/([^.]+)(?:\.(zip|png))?$/);
    if (!match) return;
    const id = match[1];
    const ext = match[2];
    try {
        res.end(fs.readFileSync(process.env.MOVIE_FOLDER + `/${id}.${ext}`));
    } catch (e) {
        res.end('404 Not Found');
    }
    return true;
}