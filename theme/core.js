const loadPost = require('../req/body');
const fUtil = require("../fileUtil");

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      fUtil.makeZip("./files/themes/list.xml", "themelist.xml").then(b => {
        if (b = "themelist.zip written.") fs.createReadStream("themelist.zip").pipe(res);
        else res.end();
      }).catch(e => console.log(e));
      return true;
    } case "/goapi/getTheme/": {
      loadPost(req, res).then(data => fs.createReadStream(`./files/themes/${data.themeId}.zip`).pipe(res));
      return true;
    }
  }
};
