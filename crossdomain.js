module.exports = function (req, res) {
  if (req.method != "GET" || req.url != "/crossdomain.xml") return;
  res.setHeader("Content-Type", "text/x-cross-domain-policy");
  res.end("<cross-domain-policy><allow-access-from domain=\"*\"/></cross-domain-policy>");
};
