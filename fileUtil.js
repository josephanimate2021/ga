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
  makeZip(path, name) {
    const zip = new JSZip();

    try {
      const buffer = fs.readFileSync(path);
      fs.writeFileSync(name, buffer);
      zip.file(name, buffer);

      zip.generateNodeStream({ type: 'base64', streamFiles: true }).pipe(fs.createWriteStream(name.slice(0, -3 + "zip"))).on('finish', function () {
        return `${name.slice(0, -3 + "zip")} written.`;
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
