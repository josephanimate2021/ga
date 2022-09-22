const JSZip = require('jszip');
const fs = require('fs');
const loadPost = require('../req/body');
const file = './files/themes/list.zip';

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      fs.createReadStream(file).pipe(res);
      return true;
    } case "/goapi/getTheme/": {
      loadPost(req, res).then(data => fs.createReadStream(`./files/themes/${data.themeId}.zip`).pipe(res));
      return true;
    }
  }
};
