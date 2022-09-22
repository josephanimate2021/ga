const JSZip = require('jszip');
const fs = require('fs');
const loadPost = require('../req/body');

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      fs.createReadStream('./files/themes/list.zip').pipe(res);
      return true;
    } case "/goapi/getTheme/": {
      loadPost(req, res).then(data => fs.createReadStream(`./files/themes/${data.themeId}.zip`).pipe(res));
      return true;
    }
  }
};
