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
  zipTheme(tId) {
    return new Promise((res, rej) => {
      try {
        const buffer = fs.readFileSync(`./files/themes/${tId}.xml`);
        fs.writeFileSync(`${tId}.xml`, buffer);
        zip.file(`${tId}.xml`, buffer);
  
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true }).pipe(fs.createWriteStream(`${tId}.zip`)).on('finish', function () {
          res(`${tId}.zip written.`);
        });
      } catch (err) {
        rej(err);
      }
    });
  }
}
