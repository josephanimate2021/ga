const loadPost = require('../req/body');
const {zipList, zipTheme} = require("../fileUtil");
const fs = require("fs");

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      zipList().then(b => {
        if (b = "themelist.zip written.") fs.createReadStream("themelist.zip").pipe(res);
        else res.end();
      }).catch(e => console.log(e));
      return true;
    } case "/goapi/getTheme/": {
      loadPost(req, res).then(data => {
        zipTheme(data.themeId).then(b => {
          if (b = `${data.themeId}.zip written.`) fs.createReadStream(`${data.themeId}.zip`).pipe(res);
          else res.end();
        }).catch(e => console.log(e));
      });
      return true;
    }
  }
};
