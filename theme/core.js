const JSZip = require('jszip');
const fs = require('fs');
const loadPost = require('../req/body');

module.exports = function (req, res) {
  if (req.method != "POST") return;
  switch (req.url) {
    case "/goapi/getThemeList/": {
      const zip = new JSZip();

      try {
        const buffer = fs.readFileSync('./files/themes/list.xml');
        fs.writeFileSync("themelist.xml", buffer);
        zip.file("themelist.xml", buffer);

        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream('themelist.zip'));
        fs.createReadStream('themelist.zip').pipe(res);
      } catch (err) {
        console.error(err)
      }
      return true;
    } case "/goapi/getTheme/": {
      if (fs.existsSync('themelist.zip')) fs.unlinkSync('themelist.zip');
      if (fs.existsSync('themelist.xml')) fs.unlinkSync('themelist.xml');
      const zip = new JSZip();
      loadPost(req, res).then(data => {
        const tId = data.themeId;
        if (fs.existsSync(`${tId}.zip`)) fs.unlinkSync(`${tId}.zip`);
        if (fs.existsSync(`${tId}.xml`)) fs.unlinkSync(`${tId}.xml`);
        fs.writeFileSync(process.env.DATABASES_FOLDER + `/themeData.json`, JSON.stringify(data));

        try {
          const buffer = fs.readFileSync(`./files/themes/${tId}.xml`);
          fs.writeFileSync(`${tId}.xml`, buffer);
          zip.file(`${tId}.xml`, buffer);

          zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream(`${tId}.zip`));
          fs.createReadStream(`${tId}.zip`).pipe(res);
        } catch (err) {
          console.error(err)
        }
      });
      return true;
    } case "/goapi/getUserWatermarks/": {
      if (fs.existsSync(process.env.DATABASES_FOLDER + '/themeData.json')) {
        const data = require('.' + process.env.DATABASES_FOLDER + '/themeData');
        const tId = data.themeId;
        if (!fs.existsSync(`${tId}.zip`) && !fs.existsSync(`${tId}.xml`)) return;
        fs.unlinkSync(`${tId}.zip`);
        fs.unlinkSync(`${tId}.xml`);
      }
    }
  }
};
