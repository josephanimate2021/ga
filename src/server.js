// modules
import http from 'http';
import url from 'url';
const {
    env
} = process;

// basic utilities
import movie from "./movie/asset.js";
import serectpage from "./themes.cjs";
import extras from "./files.cjs";
import swf from "./movie/swf.js";
import pages from "./pages.js";
import crossdomain from "./favicon.js";

const utilities = [
    serectpage,
    extras,
    swf,
    movie,
    crossdomain,
    pages
];

// start the server itself
export default http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    function logRequest() {
        if (env.node_env == "dev") console.log(req.method, parsedUrl.path, "-", res.statusCode, `(${req.headers.host})`);
    }
    try {
        for (const i in utilities) await utilities[i](req, res, parsedUrl);
        logRequest();
    } catch (x) {
        console.error(x);
        res.statusCode = 500;
        logRequest();
    }
});
  
