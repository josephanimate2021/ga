const JSZip = require('jszip');
const fs = require('fs');
const loadPost = require('../req/body');
const file = './files/themes/list.zip';

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      if (fs.existsSync(file)) fs.createReadStream(file).pipe(res);
      else {console.log}
      return true;
    } case "/goapi/getTheme/": {
      loadPost(req, res).then(data => {
        if (fs.existsSync(file.slice(0, -8 + `${data.themeId}.zip`))) fs.createReadStream(file.slice(0, -8 + `${data.themeId}.zip`)).pipe(res));
        else {console.log}
      return true;
    }
  }
};
