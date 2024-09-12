import fs from 'fs';
export default async (req, res, url) => {
    if (req.method != "GET" || url.pathname != "/favicon.ico") return;
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.end(fs.readFileSync("./files/favicon.ico"));
};
