import get from "../req/get.js";
const {
    env
} = process;

export default async (req, res) => {
    switch (req.method) {
        case "GET": {
            const match = req.url.match(/\/swfs\/([^/]+)$/);
            if (!match) return;
            const file = match[1];
            get(`${env.SWF_URL}/${file}`).then(b => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/x-shockwave-flash");
                res.end(b);
            }).catch(e => {
                console.log(e);
                res.statusCode = 404;
                res.end('404 Not Found');
            });
            break;
        } default: return;
    }
}
