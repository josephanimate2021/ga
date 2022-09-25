const JSZip = require('jszip');
const zip = new JSZip;
const fs = require('fs');

module.exports = {
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  },
  fileString(filepath) {
    return filepath;
  },
  exists(filepath) {
    return fs.existsSync(filepath);
  },
  zipList() {
    return new Promise((res, rej) => {
      try {
        const buffer = fs.readFileSync('./files/themes/list.xml');
        fs.writeFileSync("themelist.xml", buffer);
        zip.file("themelist.xml", buffer);
  
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream('themelist.zip')).on('finish', function () {
          res("themelist.zip written.");
        });
      } catch (err) {
        rej(err);
      }
    });
  },
  addToZip(zip, zipName, buffer) {
		zip.add(zipName, buffer);
		if (zip[zipName].crc32 < 0) zip[zipName].crc32 += 4294967296;
	},
  zipTheme(tId) {
    return new Promise((res, rej) => {
      try {
        const buffer = fs.readFileSync(`./files/themes/${tId}.xml`);
        fs.writeFileSync("theme.xml", buffer);
        zip.file("theme.xml", buffer);
  
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream('theme.zip')).on('finish', function () {
          res("theme.zip written.");
        });
      } catch (err) {
        rej(err);
      }
    });
  }
}
