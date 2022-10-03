module.exports = function (req, res, url) {
  if (req.method != "GET") return;
  switch (req.url) {
    case "/crossdomain.xml": {
      res.setHeader("Content-Type", "text/x-cross-domain-policy");
      res.end("<cross-domain-policy><allow-access-from domain=\"*\"/></cross-domain-policy>");
      return true;
    }
  }
  if (!url.pathname.startsWith("/videomaker/full")) return;
  res.end(`<html><head><script>function redirect() {
    location.href = '/studio?tutorial=0';
  }</script></head><body onload="redirect()"></body></html>`);
};
