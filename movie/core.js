const fs = require("fs");

module.exports = function (req, res, url) {
    switch(req.method) {
        case "GET": {
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
        } case "POST": {
            switch (url.pathname) {
                case "/goapi/getMovie/": {
                    try {
                        res.end(fs.readFileSync(process.env.MOVIE_FOLDER + `/${url.query.movieId}.zip`));
                    } catch (e) {
                        res.end(fs.readFileSync(process.env.STARTER_FOLDER + `/${url.query.movieId}.zip`));
                    }
                    return true;
                }
            }
        }
    }
}