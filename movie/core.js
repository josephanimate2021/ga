const movie = require("../asset/main");
const fs = require("fs");
const formidable = require("formidable");
const base = Buffer.alloc(1, 0);

function toAttrString(data) {
	return typeof data == "object"
		? Object.keys(data)
				.filter((key) => data[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
				.join("&")
		: data.replace(/"/g, '\\"');
}
function toParamString(data) {
	return Object.keys(data)
		.map((key) => `${toAttrString(data[key])}`)
		.join(" ");
}

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
                case "/ajax/previewText2Video": {
                    new formidable.IncomingForm().parse(req, (e, f) => {
                        console.log(f);
                        res.end();
                    });
                    return true;
                }
                case "/goapi/getMovieInfo/": {
                    res.end('<watermarks></watermarks>');
                    return true;
                }
                case "/goapi/getMovie/": {
                    try {
                        try {
                            const buffer = fs.readFileSync(`${process.env.MOVIE_FOLDER}/xmls/${url.query.movieId}.xml`);
                            movie.parse(buffer).then(b => res.end(Buffer.concat([base, b]))).catch(e => console.log(e));
                        } catch (e) {
                            const buffer = fs.readFileSync(`${process.env.STARTER_FOLDER}/xmls/${url.query.movieId}.xml`);
                            movie.parse(buffer).then(b => res.end(Buffer.concat([base, b]))).catch(e => console.log(e));
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    return true;
                }
            }
        }
    }
}
