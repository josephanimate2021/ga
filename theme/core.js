const fs = require('fs');
const JSZip = require('jszip');
var zip = new JSZip();

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
  
      // zip theme list
      const buffer = fs.readFileSync("./files/themes/list.xml");
      fs.writeFileSync("themelist.xml", buffer);
      zip.file("themelist.xml", buffer);

      zip.generateAsync({type:"base64"}).then(function () {
        res.end(fs.readFileSync("themelist.zip"));
        fs.unlinkSync("themelist.xml");
        fs.unlinkSync("themelist.zip");
      });
      return true;
    } case "/goapi/getTheme/": {
      const tId = req.body.themeId;
      // zip theme
      const buffer = fs.readFileSync(`./files/themes/${tId}.xml`);
      fs.writeFileSync(`${tId}.xml`, buffer);
      zip.file(`${tId}.xml`, buffer);

      zip.generateAsync({type:"base64"}).then(function () {
        res.end(fs.readFileSync(`${tId}.zip`));
        fs.unlinkSync(tId + '.xml');
        fs.unlinkSync(tId + '.zip');
      });
      return true;
    }
  }
};
