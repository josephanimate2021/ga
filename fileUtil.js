const JSZip = require('jszip');
const fs = require('fs');

module.exports = {
  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  },
  makeZip(filename) {
    const zip = new JSZip();

    try {
      const buffer = fs.readFileSync(filename);
      zip.file(filename.slice(0, -3 + "zip"), buffer);

      zip.generateNodeStream({ type: 'base64', streamFiles: true }).pipe(fs.createWriteStream(filename.slice(0, -3 + "zip"))).on('finish', function () {
        return `${filename.slice(0, -3 + "zip")} written.`;
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
